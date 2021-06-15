
import {Component} from 'react'
import AppHelper from "../../app-helper"

export default class SidepaneHeader extends Component {

    state = {
        firstName: "",
        lastName: "",
        balance: 0
    }   
    componentDidMount() {
        if (typeof window !== "undefined") {
            fetch(`${AppHelper.API_URL}/api/users/details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ 
                    firstName: data.firstName, 
                    lastName: data.lastName,
                    balance:data.balance
                })
            });
        }
    }

    render() {
        <div className="sidepane__header">
            <div id={'user_menu'} className="user-icon active">
                <a href="#">
                    <Image src="/avatar_4.png" alt="User icon" width={60} height={60}  />
                </a>
            </div>
            <div className="user-email my-2">{this.state.firstName} {this.state.lastName}</div>
            <div className="user-email my-2">Balance: {this.state.balance} PHP</div>
        </div>
    }
 }