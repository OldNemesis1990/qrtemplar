import React, {Component} from "react";

class FormSelection extends Component {
    constructor(props) { 
        super(props) 
    }

    render() {
        return (
            <select className="form-select" onChange={(e) => {this.props.change(e)}}>
                <option value="" selected disabled="disabled">Select your feedback</option>
                <option value="suggestion">Suggestion</option>
                <option value="compliment">Compliment</option>
                <option value="complaint">Complaint</option>
                <option value="hi">Just to say Hi!</option>
                <option value="other">Other</option>
            </select>
        )
    }
}

export default FormSelection