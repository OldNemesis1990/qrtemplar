import React, { Component } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from "prop-types"

class QrForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errMsgDisplay: false,
            errMsg: "" 
        }
    }

    validate = (e, field) => {

        if(field == "url" && e.target.value.indexOf("http://") == 0) {
            this.setState({
                errMsg: "Please remove the http:// protocol from your url field as the url will be broken when generated",
                errMsgDisplay: true
            })
        } else if (field == "url" && e.target.value.indexOf("https://") == 0) {
            this.setState({
                errMsg: "Please remove the https:// protocol from your url field as the url will be broken when generated",
                errMsgDisplay: true
            })
        } else {
            this.setState({
                errMsg: "",
                errMsgDisplay: false
            })
        }
    }

    render = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <AnimatePresence exit={false}>
                    {this.state.errMsgDisplay &&
                    <motion.div key="id" variants={item} initial="hidden" animate="visible" exit="exit" transition={{type: "tween", stiffness: 800}} className="error-msg btn-danger">
                        {this.state.errMsg}
                    </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence exit={false}>
                    {this.props.selection == 'url' && 
                        <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">https://</span>
                                </div>
                                <input className="form-control" type="text" id="url" placeholder="URL" value={this.props.formValues.url} onChange={(e) => {this.props.retrieveQrForm(e,'url'), this.validate(e, 'url')}} />
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence exit={false}>
                    {this.props.selection == 'text' && 
                        <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input text-attributes">
                            <textarea className="form-control" id="text" placeholder="QR code text" value={this.props.formValues.text} onChange={(e) => {this.props.retrieveQrForm(e,'text')}}></textarea> 
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence exit={false}>
                    {this.props.selection == 'vcard' && <>
                        <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="row g-2">
                            <div className="col-md-4">
                                <input className="form-control" type="text" id="first_name" placeholder="First Name" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-4">
                                <input className="form-control" type="text" id="last_name" placeholder="Last Name" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-4">
                                <div className="form-inline">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                        </div>
                                        <input className="form-control" type="text" id="email" placeholder="Email" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inline">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Tel</span>
                                        </div>
                                        <input className="form-control" type="text" id="contact_number" placeholder="Mobile Number" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-inline">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">https://</span>
                                        </div>
                                        <input className="form-control" type="text" id="website_url" placeholder="Website URL" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard'), this.validate(e, 'url')}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" id="company" placeholder="Company Name" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" id="job_title" placeholder="Job Title" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-12">
                                <textarea className="form-control" id="address" placeholder="Address: street number and name, suburb" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}}></textarea>
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" id="city" placeholder="City" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" id="postal_code" placeholder="Postal Code" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" id="country" placeholder="Country" value={this.props.formValues.vcard} onChange={(e) => {this.props.retrieveQrForm(e,'vcard')}} />
                            </div>
                        </motion.div>
                        </>
                    }
                </AnimatePresence>
                <AnimatePresence exit={false}>
                    {this.props.selection == 'email' && 
                        <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="row g-2">
                            <div className="col-md-12">
                                <div className="form-inline">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                        </div>
                                        <input className="form-control" type="email" id="mail" placeholder="To (predefined)" value={this.props.formValues.email} onChange={(e) => {this.props.retrieveQrForm(e,'email')}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" id="subject" placeholder="Subject (predefined)" value={this.props.formValues.email} onChange={(e) => {this.props.retrieveQrForm(e,'email')}} />
                            </div>
                            <div className="col-md-12">
                                <textarea className="form-control" id="body" placeholder="Email Body (predefined)" value={this.props.formValues.email} onChange={(e) => {this.props.retrieveQrForm(e,'email')}}></textarea>
                            </div>                        
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence exit={false}>
                    {this.props.selection == 'tel' && 
                        <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input contact-attributes">
                            <div className="form-inline">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Tel</span>
                                    </div>
                                    <input className="form-control" type="tel" id="telephone" placeholder="Telephone Number" value={this.props.formValues.tel} onChange={(e) => {this.props.retrieveQrForm(e,'telephone')}} />
                                </div>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </>
        )
    }
}

export default QrForm