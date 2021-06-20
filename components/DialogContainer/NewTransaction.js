import { useState, useContext, useEffect } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

const NewTransaction = () => {
    const {setNewSelected, categories, setTransactions, setPageSelected, setBalance} = useContext(UserContext)

    const [categorySelected, setCategorySelected] = useState("");
    const [categoryType, setCategoryType] = useState("Income");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("" );
    const [isCreating, setIsCreating] = useState(false);
    const [isCategoriesEmpty, setIsCategoriesEmpty] = useState(true);

    let categoryOptions = categories.map((category)=> {
        return (<option value={category.name} key={category._id}>{category.name}</option>)
    })

    const addBtnClass = (isCreating) ? 'btn btn-lg btn-success-outline js_save disabled' : 'btn btn-lg btn-success-outline js_save';
    const addBtnValue = (isCreating) ? (<div className="spinner spinner-md"></div>) : "Add";

    useEffect(() => {
        if (categories.length<=0) {
            setCategorySelected("")
            setIsCategoriesEmpty(true)
        } else {
            setCategorySelected(categories[0].name)
            setIsCategoriesEmpty(false)
        }
    }, [categories])

    const lookup = (e) => {
        e.preventDefault();

        let selectedCategory = categories.filter(category => {
            return category.name === e.target.value
        })

        setCategoryType(selectedCategory[0].type)
    }

    const add = (e) => {
        e.preventDefault();

        if (!isCategoriesEmpty) {
            setIsCreating(true);
            fetch(`${AppHelper.API_URL}/api/users/add-transaction`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    userId: localStorage.getItem("userId"),
                    categoryName: categorySelected,
                    categoryType: categoryType,
                    amount: amount,
                    description: description
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.transactions)
                setBalance(data.balance)
                setTransactions(data.transactions)
                setIsCreating(false)
                setNewSelected("")
                setPageSelected("transactions")
            });
        }
    }

    const categoryTypeLabel = (categoryType==="Expense") ? (<label className="text-align-left color-red">{categoryType}</label>) : (<label className="text-align-left color-green">{categoryType}</label>)
    const categoryOptionsClass = (isCategoriesEmpty) ? "long error" : "long" 
    return (
        <div>
            <div id={"newExpense3_panes"}>
                <div className="newExpense3_one">   
                    <div id={'expenseDialogContainer'} className="floatWrapper">

                        <div className="floatLeft expenseDialogLeft smallTabs_content">
                            <form id={'newExpense3_expenseForm'} className="form expenseForm js_modeContainer" noValidate="novalidate">
                                <ol>
                                    <li className="category_dropdown separate">
                                        <label>Category</label>
                                        <select className={categoryOptionsClass} value={categorySelected} onChange={(e) => { setCategorySelected(e.target.value); lookup(e);  }} >
                                            {categoryOptions}
                                        </select>
                                    </li>

                                    <li className="category_dropdown separate">
                                        <label>Type</label>
                                        {categoryTypeLabel}
                                    </li>

                                    <li className="totalRow separate"> 
                                        <label>Amount</label>
                                        <input id={"newExpense3_oneExpense_amount"} className="required short" type="number" value={amount} onChange={(e) => { setAmount(e.target.value)}} />
                                    </li>

                                    <li>
                                        <label>Description</label>
                                        <input className="long" type="text" maxLength="256" placeholder="" value={description} onChange={(e) => { setDescription(e.target.value)}} />
                                    </li>

                                </ol>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dialog_footer textCenter">
                <button className={addBtnClass} onClick={(e) => add(e) }> 
                    {addBtnValue}
                </button>
            </div>
        </div>
    
    );
}

export default NewTransaction;