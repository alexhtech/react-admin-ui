import React from "react"
import {connect} from "react-redux"
import Breadcrumbs from "react-breadcrumbs"
import moment from "moment"
import {withRouter} from "react-router"
import Snackbar from "../../components/Snackbar"
import Panel from "../../components/Panel"
import Header from "../../components/Header"
import {openModal, closeModal} from "react-isomorphic-tools"
moment.locale("en")

Date.toString = function () {
    return moment(this).utc().format()
}


@connect((state=>({
    panel: state.getIn(["modals", "panel"])
})), {openModal, closeModal})
@withRouter
export default class Entity extends React.Component {
    render() {
        const panel = this.props.panel
        const {routes, params} = this.props
        return (
            <div>
                <Header/>
                <div className="body">
                    <Panel open={this.props.panel} handleShow={this.props.openModal}
                           handleClose={this.props.closeModal}/>
                    <div style={{
                        position: "absolute",
                        left: panel ? "256px" : 0,
                        top: "45px",
                        transition: "450ms",
                        padding: "20px",
                        width: `calc(100% - ${panel ? "296px" : "40px"})`
                    }}>
                        <Breadcrumbs routes={routes} params={params}/>

                        {this.props.children}
                    </div>
                </div>
                <Snackbar/>
            </div>
        )
    }
}