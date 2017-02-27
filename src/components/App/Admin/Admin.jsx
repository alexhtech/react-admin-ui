import React from "react"
import {connect} from "react-redux"
import {openModal, closeModal} from "react-isomorphic-tools"
import Header from "../../../../react-admin-ui/src/components/Header"

@connect(state=>({
    panel: state.getIn(["modals", "panel"])
}), {openModal, closeModal})

export default class Admin extends React.Component {
    handleShow = () => {
        this.props.openModal("panel")
    }

    handleClose = () => {
        this.props.closeModal("panel")
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}