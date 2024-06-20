import React, { Component } from "react"
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { BlockPicker } from 'react-color'
import Donations from "./../../donation/DonationForm"

class QrAttributes extends Component {
    constructor(props) {
        super(props)

        this.state = {            
            displayBgColorPicker: false,
            displayFgColorPicker: false
        }
    }

    handleBgColorClick = () => {
        this.setState({
            displayBgColorPicker: !this.state.displayBgColorPicker
        })
    }

    handleFgColorClick = () => {
        this.setState({
            displayFgColorPicker: !this.state.displayFgColorPicker
        })
    }

    handleClose = () => {
        this.setState({
            displayBgColorPicker: false,
            displayFgColorPicker: false
        })
    }

    render = () => {
        const item = {
            visible: {opacity: 1, scale: 1},
            hidden: {opacity: 0, scale: 0},
            exit: {opacity: 0, scale: 0},
        }
        return(
            <>
                <div className="qr-attributes row g-2">
                    <div className="qr-code-image">
                        <img src={this.props.qr_base_url} alt="qr-image"/>                    
                    </div>
                    <div className="qr-attribute-options">
                        <div className="color-selection">
                            <div className="row">
                                <div className="col-md-6">
                                    <div id="qr-background">
                                        <label className="toggleLabel" htmlFor="background-toggle">Background</label>
                                        <div id="background-toggle" style={{background: `${this.props.background}`, width: 100 + '%', height: 20 + 'px', display: 'block', textAlign: "center",  boxShadow: "0 0 2px 0px #69c", borderRadius: 3 + "px"}} onClick={ this.handleBgColorClick }></div>
                                        <AnimatePresence>
                                        {this.state.displayBgColorPicker && 
                                        <div style={{marginTop: 10 + "px", position: "absolute", zIndex: 3}}>
                                            <motion.div key="child" variants={item} initial="hidden" animate="visible" exit="exit">
                                                <BlockPicker
                                                    color={ this.props.background }
                                                    hex={ this.props.background }
                                                    onChange={ this.props.retrieveQrBgAtts }
                                                />
                                            </motion.div>
                                        </div>}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div id="qr-foreground">
                                        <label className="toggleLabel" htmlFor="foreground-toggle">Foreground</label>
                                        <div id="foreground-toggle" style={{background: `${this.props.foreground}`, width: 100 + '%', height: 20 + 'px', display: 'block', textAlign: "center", boxShadow: "0 0 2px 0px #69c", borderRadius: 3 + "px"}} onClick={ this.handleFgColorClick }></div>
                                        <AnimatePresence>
                                            {this.state.displayFgColorPicker && 
                                            <div style={{marginTop: 10 + "px", position: "absolute", zIndex: 3}}>
                                                <motion.div variants={item} initial="hidden" animate="visible" exit="hidden">
                                                    <BlockPicker
                                                        color={ this.props.foreground }
                                                        hex={ this.props.foreground }
                                                        onChange={ this.props.retrieveQrFgAtts }
                                                    />
                                                </motion.div>
                                            </div>}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="qrSizeSelection">
                            <div className="hor-radio-selection">
                                <label className="sizingLabel" htmlFor="qrSizing">QR Code Dimensions</label>
                                <div id="qrSizing" onChange={this.props.handleSize}>
                                    <span className="separator"><p>128px</p><input type="radio" value="128" name="qr_size" checked={this.props.selectedSize === "128"} /></span>
                                    <span className="separator"><p>512px</p><input type="radio" value="512" name="qr_size" checked={this.props.selectedSize === "512"} /></span>
                                    <span className="separator"><p>1024px</p><input type="radio" value="1024" name="qr_size" checked={this.props.selectedSize === "1024"} /></span>
                                    <span className="separator"><p>2048px</p><input type="radio" value="2048" name="qr_size" checked={this.props.selectedSize === "2048"} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qr-attribute-buttons ">
                        <div className="row g-2">
                            <div className="col-md-6">
                                <a href={this.props.btn_status == false ? this.props.qr_base_url : "#"} disabled={this.props.btn_status} download={this.props.btn_status == false ? true : false}>
                                    <button className="qr-btn-png-download btn btn-generate form-control" disabled={this.props.btn_status}>Download PNG</button>
                                </a>
                            </div>
                            <div className="col-md-6">
                                <motion.input onClick={this.props.generate} className="btn btn-generate form-control" type="submit" value={this.props.form_submit_text} />
                            </div>
                            <div className="col-md-12">
                                <Donations/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default QrAttributes