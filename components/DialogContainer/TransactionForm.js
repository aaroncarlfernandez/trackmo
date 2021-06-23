import { useState, useContext, useEffect } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

const TransactionForm = ({transactionDetails}) => {

    const {setFormSelected, categories, setTransactions, setPageSelected, setBalance, transactionSelected, setTransactionSelected } = useContext(UserContext)

    const [categorySelected, setCategorySelected] = useState("");
    const [categoryType, setCategoryType] = (transactionDetails===null) ? useState("Income") : useState(transactionDetails[0].categoryType);
    const [amount, setAmount] = (transactionDetails===null) ? useState(0) : useState(transactionDetails[0].amount);
    const [description, setDescription] = (transactionDetails===null) ? useState("") : useState(transactionDetails[0].description);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCategoriesEmpty, setIsCategoriesEmpty] = useState(true);

    let categoryOptions = categories.map((category)=> {
        return (<option value={category.name} key={category._id}>{category.name}</option>)
    })

    const btnClass = (isCreating) ? 'btn btn-lg mx-15px btn-success-outline disabled' : 'btn btn-lg mx-15px btn-success-outline';
    const deleteBtnClass = (isDeleting) ? 'btn btn-lg mx-15px btn-danger-outline disabled' : 'btn btn-lg mx-15px btn-danger-outline';
    const addBtnValue = (isCreating) ? (<div className="spinner spinner-md"></div>) : "Add";
    const updateBtnValue = (isCreating) ? (<div className="spinner spinner-md"></div>) : "Update";
    const deleteBtnValue = (isDeleting) ? (<div className="spinner spinner-md"></div>) : "Delete";

    useEffect(() => {
        if (categories.length<=0) {
            setCategorySelected("")
            setIsCategoriesEmpty(true)
        } else {
            if (transactionDetails===null) {
                setCategorySelected(categories[0].name)
            } else {
                setCategorySelected(transactionDetails[0].categoryName)
            }
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
                setBalance(data.balance)
                setTransactions(data.transactions)
                setIsCreating(false)
                setFormSelected("")
                setPageSelected("transactions")
            });
        }
    }

    const update = (e) => {
        e.preventDefault()

        setIsCreating(true);
        fetch(`${AppHelper.API_URL}/api/users/update-transaction`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                "userId": localStorage.getItem("userId"),
                "transactionId": transactionDetails[0]._id,
                "categoryName": categorySelected,
                "categoryType": categoryType,
                "amount": amount,
                "description": description
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setBalance(data.balance)
            setTransactions(data.transactions)
            setIsCreating(false)
            setFormSelected("")
            setPageSelected("transactions")
        });
    }

    const deleteTransaction = (e) => {
        e.preventDefault();

        setIsDeleting(true);
        fetch(`${AppHelper.API_URL}/api/users/transactions`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                "userId": localStorage.getItem("userId"),
                "transactionId": transactionSelected[0]._id
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setBalance(data.balance)
            setTransactions(data.transactions)
            setIsDeleting(false)
            setFormSelected("")
            setPageSelected("transactions")
        });
    }

    const categoryTypeLabel = (categoryType==="Expense") ? (<label className="text-align-left color-red">{categoryType}</label>) : (<label className="text-align-left color-green">{categoryType}</label>)
    const categoryOptionsClass = (isCategoriesEmpty) ? "long error" : "long" 
    const buttons = (transactionDetails===null) 
        ? (<div className="dialog_footer textCenter">
                <button className={btnClass} onClick={(e) => add(e) }> 
                    {addBtnValue}
                </button>
            </div>
        )
        : (<div className="dialog_footer textCenter">
                <button className={btnClass} onClick={(e) => update(e) }> 
                    {updateBtnValue}
                </button>
                <button className={deleteBtnClass} onClick={(e) => deleteTransaction(e) }> 
                    {deleteBtnValue}
                </button>
            </div>
        )

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
                                        <input className="longer" type="text" maxLength="256" placeholder="" value={description} onChange={(e) => { setDescription(e.target.value)}} />
                                    </li>

                                </ol>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {buttons}
        </div>
    
    );
}

export default TransactionForm;