import { useState } from "react"

export default function DialogContainer() {
    const [categorySelected, setCategorySelected] = useState(false);
    const [categoryType, setCategoryType] = useState("Income");

    return (
        <div id={'dialog_container'}>
            <div id={'dialog_overlay_new'} className="overlayBG dialog_overlay_new_active"></div>

            <div id={'dialog_7'} className="dialog dialog_new NewExpense dialog_7-active">

                <div className="dialog_title">
                    <a className="dialog_x"><i className="expensicons expensicons-remove"></i></a>
                    <h1 className="dialog_title_text">New Transaction</h1>
                </div>

                <div>
                    <div id={"newExpense3_panes"}>
                        <div className="newExpense3_one">   
                            <div id={'expenseDialogContainer'} className="floatWrapper">

                                <div className="floatLeft expenseDialogLeft smallTabs_content">

                                    <form id={'newExpense3_expenseForm'} className="form expenseForm js_modeContainer" noValidate="novalidate">
                                        <ol>
                                            <li className="category_dropdown separate">
                                                <label>Category</label>
                                                <select className="long" value={categorySelected} onChange={(e) => { setCategorySelected(e.target.value);  }} >
                                                    <option value="Uncategorized">Uncategorized</option>
                                                </select>
                                            </li>

                                            <li className="category_dropdown separate">
                                                <label>Type</label>
                                                <select className="long" value={categoryType} onChange={(e) => { setCategoryType(e.target.value);  }} >
                                                    <option value="Income">Income</option>
                                                    <option value="Expense">Expense</option>
                                                </select>
                                            </li>

                                            <li className="separate">
                                                <label>Date</label>
                                                <input  className="required calendar hasDatepicker valid" type="text" id="dp1623465040421" />
                                            </li>

                                            <li className="totalRow separate">
                                                <label>Amount</label>
                                                <input id={"newExpense3_oneExpense_amount"} className="required short" type="number" />
                                            </li>

                                                
                                            <li>
                                                <label>Description</label>
                                                <input className="long" type="text" maxLength="256" placeholder="" />
                                            </li>

                                        </ol>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="dialog_footer textCenter">
                        <button className="btn btn-lg btn-success-outline js_save">
                            Save
                        </button>
                    </div>

                    <div className="spinner hidden" id={"cachedSpinner"}></div>
                </div>
            </div>

        </div>
    );
}