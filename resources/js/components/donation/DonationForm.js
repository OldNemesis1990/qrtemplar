import React, {Component} from "react";

class Donations extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <>
                <a className="donation btn btn-generate form-control" href="https://www.paypal.com/donate/?hosted_button_id=B8DPQBQKZQ2V8" target="_blank">Help me grow with a donation?</a>
            </>
        )
    }
}
export default Donations