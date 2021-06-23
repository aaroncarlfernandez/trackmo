import { useContext, useEffect, useState } from "react"
import UserContext from '../../UserContext'

export default function TransactionRows () {
    const { transactions, formatAmount, setFormSelected, setTransactionSelected } = useContext (UserContext)
    const [fetchedTransactions, setFetchedTransactions] = useState(transactions);

    useEffect(() => {
        setFetchedTransactions(transactions)
    }, [transactions])

    const openTransactionDialog = (e) => {
        e.preventDefault();
        console.log("clicked: " + e.currentTarget.id)
        setFormSelected("transaction-update")
        // setTransactionSelected(e.currentTarget.id)
        setTransactionSelected(transactions.filter(transaction => transaction._id === e.currentTarget.id))
    }


    let transactionRows = (fetchedTransactions===null) ? null : fetchedTransactions.sort(( a, b ) => { return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime() } ).map((transaction) => {
        
        const categoryTypeClass = (transaction.categoryType==="Income") ? "report-status reimbursed" : "report-status deleted"

        return (
            <div key={transaction._id} id={transaction._id} className="expenseRow Unreported cash isInlineEditEnabled" role="button" onClick={(e)=> openTransactionDialog(e)}>
                <div className="expenseRow-inner" >
                    <div className="expenseRow-wrapper">
                        <div className="handle-wrapper">
                            <div className="handle">
                                <div className="inner"></div>
                            </div>
                        </div>
                        <div className="type-date-wrapper">
                            <div className="type-date">
                                <div className="inner">
                                    <div className="created" >
                                        <div className="date"><span>{transaction.dateAdded}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="merchant-report-wrapper">
                            <div className="merchant-report">
                                <div className="inner">
                                    <div className="merchant">
                                        <span className="merchant-name">{transaction.categoryName}</span>
                                    </div>
                                    <div className="report">
                                        <button className={categoryTypeClass} type="button" role="link">{transaction.categoryType}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="amount-meta-wrapper">
                            <div className="amount-meta">
                                <div className="inner">
                                    <div className="amount">
                                        <div className="amount">
                                            <div><span>₱</span> {formatAmount(transaction.amount)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="receipt-thumb-wrapper"></div>
                        <div className="details-wrapper">
                            <div className="details">
                                <div className="inner comment">
                                    <div className="comment detail-content">{transaction.description}</div>
                                    <span className="detail-title">Description</span>
                                </div>
                                <div className="inner category">
                                    <div className="category detail-content" ><span>₱</span> {formatAmount(transaction.balanceAfterTransaction)}</div>
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