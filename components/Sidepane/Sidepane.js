import Image from 'next/image'
import { useState, useEffect, useContext } from "react"
import UserContext from '../../UserContext';
import SidepaneHeader from './SidepaneHeader';

export default function Sidepane() {
    const { unsetUser } = useContext(UserContext)

    // const [firstName, setFirstName] = useState(null)
    // const [lastName, setLastName] = useState(null)
    // const [balance, setBalance] = useState(null)

    // useEffect(() => {
    //     setFirstName(localStorage.getItem('firstName'))
    //     setLastName(localStorage.getItem('lastName'))
    //     setBalance(localStorage.getItem('balance'))
    // }, [firstName, lastName, balance]);

    return (
        <div className="sidepane production">
            <SidepaneHeader/>

            <div className="sidepane__nav mt-4">
                <ul role="navigation">
                    <li id="page_expenses" className="active">
                        <a href="expenses" className="app_page">
                            <span className="expensicons expensicons-receipt"></span>Transactions
                        </a>
                    </li>
                    <li id="page_reports">
                        <a href="reports" className="app_page">
                            <span className="expensicons expensicons-report"></span>Reports
                        </a>
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
                    <h1 className="gmail_com">TrackMo</h1>
                </a>
            </div>

        </div>
    )
}