import { useContext } from "react"
import UserContext from '../../UserContext'

import PageHeader from "./PageHeader"
import TransactionsList from "./TransactionsList"

const AppContent = () => {
    const {newSelected, setNewSelected} = useContext(UserContext)

    return (
        <div className="app-content-wrapper">
            <div id={'sideNav_wrapper'}>
                <div id={'sideNav'}></div>
            </div>

            <div className="app-content">
                <div id={"content_wrapper"} role="main">
                    <div id={"expensesTable"} className="has-2-columns">
                        <PageHeader />
                        <TransactionsList />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AppContent;