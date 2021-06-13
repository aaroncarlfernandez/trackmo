import { useState, useContext } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

const NewTransaction = () => {
    const {accessToken,userDetails,setNewSelected} = useContext(UserContext)

    const [categoryName, setCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("Income");
    const [isCreating, setIsCreating] = useState(false);

    const add = (e) => {
        e.preventDefault();
        setIsCreating(true);

        fetch(`${AppHelper.API_URL}/api/users/add-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                userId: userDetails.userId,
                name: categoryName,
                type: categoryType
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setIsCreating(false)
            setNewSelected("")
        });
    }

    const addBtnClass = (isCreating) ? 'btn btn-lg btn-success-outline js_save disabled' : 'btn btn-lg btn-success-outline js_save';
    const addBtnValue = (isCreating) ? (<div className="spinner spinner-md"></div>) : "Add";

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
                                        <input className="longer" 
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
                <button className={addBtnClass} onClick={(e) => add(e)}> 
                    {addBtnValue}
                </button>
            </div>
        </div>
    );
}

export default NewTransaction;