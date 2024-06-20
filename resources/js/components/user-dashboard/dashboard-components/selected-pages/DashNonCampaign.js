import React, { Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import axios from 'axios'

class DashCampaign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account_id: this.props.user.accounts[0].id,
            created_campaigns: [],
            campaign_create_active: false,
            campaign_id: "",
            campaign_limit: 0,
            campaign_count: 0,
            qr_limit: 0,
            qr_count: 0,
            qr_codes: [],
            campaign_name: "",
            client_name: "",
            client_email: "",
            form_btn_text: "Create",
            form_update_status: false,
            loader: true
        }
    }

    
    changeCName = (e, field) => {
        this.setState({ 
            [field]: e.target.value,
        })
    }

    createCampaignTrigger = (e, attr) => {
        e.preventDefault()
        if(attr != "cancel") {
            this.setState({
                campaign_create_active: true,
                form_btn_text: "Create",
                form_update_status: false
            })
        } else {
            this.setState({
                campaign_create_active: false,
                form_btn_text: "Create",
                form_update_status: false,
                campaign_name: "",
                client_name: "",
                client_email: "",
            })
        }
    } 

    campaignOptions = (e, option, id, name = null, cname = null, cemail = null) => {
        if(option == "delete") {
            if(confirm("are you sure you want to delete this campaign?") == true) {
                let formData = new FormData()
                formData.append('id', id)
                formData.append('request_delete', true)
    
                axios.post('/update-delete-campaign', formData)
                .then( (response) => {
                    this.setState({
                        created_campaigns: [...response.data.account_info[0].campaigns],
                        campaign_limit: response.data.campaign_limit,
                        campaign_count: response.data.campaign_count
                    })
                } )
                .catch( (error) => {

                })
            }
        }
        if(option == "edit") {
            this.setState({
                campaign_create_active: true,
                form_btn_text: "Update",
                campaign_name: name,
                client_name: cname,
                client_email: cemail,
                campaign_id: id,
                form_update_status: true
            })
        }
    }

    updateCampaign = () => {
        let formData = new FormData();
        formData.append('id', this.state.campaign_id);
        formData.append('campaign_name', this.state.campaign_name)
        formData.append('client_name', this.state.client_name)
        formData.append('client_email', this.state.client_email)
        formData.append('account_id', this.state.account_id)
        
        axios.post('/update-delete-campaign', formData)
        .then( (response) => {
            console.log(response)
            this.setState({
                campaign_create_active: false,
                created_campaigns: [...response.data.account_info[0].campaigns],
                qr_codes: [...response.data.qr_codes],
                campaign_name: "",
                client_name: "",
                client_email: "",
                campaign_limit: response.data.campaign_limit,
                campaign_count: response.data.campaign_count
            })
        } )
    }
    
    createCampaign = () => {
        let formData = new FormData();
        formData.append('id', this.state.campaign_id);
        formData.append('campaign_name', this.state.campaign_name)
        formData.append('client_name', this.state.client_name)
        formData.append('client_email', this.state.client_email)
        formData.append('account_id', this.state.account_id)
        
        axios.post('/create-campaign', formData)
        .then( (response) => {
            console.log(response)
            this.setState({
                campaign_create_active: false,
                created_campaigns: [...response.data.account_info[0].campaigns],
                campaign_limit: response.data.campaign_limit,
                campaign_count: response.data.campaign_count,
                campaign_name: "",
                client_name: "",
                client_email: "",
            })
        } )
    }

    setCampaignId = (e, id) => {
        localStorage.setItem('campaign_id', id)
    }
    
    getUserQRCampaigns() {
        axios.get('/user-campaigns')
        .then( (response) => {
            console.log(response)
            this.setState({
                created_campaigns: [...response.data.account_info[0].campaigns],
                qr_codes: [...response.data.qr_codes],
                campaign_limit: response.data.campaign_limit,
                campaign_count: response.data.campaign_count,
                qr_limit: response.data.qr_Limit,
                loader: false
            })
        } )
        .catch( (error) => {

        } )
    }

    componentWillMount = () => {
        this.getUserQRCampaigns()
    }

    render = () => {
        const campaignForm = {
            hidden: {opacity: 0, x: -500, overflow: "hidden"},
            enter: {opacity: 1, x: 0, overflow: "hidden"},
            exit: {opacity: 0, x: -500, overflow: "hidden"}
        }
        return(
            <div className="campaign-management">
                {this.state.loader == true && <motion.div style={{opacity: 0}} animate={{opacity: 1}} className="loader"><motion.span className="spinner" style={{scale: 0}} animate={{scale: 1}}></motion.span></motion.div>}
                <div className="create-campaign">
                    <div className="row">
                        <div className="col-md-2">
                            {this.state.campaign_count < this.state.campaign_limit && <a href="#" className="create-campaign-item" onClick={(e) => {this.createCampaignTrigger(e)}}>{this.state.form_btn_text} Campaign</a>}
                        </div>
                        <div className="col-md-10">
                            <AnimatePresence>
                                {this.state.campaign_create_active && <motion.div variants={campaignForm} initial="hidden" animate="enter" exit="exit" className="create-form-item">
                                    <div className="form-floating">
                                        <input id="campaign-name" className="form-control" type="text" value={this.state.campaign_name} onChange={(e) => {this.changeCName(e, "campaign_name")}} />
                                        <label htmlFor="campaign-name">Campaign Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input id="client-name" className="form-control" type="text" value={this.state.client_name} onChange={(e) => {this.changeCName(e, "client_name")}} />
                                        <label htmlFor="client-name">Client Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input id="client-email" className="form-control" type="email" value={this.state.client_email} onChange={(e) => {this.changeCName(e, "client_email")}} />
                                        <label htmlFor="client-email">Client Email</label>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col">
                                            <input type="button" className="form-control btn-danger" onClick={(e) => {this.createCampaignTrigger(e, "cancel")}} value="Cancel" />
                                        </div>
                                        <div className="col">
                                            <input type="submit" value={this.state.form_btn_text} className="form-control btn-primary" onClick={(e) => {this.state.form_update_status ? this.updateCampaign(e) : this.createCampaign(e)}}/>
                                        </div>
                                    </div>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="created-campaigns">
                    {this.state.created_campaigns.map( (c) => {
                        return(
                            <div className={`campaign-item-${c.id} campaign-item`} key={c.id}>
                                <div key={c.id} className={`campaign-title campaign-title-${c.id}`}>
                                    <h4>{c.campaign_name}<span className="client-name"> - {c.client_name} ({c.client_email})</span> - {this.state.qr_count < this.state.qr_limit && <a href="#" className="create-qr-item" onClick={(e) => {this.props.setPage(e,'create-qr', c.id), this.setCampaignId(e, c.id)}}>Add QR Code to this campaign</a>}</h4>
                                    <div className="campaign-options">
                                        <button className="campaign-delete btn-danger form-control" onClick={ (e) => {this.campaignOptions(e, "delete", c.id)} }>Delete</button>
                                        <button className="campaign-edit btn-primary form-control" onClick={ (e) => {this.campaignOptions(e, "edit", c.id, c.campaign_name, c.client_name, c.client_email)} }>Edit</button>
                                    </div>
                                </div>
                                <div className={`campaign-body campaign-body-${c.id}`}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className={`row qr-row-${c.id} qr-placeholder`}>
                                                {this.state.qr_codes.map( (qr) => {
                                                    if(qr.campaign_id == c.id) {
                                                        return(
                                                            <div className="qr-slider">
                                                                <object data={`/storage/${qr.path}`} width="100%" height="auto"></object>
                                                                <div className="qr-title">
                                                                    <h4>{qr.name}</h4>
                                                                </div>
                                                            </div>
                                                        )
                                                    }                                                    
                                                } )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )}
                </div>
            </div>
        )
    }
}

export default DashCampaign