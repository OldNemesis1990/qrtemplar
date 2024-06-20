import react, {Component} from 'react';

class AccountDetails extends Component {
    constructor (props) {
        super(props);
    }

    render = () => {
        return(
            <div className="account-fields">
                <div className="accountsRegistrationFields">
                    <div className="form-floating">
                        <select className="form-select" id="account-type" value={this.props.accountFields.account_type} onChange={(e) => {this.props.fieldChange(e, "account_details", "account_type")}}>
                            <option value="" selected="selected" disabled></option>
                            <option value="company">Company</option>
                            <option value="individual">Individual</option>
                        </select>
                        <label htmlFor="account-type">Account Type</label>
                    </div>

                    {
                        this.props.accountFields.account_type == "company" &&
                        <div className="form-floating">
                            <input id="company-name" className="form-control" onChange={(e) => {this.props.fieldChange(e , "account_details", "company_name")}} type="text" value={this.props.accountFields.company_name}  />
                            <label htmlFor="company-name">Company Name</label>
                        </div>

                    }

                    {
                        this.props.accountFields.account_type == "company" &&
                        <div className="form-floating">
                            <input id="industry" className="form-control" onChange={(e) => {this.props.fieldChange(e , "account_details", "industry")}} type="text" value={this.props.accountFields.industry}  />
                            <label htmlFor="industry">Industry</label>
                        </div>

                    }

                    <div className="form-floating">
                        <select className="form-select" id="purpose" value={this.props.accountFields.purpose} onChange={(e) => {this.props.fieldChange(e, "account_details", "purpose")}}>
                            <option value="" selected="selected" disabled></option>
                            <option value="marketing">Marketing</option>
                            <option value="social_media">Social Media</option>
                            <option value="product_tracking">Product Tracking</option>
                            <option value="information">Information</option>
                            <option value="sales">Sales</option>
                            <option value="network">Network</option>
                            <option value="payments">Payments</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="purpose">Purpose?</label>
                    </div>

                    {
                        this.props.accountFields.purpose == "other" &&
                        <div className="form-floating">
                            <input id="other-purpose" className="form-control" onChange={(e) => {this.props.fieldChange(e , "account_details", "other_purpose")}} type="text" value={this.props.accountFields.other_purpose}  />
                            <label htmlFor="other-purpose">Other Purpose</label>
                        </div>

                    }
                </div>
            </div>
        )
    }
}

export default AccountDetails