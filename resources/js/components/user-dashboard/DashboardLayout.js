import React, {Component} from 'react';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'
import DashboardNav from './dashboard-components/DashboardNav'
import DashboardContent from './dashboard-components/DashboardContent'

class DashboardLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            manage_campaigns: false,
            role: "",
            page_loader: true,
            page: 1,
            campaign_id: 0,
            dyn_qr_id: 0,
            content_loader: false,
            account_info: [],
            user_info: []
        }

        this.setPage = this.setPage.bind(this)
        this.logout = this.logout.bind(this)
    }

    getUserData = () => {
        axios.get('/current-user-data').then( (response) => {
            this.setState({
                manage_campaigns: response.data.manage_campaigns,
                role: response.data.role.roles[0],
                page_loader: false,
                account_info: [...this.state.account_info, ...response.data.accounts],
                user_info: response.data.user,
                page: localStorage.getItem('dash-selection') !== null ? localStorage.getItem('dash-selection') : 1,
            })
        })
    }
    
    setPage = (e, page, campaign_id = null, qr_id = null) => {
        e.preventDefault()
        localStorage.setItem('dash-selection', page)
        this.setState({
            page: page,
            content_loader: true,
            campaign_id: campaign_id,
            dyn_qr_id: qr_id
        })
    }

    logout = (e) => {
        e.preventDefault()
        let logout = true
        axios.post("/logout-user", logout).then( (response) => {
            localStorage.removeItem('dash-selection')
            window.location.href = response.data.url
        } )
    }

    componentWillMount = () => {
        //Get user information
        this.getUserData();
    }

    componentDidMount = () => {
        // this.setState({
        //     page: localStorage.getItem('dash-selection')
        // })
    }

    render = () => {
        const loadDash = {
            hidden: {opacity: 0},
            enter: {opacity: 1}
        }
        const fade = {
            hide: {opacity:0},
            enter: {opacity: 1},
            exit: {opacity: 0}
        }
        return (
            <AnimatePresence key="1">
                {this.state.page_loader == true && <div className="loader" key="1"><motion.span className="spinner" key="2" style={{scale: 0}} animate={{scale: 1}}></motion.span></div>}
                <motion.div id="dashboard-app-inner" variants={loadDash} initial="hidden" animate="enter" key="3">
                    <div className="user-nav">
                        <DashboardNav campaign={this.state.manage_campaigns} setPage={this.setPage.bind(this)} page={this.state.page} logout={this.logout.bind(this)}/>
                    </div>
                    <div className="user-content">
                        <div className="user-content-inner">
                            <DashboardContent variants={fade} initial="hidden" animate="enter" campaign={this.state.manage_campaigns} page={this.state.page} accounts={this.state.account_info} user={this.state.user_info} setPage={this.setPage.bind(this)} qr_id={this.state.dyn_qr_id}/>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }
}

export default DashboardLayout