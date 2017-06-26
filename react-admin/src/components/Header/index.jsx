import React from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import {logout} from '../../actions/Security'
import UserMenu from '../UserMenu'
import {getHeader} from '../../utils'

@connect((state)=>({
    userMenu: state.getIn('modals.userMenu'.split('.')) || false,
    panel: state.getIn('modals.panel'.split('.')) || false,
    user: state.getIn('authentication.user'.split('.')) || false
}), {
    openModal, closeModal, logout
})
export default class Header extends React.Component {

    togglePanel = () => {
        !this.props.panel ? this.props.openModal('panel') : this.props.closeModal('panel')
    }

    render() {
        const {userMenu} = this.props
        const {user} = this.props
        const {openModal, closeModal, logout} = this.props
        return (
            <AppBar
                title={getHeader()}
                onLeftIconButtonTouchTap={this.togglePanel}
                iconElementRight={user ?
                    <UserMenu handleShow={openModal} handleClose={closeModal} logout={logout} user={user}
                              open={userMenu}/> : null}
                style={{position: false}}
            />
        )
    }
}