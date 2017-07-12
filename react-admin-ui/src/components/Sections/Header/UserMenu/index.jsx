import React from 'react'
import {connect} from 'react-redux'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Person from 'material-ui/svg-icons/social/person'
import {openModal, closeModal} from 'react-isomorphic-tools'
import {logout} from '../../../../actions/security'

@connect(state=>({
    user: state.authentication.user || false,
    userShow: state.modals.userShow || false
}), {openModal, closeModal, logout})
export default class UserMenu extends React.Component {

    handleClose = () => {
        this.props.close('userMenu')
    }

    handleOpen = (e) => {
        this.anchorEl = e.currentTarget
        this.props.openModal('userMenu')
    }

    render() {
        const {user, userShow} = this.props
        return this.props.user ? (
            <div className='user-menu'>
                <a onClick={this.handleOpen}>
                    <Person/> {user.username || user.email}
                </a>
                <Popover open={userShow} anchorEl={this.anchorEl} onRequestClose={this.handleClose}>
                    <Menu onItemTouchTap={this.handleClose}>
                        <MenuItem primaryText='Sign out' onClick={this.props.logout}/>
                    </Menu>
                </Popover>
            </div>
        ) : null
    }
}