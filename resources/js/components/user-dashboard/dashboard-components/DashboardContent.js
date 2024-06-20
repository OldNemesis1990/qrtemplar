import React, { Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import DashHome from './selected-pages/DashHome'
import DashCampaign from './selected-pages/DashCampaign'
import DashAccount from './selected-pages/DashAccount'
import DashNonCampaign from './selected-pages/DashNonCampaign'
import DashCreateQRCode from './selected-pages/qr-management/DashCreateQRCode'
import DashEditQRCode from './selected-pages/qr-management/DashEditQRCode'
import DashViewQRStats from './selected-pages/qr-management/DashViewQRStats'

class DashboardContent extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        if(this.props.page == 1) {
            return(
                <DashHome user={this.props.user} setPage={this.props.setPage.bind(this)}/>
            )
        } 
        else if(this.props.page == 2) {
            if(this.props.campaign) {
                return(
                    <DashCampaign user={this.props.user} campaign={this.props.campaign} setPage={this.props.setPage.bind(this)} />
                )
            } else {
                return(
                    <DashNonCampaign user={this.props.user} campaign={this.props.campaign} setPage={this.props.setPage.bind(this)} />
                )
            }
        }
        else if(this.props.page == 3) {
            return(
                <DashAccount user={this.props.user} campaign={this.props.campaign} />
            )
        }
        else if(this.props.page == 'create-qr') {
            return(
                <DashCreateQRCode user={this.props.user} campaign={this.props.campaign} setPage={this.props.setPage.bind(this)} />
            )
        } else if(this.props.page == 'edit-qr') {
            return(
                <DashEditQRCode user={this.props.user} campaign={this.props.campaign} qr_id={this.props.qr_id} setPage={this.props.setPage.bind(this)} />
            )
        } else if(this.props.page == 'view-qr-stats') {
            return(
                <DashViewQRStats user={this.props.user} campaign={this.props.campaign} qr_id={this.props.qr_id} setPage={this.props.setPage.bind(this)} />
            )
        }
    }
}

export default DashboardContent;