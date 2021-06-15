import Image from 'next/image'
import { useState, useEffect } from "react"

export default function SidepaneHeader () {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        setFirstName(localStorage.getItem('firstName'))
        setLastName(localStorage.getItem('lastName'))
        setBalance(localStorage.getItem('balance'))
    }, [firstName, lastName, balance]);

    return (
        <div className="sidepane__header">
            <div id={'user_menu'} className="user-icon active">
                <a href="#">
                    <Image src="/avatar_4.png" alt="User icon" width={60} height={60}  />
                </a>
            </div>
            <div className="user-email my-2">{firstName} {lastName}</div>
            <div className="user-email my-2">Balance: {balance} PHP</div>
        </div>
    )
}