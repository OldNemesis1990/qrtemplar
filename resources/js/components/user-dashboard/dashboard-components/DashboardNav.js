import React, { Component} from 'react';
import {motion, AnimatePresence} from 'framer-motion'

class DashboardNav extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const active_selection = this.props.page
        
        return(
            <nav className="dashboard-nav">
                <ul className="nav-items">
                    <li>
                        <a href="#" className={`nav-item-link ${active_selection == 1 ? 'active' : ''}`} onClick={(e) => {this.props.setPage(e, 1)}} key="dash-page-selector-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg><span>Home</span></a>
                    </li>
                    <li>
                        <a href="#" className={`nav-item-link ${active_selection == 2 ? 'active' : ''}`} onClick={(e) => {this.props.setPage(e, 2)}} key="dash-page-selector-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16"><path d="M2 2h2v2H2V2Z"/><path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/><path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/><path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/><path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/></svg>
                            <span>
                            {
                                this.props.campaign == false ? "QR Codes" : "Manage Campaigns"
                            }
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-item-link ${active_selection == 3 ? 'active' : ''}`} onClick={(e) => {this.props.setPage(e, 3)}} key="dash-page-selector-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg><span>Account</span></a>
                    </li>
                    <li>
                        <a href="#" className={`nav-item-link ${active_selection == 4 ? 'active' : ''}`} key="dash-page-selector-4" onClick={(e) => (this.props.logout(e))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/></svg><span>Logout</span></a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default DashboardNav;