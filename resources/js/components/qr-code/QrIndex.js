import React, { Component, useRef } from 'react'
import axios from 'axios'
import { motion, useAnimationFrame } from 'framer-motion'
import { SketchPicker } from 'react-color'
import QrNavigation from './qr-components/QrNavigation'
import QrForm from './qr-components/QrForm'
import QrAttributes from './qr-components/QrAttributes'

class QrIndex extends Component {
    constructor(props) {
        super(props)
        this.test = React.createRef

        this.state = {
            navSelection: 'url',
            formValues: [],
            attributes: {},
            form_submit_text: "Generate",
            qr_base_url: `${window.location.origin}/storage/default_images/qr-templar.png`,
            qr_directory: `${window.location.origin}/storage/temp_generated_qr_codes`,
            error: "",
            disabled: true,
            qr_background: "#fff",
            qr_foreground: '#000',
            qr_size: '512',
            loader:false
        }

        this.generateQrCode = this.generateQrCode.bind(this)
        this.retrieveSize = this.retrieveSize.bind(this)
    }

    getUserPackage = () => {
        axios.get('#')
        .then( (response) => {
            console.log(response)
        })
        .catch( (err) => {
            console.log(err)
        })
    }

    retrieveNavform = (e, field) => {
        e.preventDefault()

        let formValues = {}
        
        // this.setState({
        //     navSelection: field
        // })

        if(field == "url") {
            formValues.url = ''
        }
        else if(field == "text") {
            formValues.text = ''
        }
        else if(field == "vcard") {
            formValues = {
                first_name: '',
                last_name: '',
                email: '',
                contact_number: '',
                website_url: '',
                company: '',
                job_title: '',
                address: '',
                city: '',
                postal_code: '',
                country: ''
            }
        }
        else if(field == "email") {
            formValues = {
                mail: '',
                subject: '',
                body: ''
            }
        }
        else if(field == "telephone") {
            formValues.telephone = ''
        }

        this.setState({
            navSelection: field,
            formValues: formValues
        })
    }

    retrieveQrForm = (e, field) => {
        let formValues = this.state.formValues

        this.setState({
            formValues: {...formValues, [e.target.id]: e.target.value}
        })
    }

    retrieveQrBgAtts = (color) => {
        console.log(color)
        this.setState({
            qr_background: color.hex
        })
    }

    retrieveQrFgAtts = (color) => {
        console.log(color)
        this.setState({
            qr_foreground: color.hex
        })
    }

    retrieveSize = (e) => {
        this.setState({
            qr_size: e.target.value
        })
    }

    useAnimationFrame = (t) => {
        const rotate = Math.sin(t / 1000) * 200
        const y = (1 + Math.sin(t / 1000)) * -50
        console.log(rotate)
        this.test.current.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`
    }

    generateQrCode = (e) => {
        e.preventDefault()

        this.setState({
            form_submit_text: "Generating...",
            loader: true
        })

        let selection = this.state.navSelection
        let formData = new FormData()
        let formValue = this.state.formValues

        formData.append('formValues', JSON.stringify(this.state.formValues))
        formData.append('selection', this.state.navSelection)
        formData.append('background', this.state.qr_background)
        formData.append('foreground', this.state.qr_foreground)
        formData.append('qrSize', this.state.qr_size)

        axios.post('/generate-qr-code', formData)
        .then( (response) => {
            this.setState({
                form_submit_text: "QR Code ready!",
                qr_base_url: `${this.state.qr_directory}/${response.data.img_url}.png`,
                disabled: false,
                loader: false
            })

            setTimeout(() => {
                this.setState({
                    form_submit_text: "Generate"
                })
            }, 3500)
        })
        .catch( (err) => {
            console.log(err)
        })

    }

    render() {
        return(
            <>
                <div className='row mb-2'>
                    <div className="col-md-12">
                        <div className="qr-navigation">
                            <QrNavigation retrieveNavform={this.retrieveNavform} selection={this.state.navSelection}/>
                        </div>
                    </div>
                </div>

                <div className='row g-2'>
                    <div className="col-md-8">
                        <div className="qr-form-holder">
                            {this.state.error.length > 0 && <div className="err">{this.state.error}</div>}
                            <form onSubmit={(e) => {this.generateQrCode(e)}}>
                                <QrForm retrieveQrForm={this.retrieveQrForm.bind(this)} formValues={this.state.formValues} selection={this.state.navSelection}/>
                            </form>
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="qr-form-attributes">
                            {this.state.loader == true && <motion.div style={{opacity: 0}} animate={{opacity: 1}} className="loader"><motion.span class="spinner" style={{scale: 0}} animate={{scale: 1}}></motion.span></motion.div>}
                            <QrAttributes retrieveQrBgAtts={this.retrieveQrBgAtts.bind(this)} selectedSize={this.state.qr_size} handleSize={this.retrieveSize.bind(this)} retrieveQrFgAtts={this.retrieveQrFgAtts.bind(this)} attributes={this.state.attributes} qr_base_url={this.state.qr_base_url} btn_status={this.state.disabled} background={this.state.qr_background} foreground={this.state.qr_foreground} generate={this.generateQrCode.bind(this)} form_submit_text={this.state.form_submit_text}/>
                        </div>
                    </div>
                </div>
            </>           
        )
    }
}

export default QrIndex