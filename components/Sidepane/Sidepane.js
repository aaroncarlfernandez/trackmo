import { useContext } from "react"
import Link from 'next/link'
import UserContext from '../../UserContext';
import SidepaneHeader from './SidepaneHeader';

export default function Sidepane() {
    const { unsetUser, pageSelected, setPageSelected } = useContext(UserContext)

    const transactionsClass = (pageSelected==="transactions") ? 'active' : 'app_page'
    const reportsClass = (pageSelected==="reports") ? 'active' : 'app_page'

    return (
        <div className="sidepane production">
            <SidepaneHeader/>

            <div className="sidepane__nav">
                <ul role="navigation">
                    <li id="page_expenses" className="app_page">
                        <Link href="/logged-in">
                            <a className={transactionsClass} onClick={()=> setPageSelected("transactions")}>
                                <span className="expensicons expensicons-receipt"></span>Transactions
                            </a>
                        </Link>
                    </li>
                    <li id="page_reports">
                        <Link href="/logged-in">
                            <a className={reportsClass} onClick={()=> setPageSelected("reports")}>
                                <span className="expensicons expensicons-report"></span>Reports
                            </a>
                        </Link>
                    </li>
                    <li id="page_admin">
                        <a id="js_page_admin_link" className="app_page" onClick={()=> unsetUser()}>
                            <span className="expensicons expensicons-switch depreciated"></span>Log out
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <a href="/inbox" className="app_page">
                    <h1 className="gmail_com sidepane-bottom-logo">TrackMo</h1>
                </a>
            </div>

        </div>
    )
}