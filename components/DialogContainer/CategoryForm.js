import { useState, useContext, useEffect } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'
const NewTransaction = () => {
    const {setFormSelected, setCategories} = useContext(UserContext)

    const [categoryName, setCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("Income");
    const [isCreating, setIsCreating] = useState(false);
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [isCategoryNameValid, setIsCategoryNameValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        if (categoryName==="") {
            if (isAddClicked) {
                setIsCategoryNameValid(false)
                setErrorMessage("Category name cannot be blank")
            }
        } else {
            setIsCategoryNameValid(true)
            setErrorMessage("")
        }

    }, [categoryName, isAddClicked])

    const add = (e) => {
        e.preventDefault();
        
        if (isCategoryNameValid) {
            setIsCreating(true);
            fetch(`${AppHelper.API_URL}/api/users/add-category`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    userId: localStorage.getItem("userId"),
                    name: categoryName,
                    type: categoryType
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setIsCreating(false)
                if (data.error==="category-already-exists") {
                    setIsCategoryNameValid(false)
                    setErrorMessage("Category already exists")
                } else {
                    setFormSelected("")
                    setCategories(data.categories)
                }
            });
        }
    }

    const addBtnClass = (isCreating) ? 'btn btn-lg btn-success-outline js_save disabled' : 'btn btn-lg btn-success-outline js_save';
    const addBtnValue = (isCreating) ? (<div className="spinner spinner-md"></div>) : "Add";
    const categoryNameClass = (isAddClicked && !isCategoryNameValid) ? "longer error" : "longer"
    const errorMessageElement = (errorMessage!=="") ? (<p class="color-red style-italic"> {errorMessage} </p>) : null

    return (
        <div>
            <div id={"newExpense3_panes"}>
                <div className="newExpense3_one">   
                    <div id={'expenseDialogContainer'} className="floatWrapper">

                        <div className="floatLeft expenseDialogLeft smallTabs_content">
                            <form id={'newExpense3_expenseForm'} className="form expenseForm js_modeContainer" noValidate="novalidate">
                                <ol>
                                    <li className="separate">
                                        <label>Category</label>
                                        <input className={categoryNameClass}
                                            type="text" 
                                            maxLength="256" 
                                            placeholder="" 
                                            value={categoryName} 
                                            onChange={(e) => { setCategoryName(e.target.value) }} 
                                        />
                                    </li>

                                    <li className="category_dropdown separate">
                                        <label>Type</label>
                                        <select className="long" value={categoryType} onChange={(e) => { setCategoryType(e.target.value);  }} >
                                            <option value="Income">Income</option>
                                            <option value="Expense">Expense</option>
                                        </select>
                                    </li>

                                </ol>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="dialog_footer textCenter">
                {errorMessageElement}
                <button className={addBtnClass} onClick={(e) => {setIsAddClicked(true); add(e); }}> 
                    {addBtnValue}
                </button>
            </div>
        </div>
    );
}

export default NewTransaction;