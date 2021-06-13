import Image from 'next/image'
import { useContext } from "react"
import UserContext from '../UserContext'

export default function Sidepane() {
    const {userDetails} = useContext(UserContext)

    return (
        <div className="sidepane production">

            <div className="sidepane__header">
                <div id={'user_menu'} className="user-icon active">
                    <a href="#">
                        <Image src="/avatar_4.png" alt="User icon" width={60} height={60}  />
                    </a>
                </div>
                {/* <div className="user-email my-2">{userDetails.firstName} {userDetails.lastName}</div>
                <div className="user-email my-2">Balance: {userDetails.balance} PHP</div> */}
            </div>

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
                        <a href="settings" id="js_page_admin_link" className="app_page">
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
    );
}