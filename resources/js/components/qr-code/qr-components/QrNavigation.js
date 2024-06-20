import React, { Component } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

class QrNavigation extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <>
                <div className="row">
                    <div className="col">
                        <a id="url" className="qr-link" href="#" value={this.props.navSelection} onClick={(e) => {this.props.retrieveNavform(e, 'url')}}>URL</a>
                    </div>
                    <div className="col">
                        <a id="text" className="qr-link" href="#" value={this.props.navSelection} onClick={(e) => {this.props.retrieveNavform(e, 'text')}}>Text</a>
                    </div>
                    <div className="col">
                        <a id="vcard" className="qr-link" href="#" value={this.props.vcard} onClick={(e) => {this.props.retrieveNavform(e, 'vcard')}}>VCard</a>
                    </div>
                    <div className="col">
                        <a id="email" className="qr-link" href="#" value={this.props.email} onClick={(e) => {this.props.retrieveNavform(e, 'email')}}>Email</a>
                    </div>
                    <div className="col">
                        <a id="tel" className="qr-link" href="#" value={this.props.tel} onClick={(e) => {this.props.retrieveNavform(e, 'tel')}}>Telephone</a>
                    </div>
                    {/* <div className="col">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="dropdown-toggle qr-link" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre="true">More</a>

                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">test</a>
                                </div>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </>
        )
    }
}

export default QrNavigation