import React, { Component} from 'react'
import axios from 'axios'

class DashAccount extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <div className="dash-account">
                <div className="account-intro intro">
                    <h2>Account Information</h2>
                </div>
                <div className="row gx-5">
                    <div className="user-information col">
                        <table className="user-information-table">
                            <thead>
                                <tr>
                                    <th colSpan="2">User Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Full Name</td>
                                    <td>{this.props.user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email Address</td>
                                    <td>{this.props.user.email}</td>
                                </tr>
                                <tr>
                                    <td>Account Type</td>
                                    <td>{this.props.user.roles[0].name}</td>
                                </tr>
                                <tr>
                                    <td>Password Change</td>
                                    <td><input type="password" placeholder="Change Password" value="" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="user-account-account col">
                        <table className="account-information-table">
                            <thead>
                                <tr>
                                    <th>Account Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Account Type</td>
                                    <td>{this.props.user.accounts[0].account_type}</td>
                                </tr>
                                {this.props.user.accounts[0].account_type == "company" && 
                                <tr>
                                    <td>Company Name</td>
                                    <td>{this.props.user.accounts[0].company_name}</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashAccount