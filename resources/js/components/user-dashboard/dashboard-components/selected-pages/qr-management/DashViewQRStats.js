import React, {Component} from "react";
// Import the charts library

class DashDashViewQRStats extends React.Component {
    constructor(props) {
        super(props);

        this.setState = {
            campaign_id: localStorage.getItem('campaign_id')
        }

    }
    
    render = () => {
        return(
            <>
                <h4>View Stats Component</h4>
            </>
        )
    }
}


export default DashDashViewQRStats