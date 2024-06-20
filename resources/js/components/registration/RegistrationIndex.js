import React, { Component } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'
import UserDetails from './pagination/UserDetails'
import AccountDetails from './pagination/AccountDetails'

class RegistrationIndex extends Component {
    constructor(props) {
        super(props)

        let sp = localStorage.getItem('selected_package')

        // if(sp.length >! 0 || sp == null) {
        //     window.location.href = `/packages`
        // }

        this.state = {
            package: sp,
            package_price: localStorage.getItem('price'),
            pagination_disabled: true,
            registration_disabled: true,
            page: "1",
            total_pages: 0,
            user_details: {
                full_name: "",
                email: "",
                password: ""
            },
            account_details: {
                account_type: "",
                company_name: "",
                industry: "",
                purpose: "",
                other_purpose: ""
            },
            loader: false,
            response: false,
            response_message: {
                message: "",
                response: []
            },
            response_class: ""
        }

        this.pagination = this.pagination.bind(this)
    }

    pagination = (o) => {
        let page = +this.state.page + o
        this.setState({
            page: page
        })
    }

    fieldChange = (e, stateField, field) => {
        let value = e.target.value
        let spreadState = stateField == "user_details" ? this.state.user_details : this.state.account_details

        this.setState({
            [stateField]: { ...spreadState, [field]: value },
        })

        setTimeout(() => {
            this.validation()

        }, 500)

    }

    validation = () => {
        let pagination_disabled = this.state.user_details.full_name.length > 0 && (this.state.user_details.email.length > 0 && this.state.user_details.email.indexOf("@") > -1) && this.state.user_details.password.length > 0 ? false : true

        let userData = this.state.user_details.full_name.length > 0 && (this.state.user_details.email.length > 0 && this.state.user_details.email.indexOf("@") > -1) && this.state.user_details.password.length > 0 ? true : false

        let accountData

        if (this.state.account_details.account_type.length > 0 && userData) {
            if (this.state.account_details.account_type == "individual") {
                if (this.state.account_details.purpose == "other_purpose" && this.state.account_details.purpose.length > 0) {
                    accountData = this.state.other_purpose.length > 0 ? true : false
                } else if (this.state.account_details.purpose != "other_purpose") {
                    accountData = this.state.account_details.purpose.length > 0 ? true : false
                }
            } else if (this.state.account_details.account_type == "company") {
                if (this.state.account_details.company_name.length > 0 && this.state.account_details.industry.length > 0 && this.state.account_details.purpose.length > 0) {
                    if (this.state.account_details.purpose == "other_purpose") {
                        accountData = this.state.other_purpose.length > 0 ? true : false
                    } else if (this.state.account_details.purpose != "other_purpose") {
                        accountData = this.state.account_details.purpose.length > 0 ? true : false
                    }
                }
            }
        }

        let registration_disabled = accountData ? false : true // Set the disabled based on the conditions

        this.setState({
            pagination_disabled: pagination_disabled,
            registration_disabled: registration_disabled
        })
    }

    componentDidMount = () => {
        let pn = document.querySelectorAll(".pageNumber")

        this.setState({
            total_pages: pn.length
        })
    }

