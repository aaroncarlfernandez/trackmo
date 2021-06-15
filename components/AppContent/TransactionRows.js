import {Component} from 'react'
import AppHelper from "../../app-helper"

import { useContext, useEffect, useState } from "react"
import UserContext from '../../UserContext'

export default function TransactionRows () {
    const { transactions } = useContext (UserContext)
    const [fetchedTransactions, setFetchedTransactions] = useState(transactions);

    useEffect(() => {
        setFetchedTransactions(transactions)
    }, [transactions])

    let transactionRows = (fetchedTransactions===null) ? null : fetchedTransactions.sort(( a, b ) => { return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime() } ).map((transaction) => {
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
                                        <div className="date"><span>{transaction.dateAdded}</span></div>
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
                                    <div class="report">
                                        <button class="report-status unreported" type="button" role="link" tabindex="0">{transaction.categoryType}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="amount-meta-wrapper">
                            <div className="amount-meta">
                                <div className="inner">
                                    <div className="amount">
                                        <div role="button" className="amount isEditable">
                                            <div><span>₱</span> {transaction.amount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="receipt-thumb-wrapper"></div>
                        <div className="details-wrapper">
                            <div className="details">
                                <div className="inner comment">
                                    <div role="button" className="comment detail-content isEditable">{transaction.description}</div>
                                    <span className="detail-title">Description</span>
                                </div>
                                <div className="inner category">
                                    <div role="button" className="category detail-content isEditable" >{transaction.balanceAfterTransaction}</div>
                                    <span className="detail-title">Category</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    })
    return ( <>{transactionRows}</> )
}

// export default class TransactionRows extends Component {

//     state = {
//         transactions: []
//     }   
//     componentDidMount() {
//         if (typeof window !== "undefined") {
//             fetch(`${AppHelper.API_URL}/api/users/transactions/${localStorage.getItem('userId')}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
//                 }
//             })
//             .then((response) => response.json())
//             .then((transactions) => {
//                 this.setState({ transactions: transactions })
//             });
//         }
//     }

//      render() {

//         const transactionRows = this.state.transactions.map((transaction) => {
//             return (
//                 <div key={transaction._id} className="expenseRow Unreported cash isInlineEditEnabled" data-transaction-id="54596713733685250" role="button" >
//                     <div className="expenseRow-inner">
//                         <div className="expenseRow-wrapper">
//                             <div className="handle-wrapper">
//                                 <div className="handle">
//                                     <div className="inner"></div>
//                                 </div>
//                             </div>
//                             <div className="type-date-wrapper">
//                                 <div className="type-date">
//                                     <div className="inner">
//                                         <div role="button" className="created isEditable" >
//                                             <div className="date"><span>Jun 13 </span></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="merchant-report-wrapper">
//                                 <div className="merchant-report">
//                                     <div className="inner">
//                                         <div role="button" className="merchant isEditable">
//                                             <span className="merchant-name">{transaction.categoryName}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="amount-meta-wrapper">
//                                 <div className="amount-meta">
//                                     <div className="inner">
//                                         <div className="amount">
//                                             <div role="button" className="amount isEditable">
//                                                 <div><span>₱</span>{transaction.amount}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="receipt-thumb-wrapper"></div>
//                             <div className="details-wrapper">
//                                 <div className="details">
//                                     <div className="inner category">
//                                         <div role="button" className="category detail-content isEditable" >{transaction.categoryType}</div>
//                                         <span className="detail-title">Category</span>
//                                     </div>
//                                     <div className="inner comment">
//                                         <div role="button" className="comment detail-content isEditable">{transaction.description}</div>
//                                         <span className="detail-title">Description</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         })

//         return ( <>{transactionRows}</> )
//     }
//  }