import { useContext } from "react"
import UserContext from '../../UserContext'

import NewTransaction from "./NewTransaction"
import NewCategory from "./NewCategory"
const DialogContainer = () => {
    const {newSelected, setNewSelected} = useContext(UserContext)

    const title = (newSelected==="transaction") ? "New Transaction" : "New Category"
    const form = (newSelected==="transaction") ? <NewTransaction/> : <NewCategory/>

    return (
        <div id={'dialog_container'}>
            <div id={'dialog_overlay_new'} className="overlayBG dialog_overlay_new_active"></div>

            <div id={'dialog_7'} className="dialog dialog_new NewExpense dialog_7-active">

                <div className="dialog_title">
                    <a className="dialog_x" onClick={()=>setNewSelected("")}><i className="expensicons expensicons-remove"></i></a>
                    <h1 className="dialog_title_text">{title}</h1>
                </div>
                {form}
            </div>

        </div>
    );
}

export default DialogContainer;