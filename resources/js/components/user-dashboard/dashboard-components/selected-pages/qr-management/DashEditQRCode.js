import React, {Component} from "react";

class DashEditQRCode extends React.Component {
    constructor(props) {
        super(props)

        this.setState = {
            campaign_id: localStorage.getItem('campaign_id')
        }
    }

    render = () => {
        return(
            <>
                <h4>Edit Component</h4>
            </>
        )
    }
}

export default DashEditQRCode