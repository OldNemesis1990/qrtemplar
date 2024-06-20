import react, {Component} from 'react';

class UserDetails extends Component {
    constructor (props) {
        super(props);
    }

    render = () => {
        return(
            <div className="user-fields">
                <div className="package-display">
                    <label htmlFor="package-selected"><h2>Your Selected Package:</h2></label>
                    <input id="package-selected" className="form-control" type="text" value={this.props.package} disabled />
                </div>

                <div className="userRegistrationFields">
                    <div className="form-floating">
                        <input id="full-name" className="form-control" onChange={(e) => {this.props.fieldChange(e , "user_details", "full_name")}} type="text" value={this.props.userFields.full_name}  />
                        <label htmlFor="full-name">Full Name</label>
                    </div>

                    <div className="form-floating">
                        <input id="email-address" className="form-control" onChange={(e) => {this.props.fieldChange(e , "user_details", "email")}} type="email" value={this.props.userFields.email}  />
                        <label htmlFor="email-address">Email Address</label>
                    </div>

                    <div className="form-floating">
                        <input id="password" className="form-control" onChange={(e) => {this.props.fieldChange(e , "user_details", "password")}} type="password" value={this.props.userFields.password} />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetails