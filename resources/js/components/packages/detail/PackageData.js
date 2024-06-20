import react, {Component} from 'react';
import {motion, AnimatePresence} from 'framer-motion'

class PackageData extends Component {
    constructor(props) {
        super(props)
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
            <>
                <AnimatePresence>
                    {
                        this.props.data.map( (data, key) => {
                            if(this.props.selection == data.id) {
                                var tableData = JSON.parse(data.package_data)
                                return (
                                    <motion.table variants={tableAnim} initial="hidden" animate="enter" exit="exit" className="table tGrey">
                                    <thead>
                                        <tr className="tableHeading">
                                            <th>
                                                <h2>{data.package_name}</h2>                            
                                            </th>
                                            <th>
                                                <button className="btn btn-generate form-control">Sign Up for ${data.package_price}PM</button>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <th>Available</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(tableData).map( (key, i) => {
                                            console.log(tableData[key])
                                            return (
                                                <AnimatePresence>
                                                    <motion.tr variants={tableChild} key={i}>
                                                        <td>{key}</td>
                                                        <td><span dangerouslySetInnerHTML={{__html: tableData[key]}} /></td>
                                                    </motion.tr>
                                                </AnimatePresence>
                                            )
                                        } )}
                                    </tbody>
                                    </motion.table>
                                )
                            }
                        } )
                    }   
                </AnimatePresence>
            </>
        )
    }
}

export default PackageData