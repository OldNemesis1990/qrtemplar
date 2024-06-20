import React, { Component} from 'react'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'
import LitePackage from './detail/LitePackage'
import LitePlusPackage from './detail/LitePlusPackage'
import LightCampaign from './detail/LightCampaign'
import Campaign from './detail/Campaign'

class PackageIndex extends Component {
    constructor(props) {
        super(props)

        let sp = localStorage.getItem('selected_package')

        this.state = {
            selected_package: sp != "" ? sp : "",
            price_display: {
                lite: '0.00',
                litePlus: '5.99',
                lite_campaign: '34.99',
                campaign: '99.99'
            }
        }

        this.selectPackage = this.selectPackage.bind(this)
    }

    selectPackage = (e) => {
        this.setState({ selected_package: e.target.value })
    }   

    submitData = (e, sp, price) => {

        localStorage.setItem('selected_package', [sp])
        localStorage.setItem('price', [price])

        window.location.href = `/register/${sp}`
    }

    render = () => {
        const tableMotion = {
            hidden: {opacity: 0},
            enter: {opacity:1}
        }
        return (
            <>
                <div className="SelectorBox">
                    <select className="PackageSelector form-select" onChange={(e) => {this.selectPackage(e)}} selected={this.state.selected_package}>
                        <option value="" selected={this.state.selected_package == "" || this.state.selected_package == null ? true : false} disabled>Choose Package</option>
                        <option value="Lite" selected={this.state.selected_package == "Lite" ? true : false}>Lite - {this.state.price_display.lite == "0.00" ? "Free" : this.state.price_display.lite}</option>
                        {/* Release in future versions */}
                        <option value="Lite+" selected={this.state.selected_package == "Lite+" ? true : false}>Lite+ - {this.state.price_display.litePlus}</option>
                        <option value="Lite Campaign" selected={this.state.selected_package == "Lite Campaign" ? true : false}>Lite Campaign - {this.state.price_display.lite_campaign}</option>
                        <option value="Campaign" selected={this.state.selected_package == "Campaign" ? true : false}>Campaign - {this.state.price_display.campaign}</option>
                    </select>
                </div>
                {this.state.selected_package != "" && this.state.selected_package != null && 
                    <motion.div className="PackageTable">
                        {this.state.selected_package == "Lite" && <LitePackage submitData={this.submitData.bind(this)} pricing={this.state.price_display.lite} package={this.state.selected_package}/>}

                        {this.state.selected_package == "Lite+" && <LitePlusPackage submitData={this.submitData.bind(this)} pricing={this.state.price_display.litePlus} package={this.state.selected_package}/>}

                        {this.state.selected_package == "Lite Campaign" && <LightCampaign submitData={this.submitData.bind(this)} pricing={this.state.price_display.lite_campaign} package={this.state.selected_package}/>}

                        {this.state.selected_package == "Campaign" && <Campaign submitData={this.submitData.bind(this)} pricing={this.state.price_display.campaign} package={this.state.selected_package}/>}
                    </motion.div>
                }
                {this.state.selected_package == "" || this.state.selected_package == null && 
                    <motion.div variants={tableMotion} initial="hidden" animate="enter" className="PackageTable">
                        <div className="choose"><h2>Choose a Package</h2></div>
                    </motion.div>
                }
            </>
        )
    }
}

export default PackageIndex