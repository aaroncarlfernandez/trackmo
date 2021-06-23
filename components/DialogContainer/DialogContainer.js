import { useContext, useEffect } from "react"
import UserContext from '../../UserContext'

import TransactionForm from "./TransactionForm"
import CategoryForm from "./CategoryForm"
const DialogContainer = () => {
    const {formSelected, setFormSelected, transactionSelected} = useContext(UserContext)

    let title = "New Transaction"
    if (formSelected==="transaction-update") {
        title = "Update Transaction"
    } else if (formSelected==="category") {
        title = "New Category"
    }

    const form = (formSelected==="category") ? <CategoryForm/> : <TransactionForm transactionDetails={transactionSelected} />

    return (
        <div id={'dialog_container'}>
            <div id={'dialog_overlay_new'} className="overlayBG dialog_overlay_new_active"></div>

            <div id={'dialog_7'} className="dialog dialog_new NewExpense dialog_7-active">

                <div className="dialog_title">
                    <a className="dialog_x" onClick={()=>setFormSelected("")}><i className="expensicons expensicons-remove"></i></a>
                    <h1 className="dialog_title_text">{title}</h1>
                </div>
                {form}
            </div>

        </div>
    );
}

export default DialogContainer;