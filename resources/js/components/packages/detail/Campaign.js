
import react, {Component} from 'react';
import {motion, AnimatePresence} from 'framer-motion'

class Campaign extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const tableAnim = {
            hidden: {x: 50, opacity: 0},
            enter: {
                x: 0, 
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1
                }
            },
            exit: {
                x: 50, 
                opacity:0,
                transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1
                }
            }
        }
        const tableChild = {
            hidden: {opacity: 0, scale: 1.3},
            enter: {opacity: 1, scale: 1},
        }
        return(
            <AnimatePresence>
                <motion.table variants={tableAnim} initial="hidden" animate="enter" exit="exit" className="table tGrey">
                    <thead>
                        <tr className="tableHeading">
                            <th>
                                <h2>{this.props.package} Package</h2>                            
                            </th>
                            <th>
                                <button className="btn btn-generate form-control" onClick={(e) => this.props.submitData(e, this.props.package, this.props.pricing)}>Sign Up - {this.props.pricing == "0.00" ? "Free" : this.props.pricing}PM</button>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="2"><h4>Used for large scale campaigns!</h4></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        <motion.tr variants={tableChild}>
                            <td>QR Tracking</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Add image to QR code</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Customize QR Codes</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>
                        
                        <motion.tr variants={tableChild}>
                            <td>Create dynamic pages for tracking</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Dashboard Access</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Analytics for Tracked URLs</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Dynamic QR Codes</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Static QR Codes</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Campaign Management</td>
                            <td><span className="check">&#x2713;</span></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Number of Dynamic QR Codes</td>
                            <td><p>250 (upto 10 per campaign)</p></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Number of Static QR Codes</td>
                            <td><p>Unlimited but do not get stored</p></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Number of Campaigns</td>
                            <td><p>25</p></td>
                        </motion.tr>

                        <motion.tr variants={tableChild}>
                            <td>Users</td>
                            <td><p>25</p></td>
                        </motion.tr>
                    </tbody>
                </motion.table>
            </AnimatePresence>
        )
    }
}

export default Campaign