    submitData = (e) => {

        this.setState({
            loader: true,
            response_message: { message: "", response: [] },
            response_class: ""
        })

        let subscription_id = ''
        let selected_package = this.state.package

        if (selected_package == "Lite") {
            subscription_id = 1
        }
        else if (selected_package == "Lite+") {
            subscription_id = 2
        }
        else if (selected_package == "Lite Campaign") {
            subscription_id = 3
        }
        else if (selected_package == "Campaign") {
            subscription_id = 4
        }

        let rData = new FormData()

        rData.append("package", subscription_id)
        rData.append("name", this.state.user_details.full_name)
        rData.append("email", this.state.user_details.email)
        rData.append("password", this.state.user_details.password)

        rData.append("account_type", this.state.account_details.account_type)
        rData.append("purpose", this.state.account_details.purpose)
        if (this.state.account_details.purpose == "other") {
            rData.append("other_purpose", this.state.account_details.other_purpose)
        }
        if (this.state.account_details.account_type == "company") {
            rData.append("company_name", this.state.account_details.company_name)
            rData.append("industry", this.state.account_details.industry)
        }

        axios.post('/register-user', rData)
            .then((response) => {
                this.setState({
                    loader: false,
                    response: true,
                    response_class: "btn-success",
                    response_message: {
                        message: this.state.package == "Lite" ? `Your account creation was successful. An email verification has been submitted to ${this.state.user_details.email}, please click on the link in the email to verify your account.` : "Your account was successfully created! We hope you have a pleasant term of service.",
                        response: []
                    }
                })
                localStorage.removeItem('price')
                localStorage.removeItem('selected_package')
            })
            .catch((error) => {
                this.setState({
                    loader: false,
                    response: true,
                    response_class: "btn-danger"
                    // response_message: {
                    //     message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: "
                    // }
                })
                console.log(error.response)
                //Package error
                if (error.response.data.errors.package) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.package]
                        }
                    })
                }
                // Name error
                if (error.response.data.errors.name) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.name]
                        }
                    })
                }
                // Email error
                if (error.response.data.errors.email) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.email]
                        }
                    })
                }
                // Password error
                if (error.response.data.errors.password) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.password]
                        }
                    })
                }
                // Account type error
                if (error.response.data.errors.account_type) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.account_type]
                        }
                    })
                }
                // Company name error
                if (error.response.data.errors.company_name) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.company_name]
                        }
                    })
                }
                // Industry error
                if (error.response.data.errors.industry) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.industry]
                        }
                    })
                }
                // Purpose error
                if (error.response.data.errors.purpose) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.purpose]
                        }
                    })
                }
                // Other purpose error
                if (error.response.data.errors.other_purpose) {
                    this.setState({
                        response_message: {
                            message: "Whoops, something went wrong. Well that's embarrassing! Perhaps the bullets below can assist: ",
                            response: [...this.state.response_message.response, error.response.data.errors.other_purpose]
                        }
                    })
                }

            })
    }

    render = () => {
        const pagination = {
            enter: { x: 0, opacity: 1, position: "relative" },
            hidden: { x: 500, opacity: 0, position: "absolute" },
            exit: { x: -500, opacity: 0, position: "absolute" }
        }
        const slideIn = {
            hidden: { x: 500, opacity: 0 },
            enter: { x: 0, opacity: 1 }
        }
        return (
            <div className="registration-form">
                {this.state.loader == true && <motion.div variants={slideIn} initial="hidden" animate="enter" className="loader"><motion.span className="spinner" style={{ scale: 0 }} animate={{ scale: 1 }}></motion.span></motion.div>}
                {this.state.response == true && <motion.div variants={slideIn} initial="hidden" animate="enter" className="response-message">
                    <div className={`response-message-inner ${this.state.response_class}`}>
                        <p>{this.state.response_message.message}</p>
                        <ul>
                            {this.state.response_message.response.map((r, i) => {
                                return (
                                    <li className={`message-${i}`} key={r}>{r}</li>
                                )
                            })}
                        </ul>
                    </div>
                </motion.div>}
                <AnimatePresence>
                    <div className="pageNumber">
                        {this.state.page == 1 &&
                            <motion.div className="userInputsOuter" variants={pagination} initial="hidden" animate="enter" exit="exit" key={`${this.state.page}-user`}>
                                <UserDetails pagination={this.pagination.bind(this)} package={this.state.package} userFields={this.state.user_details} fieldChange={this.fieldChange.bind(this)} pagination_disabled={this.state.pagination_disabled} />

                            </motion.div>}
                    </div>
                    <div className="pageNumber">
                        {this.state.page == 2 &&
                            <motion.div className="accountInputsOuter pageNumber" variants={pagination} initial="hidden" animate="enter" exit="exit" key={`${this.state.page}-account`}>
                                <AccountDetails pagination={this.pagination.bind(this)} package={this.state.package} accountFields={this.state.account_details} fieldChange={this.fieldChange.bind(this)} pagination_disabled={this.state.pagination_disabled} />
                            </motion.div>}
                    </div>
                </AnimatePresence>
                <div className="row">
                    <div className="col">
                        {this.state.page != "1" && <button className='btn btn-generate form-control' onClick={(e) => { this.pagination(-1) }}>Back</button>}
                    </div>
                    <div className="col">
                        {this.state.page != this.state.total_pages && <button className='btn btn-generate form-control' onClick={(e) => { this.pagination(+1) }} disabled={this.state.pagination_disabled}>Next</button>}
                        {this.state.page == this.state.total_pages && <button className='btn btn-generate form-control' onClick={(e) => { this.submitData(e) }} disabled={this.state.registration_disabled}>Register</button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationIndex
