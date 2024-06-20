import React, { Component } from "react"
import { BlockPicker } from 'react-color'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

class QrDesign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            creation_url: "",
            qr_url: `${window.location.origin}/storage/default_images/qrtemplar.svg`,
            displayBgColorPicker: false,
            displayFgColorPicker: false,
            qr_background: "#fff",
            qr_foreground: '#000',
            selected_option: "",
            size: "1024",
            format: "png",//png,svg,etc
            logo_upload: "",
            qr_name: ""
        }

        this.handleSize = this.handleSize.bind(this)
        this.handleBgClick = this.handleBgClick.bind(this)
        this.handleFgClick = this.handleFgClick.bind(this)
        this.retrieveQrBgAtts = this.retrieveQrBgAtts.bind(this)
        this.retrieveQrFgAtts = this.retrieveQrFgAtts.bind(this)
        this.handleFormat = this.handleFormat.bind(this)
        this.handleOptions = this.handleOptions.bind(this)
        this.createCode = this.createCode.bind(this)
    }

    setQrName = (e, field) => {
        this.setState({
            [field]: e.target.value
        })
    }

    handleSize = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    handleBgClick = () => {
        this.setState({
            displayBgColorPicker: !this.state.displayBgColorPicker
        })
    }

    handleFgClick = () => {
        this.setState({
            displayFgColorPicker: !this.state.displayFgColorPicker
        })
    }

    retrieveQrBgAtts = (color) => {
        this.setState({
            qr_background: color.hex
        })
    }

    retrieveQrFgAtts = (color) => {
        this.setState({
            qr_foreground: color.hex
        })
    }

    handleOptions = (e, selection) => {
        this.setState({
            selected_option: selection
        })
    }

    handleFormat = (e, selected_format) => {
        this.setState({
            format: selected_format
        })
    }

    handleUpload(e, trigger) {
        if([trigger] == "trigger_placeholder") {
            this.setState({
                logo_upload: e.target.files[0]
            })
        } else {
            this.setState({
                logo_upload: ""
            })
        }

        // alert(this.state.logo_upload.name)
    } 

    createCode = () => {
        let formData = new FormData

        formData.append('form_values', JSON.stringify(this.props.form_values))
        formData.append('qr_type', this.props.type)
        formData.append('campaign_id', this.props.campaign_id)
        formData.append('account_id', this.props.user.accounts[0].id)
        formData.append('size', this.state.size)
        formData.append('bg_color', this.state.qr_background)
        formData.append('fg_color', this.state.qr_foreground)
        formData.append('format', this.state.format)
        if(this.state.logo_upload != "") {
            formData.append('logo_upload', this.state.logo_upload, this.state.logo_upload.name)
        }
        formData.append('qr_name', this.state.qr_name)
        formData.append('selection', this.props.selection)

        console.log(Object.fromEntries(formData))
        axios.post('/create/qr', formData)
        .then( (res) => {
            console.log(res)
        } )
        .catch( (err) => {
            console.log(err)
        } )
    }

    render = () => {
        const item = {
            visible: {opacity: 1, scale: 1},
            hidden: {opacity: 0, scale: 0},
            exit: {opacity: 0, scale: 0},
        }
        return(
            <div id="qrDesignComponent">
                <div className="qrDesignInner">
                    <div className="row">
                        <div className="col-md-12 option-selection">
                            <div className="row">
                                <div className="col"><button className="btn btn-option form-control" onClick={(e) => {this.handleOptions(e, "size")}}>Size</button></div>
                                <div className="col"><button className="btn btn-option form-control" onClick={(e) => {this.handleOptions(e, "color")}}>Color</button></div>
                                <div className="col"><button className="btn btn-option form-control" onClick={(e) => {this.handleOptions(e, "format")}}>Format</button></div>
                                <div className="col"><button className="btn btn-option form-control" onClick={(e) => {this.handleOptions(e, "logo")}}>Logo</button></div>
                                <div className="col"><button type="button" className="btn btn-generate form-control" onClick={(e) => {this.createCode()}} disabled={this.props.gen_disabled}>Generate</button></div>
                            </div>
                        </div>
                        <div className="col-md-12 naming-field">
                            <input className="form-control" type="text" value={this.state.qr_name} onChange={(e) => {this.setQrName(e, 'qr_name')}} placeholder="Name of Qr Code" />
                        </div>
                        <div className="col-md-6 qr-code-display">
                            <div className="image-holder">
                                <object data={this.state.qr_url} width="100%" height="auto"></object>
                            </div>
                        </div>
                        <div className="col-md-6 qr-code-options">
                            {this.state.selected_option == "size" && <div className="qrSizeComponent">
                                <div className="sizeTitle">
                                    <h4>Size</h4>
                                </div>
                                <div className="qrSizeOptions">
                                    <div className="hor-radio-selection">
                                        <div id="qrSizing" onChange={this.handleSize}>
                                            <span className="separator"><p>128px</p><input type="radio" value="128" name="qr_size" checked={this.state.size === "128"} /></span>
                                            <span className="separator"><p>512px</p><input type="radio" value="512" name="qr_size" checked={this.state.size === "512"} /></span>
                                            <span className="separator"><p>1024px</p><input type="radio" value="1024" name="qr_size" checked={this.state.size === "1024"} /></span>
                                            <span className="separator"><p>2048px</p><input type="radio" value="2048" name="qr_size" checked={this.state.size === "2048"} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {this.state.selected_option == "color" && <div className="qrColorComponent">
                                <div className="colorTitle">
                                    <h4>Color</h4>
                                </div>
                                <div className="colorOptions">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div id="qr-background">
                                                <label className="toggleLabel" htmlFor="background-toggle">Background</label>
                                                <div id="background-toggle" style={{background: `${this.state.qr_background}`, width: 100 + '%', height: 20 + 'px', display: 'block', textAlign: "center",  boxShadow: "0 0 2px 0px #69c", borderRadius: 3 + "px"}} onClick={ this.handleBgClick }></div>
                                                <AnimatePresence>
                                                {this.state.displayBgColorPicker && 
                                                <div style={{marginTop: 10 + "px", position: "absolute", zIndex: 3}}>
                                                    <motion.div key="child" variants={item} initial="hidden" animate="visible" exit="exit">
                                                        <BlockPicker
                                                            color={ this.state.qr_background }
                                                            hex={ this.state.qr_background }
                                                            onChange={ this.retrieveQrBgAtts }
                                                        />
                                                    </motion.div>
                                                </div>}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div id="qr-foreground">
                                                <label className="toggleLabel" htmlFor="foreground-toggle">Foreground</label>
                                                <div id="foreground-toggle" style={{background: `${this.state.qr_foreground}`, width: 100 + '%', height: 20 + 'px', display: 'block', textAlign: "center", boxShadow: "0 0 2px 0px #69c", borderRadius: 3 + "px"}} onClick={ this.handleFgClick }></div>
                                                <AnimatePresence>
                                                    {this.state.displayFgColorPicker && 
                                                    <div style={{marginTop: 10 + "px", position: "absolute", zIndex: 3}}>
                                                        <motion.div variants={item} initial="hidden" animate="visible" exit="hidden">
                                                            <BlockPicker
                                                                color={ this.state.qr_foreground }
                                                                hex={ this.state.qr_foreground }
                                                                onChange={ this.retrieveQrFgAtts }
                                                            />
                                                        </motion.div>
                                                    </div>}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {this.state.selected_option == "format" && <div className="qrFileFormat">
                                <div className="formatTitle">
                                    <h4>Format</h4>
                                </div>
                                <div className="formatOptions">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className={`btn btn-primary ${this.state.format == "png" && 'btn btn-generate'}`} onClick={(e) => {this.handleFormat(e, "png")}}>PNG</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className={`btn btn-primary ${this.state.format == "svg" && 'btn btn-generate'}`} onClick={(e) => {this.handleFormat(e, "svg")}}>SVG</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {this.state.selected_option == "logo" && <div className="qrLogo">
                                <div className="logoTitle">
                                    <h4>Logo</h4>
                                </div>
                                <div className="logoOptions">
                                    {this.state.upload != "" && <input type="file" value="" onChange={ (e) => { this.handleUpload(e, "trigger_placeholder") } } />}
                                    {/* {this.state.upload != "" && 
                                    <>
                                    <p>{this.state.upload.name}</p><button onClick={(e) => { this.handleUpload(e, 'trigger_uploader') }}>Upload Other</button>                                    
                                    </>
                                    } */}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QrDesign