import React from 'react'
import TransactionRows from "./TransactionRows"

const TransactionsList = () => {
    return (
        <div id={'expensesList'} className="comfortable">
            <div className="expenseRows">
                <div className="expenseRow expenseHeader">
                    <div className="expenseRow-inner">
                        <div className="expenseRow-wrapper table-sortable">
                            <div className="handle-wrapper"></div>
                            <div className="type-date-wrapper center">
                                <div className="date-header">
                                    <div className="inner comment">Date</div>
                                </div>
                            </div>
                            <div className="merchant-report-wrapper">
                                <div className="inner comment">Category Name</div>
                            </div>
                            <div className="amount-meta-wrapper center">
                                <div className="inner comment">Amount</div>
                            </div>
                            <div className="receipt-thumb-wrapper"></div>
                                <div className="details-wrapper">
                                    <div className="details">
                                        <div className="inner">
                                            <div className="inner comment">Description</div>
                                        </div>
                                        <div className="inner comment">Balance after transaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="fixed-header-spacer"></div>
                <TransactionRows />
            </div>
        </div>
    );
}

export default TransactionsList