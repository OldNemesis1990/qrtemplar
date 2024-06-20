import React, {Component} from "react"

class FeedBackForm extends Component {
    constructor(props) {
        super(props)


    }

    render = () => {
        return (
            <form className="feedback-form">
                {this.props.selection == "suggestion" && 
                <div>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="text" value={this.props.fields.name} id="name" placeholder="Name"/>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="email" value={this.props.fields.email} id="email" placeholder="Email"/>
                    <textarea className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} id="message" value={this.props.fields.suggestion} placeholder="Suggestion"></textarea>
                </div>
                }
                {this.props.selection == "compliment" && 
                <div>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="text" value={this.props.fields.name} id="name" placeholder="Name"/>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="email" value={this.props.fields.email} id="email" placeholder="Email"/>
                    <textarea className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} id="message" value={this.props.fields.compliment} placeholder="Compliment"></textarea>
                </div>
                }
                {this.props.selection == "complaint" && 
                <div>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="text" value={this.props.fields.name} id="name" placeholder="Name"/>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="email" value={this.props.fields.email} id="email" placeholder="Email"/>
                    <textarea className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} id="message" value={this.props.fields.complaint} placeholder="Complaint"></textarea>
                </div>
                }
                {this.props.selection == "hi" && 
                <div>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="text" value={this.props.fields.name} id="name" placeholder="Name"/>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="email" value={this.props.fields.email} id="email" placeholder="Email"/>
                    <textarea className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} id="message" value={this.props.fields.message} placeholder="Say Hi"></textarea>    
                </div>
                }
                {this.props.selection == "other" && 
                <div>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="text" value={this.props.fields.name} id="name" placeholder="Name"/>
                    <input className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} type="email" value={this.props.fields.email} id="email" placeholder="Email"/>
                    <textarea className="form-control feedback-fields" required onChange={(e) => {this.props.fieldChange(e)}} id="message" value={this.props.fields.message} placeholder="Your Message"></textarea>    
                </div>
                }
                
            </form>
        )
    }
}

export default FeedBackForm