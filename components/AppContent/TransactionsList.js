import React, {Component} from 'react'
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

export default class TransactionsList extends Component {

    state = {
        transactions: []
    }
    componentDidMount() {
        if (typeof window !== "undefined") {
            fetch(`${AppHelper.API_URL}/api/users/transactions/${localStorage.getItem('userId')}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then((response) => response.json())
            .then((transactions) => {
                this.setState({ transactions: transactions })
            });
        }
     }

     render() {

        const transactionRows = this.state.transactions.map((transaction) => {
            return (
                <div key={transaction._id} className="expenseRow Unreported cash isInlineEditEnabled" data-transaction-id="54596713733685250" role="button" >
                    <div className="expenseRow-inner">
                        <div className="expenseRow-wrapper">
                            <div className="handle-wrapper">
                                <div className="handle">
                                    <div className="inner"></div>
                                </div>
                            </div>
                            <div className="type-date-wrapper">
                                <div className="type-date">
                                    <div className="inner">
                                        <div role="button" className="created isEditable" >
                                            <div className="date"><span>Jun 13 </span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="merchant-report-wrapper">
                                <div className="merchant-report">
                                    <div className="inner">
                                        <div role="button" className="merchant isEditable">
                                            <span className="merchant-name">{transaction.categoryName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="amount-meta-wrapper">
                                <div className="amount-meta">
                                    <div className="inner">
                                        <div className="amount">
                                            <div role="button" className="amount isEditable">
                                                <div><span>₱</span>{transaction.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="receipt-thumb-wrapper"></div>
                            <div className="details-wrapper">
                                <div className="details">
                                    <div className="inner category">
                                        <div role="button" className="category detail-content isEditable" >{transaction.categoryType}</div>
                                        <span className="detail-title">Category</span>
                                    </div>
                                    <div className="inner comment">
                                        <div role="button" className="comment detail-content isEditable">{transaction.description}</div>
                                        <span className="detail-title">Description</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div id={'expensesList'} className="comfortable">
                <div className="expenseRows">

                    <div className="expenseRow expenseHeader">
                        <div className="expenseRow-inner">
                            <div className="expenseRow-wrapper table-sortable">
                                <div className="handle-wrapper"></div>
                                <div className="type-date-wrapper center">
                                    <div className="date-header">
                                        <a>Date</a>
                                    </div>
                                </div>
                                <div className="merchant-report-wrapper">
                                    <a>Merchant</a>
                                </div>
                                <div className="amount-meta-wrapper center">
                                    <a>Amount</a>
                                </div>
                                <div className="receipt-thumb-wrapper"></div>
                                <div className="details-wrapper">
                                    <div className="details">
                                        <div className="inner">
                                            <a>Category</a>
                                        </div>
                                        <div className="inner comment">Description</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fixed-header-spacer"></div>

                    {transactionRows}

                    {/* <div className="expenseRow Unreported cash isInlineEditEnabled" data-transaction-id="54596713733685250" role="button" >
                        <div className="expenseRow-inner">
                            <div className="expenseRow-wrapper">
                                <div className="handle-wrapper">
                                    <div className="handle">
                                        <div className="inner"></div>
                                    </div>
                                </div>
                                <div className="type-date-wrapper">
                                    <div className="type-date">
                                        <div className="inner">
                                            <div className="type">
                                                <i className="expensicons expensicons-cash"></i>
                                            </div>
                                            <div role="button" className="created isEditable" contenteditable="true">
                                                <div class="date"><span>Jun 13 </span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="merchant-report-wrapper">
                                    <div className="merchant-report">
                                        <div className="inner">
                                            <div role="button" className="merchant isEditable" contenteditable="true">
                                                <span class="merchant-name">ASDFSDF</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="amount-meta-wrapper">
                                    <div className="amount-meta">
                                        <div className="inner">
                                            <div className="amount">
                                                <div role="button" className="amount isEditable" contenteditable="true">
                                                    <div><span>₱</span>435,345.<span>00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="receipt-thumb-wrapper"></div>
                                <div className="details-wrapper">
                                    <div className="details">
                                        <div className="inner category">
                                            <div role="button" className="category detail-content isEditable" contenteditable="true">Advertising</div>
                                            <span className="detail-title">Category</span>
                                        </div>
                                        <div className="inner comment">
                                            <div role="button" className="comment detail-content isEditable" contenteditable="true">sdfgsdfdfhggdfgh</div>
                                            <span className="detail-title">Description</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>

        )

     } 
}
