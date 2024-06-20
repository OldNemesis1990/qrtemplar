import React, { Component} from 'react';

class DashHome extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <div className="dash-home">
                <h3>Hi {this.props.user.name}, </h3>
                <h2>Thank you for using QR Templar.</h2>
                <h5>See some of the nifty things you can do below</h5>
                <p>(Nifty things)</p>
                <p>Create or Manage your qr code</p>
                <button onClick={(e) => {this.props.setPage(e, 2)}} className="btn-generate">QR Codes</button>
            </div>
        )
    }
}

export default DashHome