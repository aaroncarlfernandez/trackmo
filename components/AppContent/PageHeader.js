import { useContext, useState } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

const PageHeader = ({ pageTitle }) => {
    const {setNewSelected, setCategories} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)

    const newTransactionClasses = (isOpen) ? 'icon-list-group create-expense-menu' : 'icon-list-group create-expense-menu hidden'

    const fetchCategories = () => {
        fetch(`${AppHelper.API_URL}/api/users/categories/${localStorage.getItem('userId')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then((response) => response.json())
        .then((categories) => {
            setCategories(categories);
            setNewSelected("transaction")
            setIsOpen(false)
        });
        
    }

    return (
        <div className="page-header">
            <div className="floatRight">
                <div id={"expenses_action_buttons"}>
                    <div>
                        <span>
                            <div id="expenseList" className="btn-group vAlignTop">
                                <button type="button" 
                                    className="btn btn-success dropdown-toggle floatRight" 
                                    aria-haspopup="true" 
                                    aria-expanded="true"
                                    onClick={()=>(isOpen) ? setIsOpen(false) : setIsOpen(true)}
                                >
                                    <span className="pr-15">Create</span>
                                    <span className="caret"></span>
                                </button>
                                
                                <div className={newTransactionClasses}>
                                    <div className="list-group">
                                        <div className="list-group-item list-group-header is-borderless">
                                            <h6 className="noMargin">Create new</h6>
                                        </div>
                                        <button 
                                            className="list-group-item is-borderless clickable afew" 
                                            type="button"
                                            onClick={()=>{
                                                setNewSelected("category")
                                                setIsOpen(false)
                                            }}>
                                            <span className="expensicons marginRight vAlignMiddle expensicons-spreadsheet"></span>Category
                                        </button>
                                        <button className="list-group-item is-borderless clickable expense" 
                                            type="button"
                                            onClick={()=>{ fetchCategories()
                                            }}>
                                            <span className="expensicons marginRight vAlignMiddle expensicons-receipt"></span>Transaction
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <h1>{pageTitle}</h1>
        </div>
    );
}

export default PageHeader;