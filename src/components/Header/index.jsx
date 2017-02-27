import React from "react"
import AppBar from "material-ui/AppBar"
import {connect} from "react-redux"
import {openModal, closeModal} from "react-isomorphic-tools"
import {logout} from "../../actions/Security"
import UserMenu from "../UserMenu"

@connect((state)=>({
    modals: state.getIn(["modals"]).toJS(),
    user: state.getIn(["authentication", "user"])
}), {
    openModal, closeModal, logout
})
export default class Header extends React.Component {
    render() {
        const {userMenu, panel} = this.props.modals
        const {user} = this.props
        const {openModal, closeModal, logout} = this.props
        const togglePanel = () => {
            !panel ? openModal("panel") : closeModal("panel")
        }
        return (
            <div>
                <AppBar
                    title="React Admin"
                    onLeftIconButtonTouchTap={togglePanel}
                    iconElementRight={user ? <UserMenu handleShow={openModal} handleClose={closeModal} logout={logout} user={user}
                                                       open={userMenu}/> : null}
                    style={{position: "fixed"}}
                />
            </div>
        )
    }
}