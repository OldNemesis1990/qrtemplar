import React, {Component} from "react";
import { motion, AnimatePresence } from 'framer-motion'
import FormSelection from './FormSelection'
import FeedBackForm from "./FeedBackForm"
import Donations from "./../donation/DonationForm"
import { stringify } from "postcss";
import axios from "axios"

class FeedbackFormComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selection: "",
            fields: {
                name: "",
                email: "",
                message: ""
            },
            response_code: "",
            response_message: "",
            fieldValidation: ""
        }

        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSelectionChange = (e) => {
        this.setState({
            fields: {
                name: "",
                email: "",
                message: ""
            },
            selection: e.target.value,
            fieldValidation: ""
        })
    }

    onFieldChange = (e) => {
        let field = e.target.id 
        let value = e.target.value

        this.setState({ 
            fields: {...this.state.fields, [field]: value},
            fieldValidation: ""
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append("selection", this.state.selection)
        formData.append("fields", JSON.stringify(this.state.fields))

        if(this.state.fields.name == "" || this.state.fields.email == "" || this.state.fields.message == "") {
            console.log(this.state.fields.name, this.state.fields)
            this.setState({
                fieldValidation: "Please fill in all fields"
            })
        } else {
            axios.post('/mailing-route', formData).then(
                (response) => {
                    console.log(response)
                    this.setState({
                        response_code: response.data.response_code,
                        response_message: response.data.message
                    })
    
                    if(response.data.response_code == 200) {
                        this.setState({
                            fields: {
                                name: "",
                                email: "",
                                message: ""
                            },
                        })
                    }
                }
            )
        }
    }

    render = () => {
        const formAnim = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        const responseMsg = {
            hidden: {opacity: 0},
            visible: {opacity: 1}
        }

        return (
            <>
                <div className="selection">
                    <div className="feedback">
                        <h4>Feedback</h4>
                        <p>We would love to hear from you, please select an option in the box below to be heard by the us. Positive or Negative</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormSelection change={this.onSelectionChange.bind(this)} selected={this.state.selection}/>
                        </div>
                        <div className="col-md-6">
                            <Donations/>
                        </div>
                    </div>
                    <div className="formFields">
                        {this.state.fieldValidation != "" && <motion.div variants={responseMsg} initial="hidden" animate="visible" className="fieldValidation btn-danger"><p>{this.state.fieldValidation}</p></motion.div>} 

                        {this.state.selection != "" && <motion.div variants={formAnim} initial="hidden" animate="visible"><FeedBackForm fieldChange={this.onFieldChange.bind(this)} selection={this.state.selection} fields={this.state.fields} submit={this.onSubmit.bind(this)}/></motion.div>}
                        
                        {this.state.selection != "" && this.state.response_code == "" && <input onClick={(e) => {this.onSubmit(e)}} type="submit" value="Send Feedback" />}

                        {this.state.response_code != "" && <motion.div variants={responseMsg} initial="hidden" animate="visible" className="response-message"><div className="response-message-inner"><p>{this.state.response_message}</p></div></motion.div>}
                        
                    </div>
                </div>                
            </>
        )
    }
}

export default FeedbackFormComponent