import React, {Component} from 'react'
import PageHeader from "./PageHeader"
import TransactionsList from "./TransactionsList"
import EmptyState from "./EmptyState"

export default class AppContent extends Component {
    state = {
        transactions: 0
    }

    componentDidMount(){
        this.setState({ transactions: localStorage.getItem('transactionsCount') })
     }

    render() {
        const content = (this.state.transactions>0) ? <TransactionsList /> : <EmptyState/>

        return (
            <div className="app-content-wrapper">
                <div id={'sideNav_wrapper'}>
                    <div id={'sideNav'}></div>
                </div>
    
                <div className="app-content">
                    <div id={"content_wrapper"} role="main">
                        <div id={"expensesTable"} className="has-2-columns">
                            <PageHeader />
                            {content}
                        </div>
                    </div>
                </div>
    
            </div>
        );
    }
}

