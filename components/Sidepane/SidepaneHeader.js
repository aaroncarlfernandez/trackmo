import Image from 'next/image'
import { useState, useEffect, useContext } from "react"
import UserContext from '../../UserContext'

export default function SidepaneHeader () {
    const {balance, formatAmount} = useContext(UserContext)

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)

    useEffect(() => {
        setFirstName(localStorage.getItem('firstName'))
        setLastName(localStorage.getItem('lastName'))
    }, [balance]);

    return (
        <div className="sidepane__header">
            <div id={'user_menu'} className="user-icon active">
                <a href="#">
                    <Image src="/avatar_4.png" alt="User icon" width={60} height={60}  />
                </a>
            </div>
            <div className="user-email">{firstName} {lastName}</div>
            <div className="user-email">Savings: <span>₱</span> {formatAmount(balance)}</div>
        </div>
    )
}