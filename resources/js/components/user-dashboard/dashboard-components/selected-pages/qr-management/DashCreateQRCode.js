import React, { Component } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import QrDesign from './qr-options/QrDesign'

class DashCreateQRCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaign_id: localStorage.getItem('campaign_id'),
            qr_type: "",
            qr_variant: "",
            form_value: {},
            step: "pageDesign", //This will be for the other fields default as a standard 1 pager design, if it is url then qr design should be 1 step
            gen_disabled: true      
        }
    }

    qrType = (e, type) => {
        e.preventDefault();

        this.setState({
            qr_type: type,
            qr_variant: "",
            form_value: {}
        })
    }

    setVariant = (e, variant) => {
        this.setState({
            qr_variant: variant,
            form_value: {}
        })
    }

    setStep = (e, stepLevel) => {
        this.setState({
            step: stepLevel
        })
    }

    changeDynField = (e, field) => {
        this.setState({
            form_value: {
                [field]: e.target.value
            },
            gen_disabled: false
        })
    }

    staticQRTemplate = () => {
        if(this.state.qr_variant == "" && this.state.qr_type == "static") {
            return( this.stat_default_fields() )        
        }
        if(this.state.qr_variant == "url" && this.state.qr_type == "static") {
            return( this.stat_web_url() )
        }
        return(
            <>
                static
            </>
        )
    }

    stat_default_fields = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "url"), this.setStep(e, "qrDesign") } }>Website URL</div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "document") } }>Document</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "vcard") } }>Vcard</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "app") } }>Application</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "social_media") } }>Social Media</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "business_page") } }>Business Page</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "coupons") } }>Coupons</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "feedback") } }>Feedback</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "video") } }>Video</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "images") } }>Images</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "multiple_links") } }>Multiple Links</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "event") } }>Event</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "menu") } }>Menu</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "mp3") } }>MP3</div>
                            </div>
                        </div> */}
                    </div>
                </motion.div>
            </>
        )
    }

    stat_web_url = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }
        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">https://</span>
                        </div>
                        <input className="form-control" type="text" id="url" placeholder="URL" value={this.state.form_value.url} onChange={(e) => { this.changeDynField(e, "url") }} />
                    </div>
                </motion.div>
            </>
        )
    }

    //SELECT The Correct form based on selection and type is Dynamic
    dynamicQRTemplate = () => {
        if(this.state.qr_variant == "" && this.state.qr_type == "dynamic") {
            return( this.dyn_default_fields() )        
        }

        if(this.state.qr_variant == "url" && this.state.qr_type == "dynamic") {
            return( this.dyn_web_url() )
        }

        if(this.state.qr_variant == "document" && this.state.qr_type == "dynamic") {
            return( this.dyn_document() )
        }

        if(this.state.qr_variant == "vcard" && this.state.qr_type == "dynamic") {
            return( this.dyn_vcard() )
        }

        if(this.state.qr_variant == "app" && this.state.qr_type == "dynamic") {
            return( this.dyn_app() )
        }

        if(this.state.qr_variant == "social_media" && this.state.qr_type == "dynamic") {
            return( this.dyn_social_media() )
        }

        if(this.state.qr_variant == "business_page" && this.state.qr_type == "dynamic") {
            return( this.dyn_business_page() )
        }

        if(this.state.qr_variant == "coupons" && this.state.qr_type == "dynamic") {
            return( this.dyn_coupons() )
        }

        if(this.state.qr_variant == "feedback" && this.state.qr_type == "dynamic") {
            return( this.dyn_feedback() )
        }

        if(this.state.qr_variant == "video" && this.state.qr_type == "dynamic") {
            return( this.dyn_video() )
        }

        if(this.state.qr_variant == "images" && this.state.qr_type == "dynamic") {
            return( this.dyn_images() )
        }

        if(this.state.qr_variant == "multiple_links" && this.state.qr_type == "dynamic") {
            return( this.dyn_multiple_links() )
        }

        if(this.state.qr_variant == "event" && this.state.qr_type == "dynamic") {
            return( this.dyn_event() )
        }

        if(this.state.qr_variant == "menu" && this.state.qr_type == "dynamic") {
            return( this.dyn_menu() )
        }

        if(this.state.qr_variant == "mp3" && this.state.qr_type == "dynamic") {
            return( this.dyn_mp3() )
        }
    }

    //dynamic fields
    dyn_default_fields = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "url"), this.setStep(e, "qrDesign") } }>Website URL</div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "document") } }>Document</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "vcard") } }>Vcard</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "app") } }>Application</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "social_media") } }>Social Media</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "business_page") } }>Business Page</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "coupons") } }>Coupons</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "feedback") } }>Feedback</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "video") } }>Video</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "images") } }>Images</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "multiple_links") } }>Multiple Links</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "event") } }>Event</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "menu") } }>Menu</div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6">
                            <div className="selection-item">
                                <div className="dyn-clickable-item" onClick={ (e) => { this.setVariant(e, "mp3") } }>MP3</div>
                            </div>
                        </div> */}
                    </div>
                </motion.div>
            </>
        )
    }

    dyn_web_url = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }
        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">https://</span>
                        </div>
                        <input className="form-control" type="text" id="url" placeholder="URL" value={this.state.form_value.url} onChange={(e) => { this.changeDynField(e, "url") }} />
                    </div>
                </motion.div>
            </>
        )
    }

    dyn_document = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }
        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )
    }

    dyn_vcard = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }
        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="row g-2">
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="first_name" placeholder="First Name" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="last_name" placeholder="Last Name" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-4">
                        <div className="form-inline">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                </div>
                                <input className="form-control" type="text" id="email" placeholder="Email" value={""} onChange={(e) => {""}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inline">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Tel</span>
                                </div>
                                <input className="form-control" type="text" id="contact_number" placeholder="Mobile Number" value={""} onChange={(e) => {""}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-inline">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">https://</span>
                                </div>
                                <input className="form-control" type="text" id="website_url" placeholder="Website URL" value={""} onChange={(e) => {""}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" id="company" placeholder="Company Name" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" id="job_title" placeholder="Job Title" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-12">
                        <textarea className="form-control" id="address" placeholder="Address: street number and name, suburb" value={""} onChange={(e) => {""}}></textarea>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" id="city" placeholder="City" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" id="postal_code" placeholder="Postal Code" value={""} onChange={(e) => {""}} />
                    </div>
                    <div className="col-md-12">
                        <input className="form-control" type="text" id="country" placeholder="Country" value={""} onChange={(e) => {""}} />
                    </div>
                </motion.div>
            </>
        )
    }

    dyn_app = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="form-floating">
                        <input type="file" />
                        <label htmlFor="dyn-app-desc">Application Logo</label>
                    </div>
                    <div className="form-floating">
                        <textarea id="dyn-app-desc" className="form-control"></textarea>                        
                        <label htmlFor="dyn-app-desc">Application Description</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-app-android-url" value={""} onChange={""} />
                        <label htmlFor="dyn-app-android-url">Android URL</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-app-ios-url" value={""} onChange={""} />
                        <label htmlFor="dyn-app-ios-url">iOS URL</label>
                    </div>
                </motion.div>
            </>
        )
    }

    dyn_social_media = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-facebook" value={""} onChange={""} />
                        <label htmlFor="dyn-facebook">Facebook URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-twitter" value={""} onChange={""} />
                        <label htmlFor="dyn-twitter">Twitter URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-linkedin" value={""} onChange={""} />
                        <label htmlFor="dyn-linkedin">Linkedin URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-instagram" value={""} onChange={""} />
                        <label htmlFor="dyn-instagram">Instagram URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-pintrest" value={""} onChange={""} />
                        <label htmlFor="dyn-pintrest">Pintrest URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-youtube" value={""} onChange={""} />
                        <label htmlFor="dyn-youtube">Youtube URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-vimeo" value={""} onChange={""} />
                        <label htmlFor="dyn-vimeo">Vimeo URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-tik-tok" value={""} onChange={""} />
                        <label htmlFor="dyn-tik-tok">Tik Tok URL:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-snapchat" value={""} onChange={""} />
                        <label htmlFor="dyn-snapchat">Snap Chat URL:</label>
                    </div>
                </motion.div>
            </>
        )
  
    }

    dyn_business_page = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )

    }

    dyn_coupons = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    
                </motion.div>
            </>
        )

    }

    dyn_feedback = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )

    }

    dyn_video = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-video-page-title" value={""} onChange={""} />
                        <label htmlFor="dyn-video-page-title">Video Page Title:</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" type="text" id="dyn-video-page-description" value={""} onChange={""}></textarea>
                        <label htmlFor="dyn-video-page-description">Video Page Description:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-video-page-url" value={""} onChange={""} />
                        <label htmlFor="dyn-video-page-url">Video Page URL:</label>
                    </div>
                </motion.div>
            </>
        )

    }

    dyn_images = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )

    }

    dyn_multiple_links = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )

    }

    dyn_event = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">

                </motion.div>
            </>
        )

    }

    dyn_menu = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-menu-page-title" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-title">Title:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="file" id="dyn-menu-page-cover" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-cover">Menu Cover Photo:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-menu-page-summary" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-summary">Summary:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="file" id="dyn-menu-page-pdf" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-pdf">Menu PDF:</label>
                    </div>
                </motion.div>
            </>
        )

    }

    dyn_mp3 = () => {
        const item = {
            visible: {opacity: 1, x: 0},
            hidden: {opacity: 0, x: 100},
            exit: {opacity: 0, x: -100}
        }

        return(
            <>
                <motion.div key="id" variants={item} initial="hidden" animate="visible" transition={{type: "tween", stiffness: 800}} className="single-field-input url-attibutes form-inline">
                    <div className="form-floating">
                        <input className="form-control" type="text" id="dyn-mp3-title" value={""} onChange={""} />
                        <label htmlFor="dyn-mp3-title">Title:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="file" id="dyn-menu-page-cover" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-cover">Menu Cover Photo:</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" type="file" id="dyn-menu-page-description" value={""} onChange={""} ></textarea>
                        <label htmlFor="dyn-menu-page-description">Description:</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" type="url" id="dyn-menu-page-url" value={""} onChange={""} />
                        <label htmlFor="dyn-menu-page-url">MP3 URL:</label>
                    </div>
                </motion.div>
            </>
        )

    }

    //static fields

    render = () => {
        const colAdjust = {
            startLeft: { width: "100%" },
            startRight: { width: "0%", opacity: 0 },
            animate_left: { width: "30%" },
            animate_right: { width: "70%", opacity: 1 }  
        }

        return(
            <div className="create-qr-code-panel">
                <div className="row">
                    <div className="col">
                        <div className="type-selection">
                            <div className="row g-3">
                                <div className="col">
                                    <button onClick={ (e) => { this.qrType(e, "dynamic") } } className="form-control">Dynamic</button>
                                </div>
                                <div className="col">
                                    {/* <button onClick={ (e) => { this.qrType(e, "static") } } className="form-control">Static</button>                             */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    <div className="row g-3 mt-3">
                        <motion.div key="width_left"  variants={colAdjust} initial="startLeft" animate={this.state.qr_variant != "" ? "animate_left" : ""} exit="startLeft" className="width-left">
                            <div className="qr-fields">
                                <form enctype="multipart/form-data">
                                    {this.state.qr_type == "dynamic" && this.dynamicQRTemplate()}
                                    {this.state.qr_type == "static" && this.staticQRTemplate()}
                                </form>
                            </div>
                        </motion.div>
                        {/* {this.state.qr_variant != "" &&  */}
                        <motion.div variants={colAdjust} initial="startRight" animate={this.state.qr_variant != "" ? "animate_right" : ""} exit="startRight" key="width_right" className="width-right">
                            <div className="qr-attirbutes">
                                {this.state.step == "qrDesign" && <QrDesign step={this.state.step} form_values={this.state.form_value} user={this.props.user} gen_disabled={this.state.gen_disabled} type={this.state.qr_type} campaign_id={this.state.campaign_id} selection={this.state.qr_variant} setPage={this.props.setPage.bind(this)} />}
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
        )
    }
}

export default DashCreateQRCode