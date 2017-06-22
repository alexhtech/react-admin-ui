import React from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import {logout} from '../../actions/Security'
import UserMenu from '../UserMenu'
import {getHeader} from '../../utils'

const styleAppBar = {
    position: 'fixed'
}

@connect((state)=>({
    userMenu:  state.getIn(['modals', 'userMenu']) || false,
    panel: state.getIn(['modals', 'panel']) || false,
    user: state.getIn(['authentication', 'user'])
}), {
    openModal, closeModal, logout
})

export default class Header extends React.Component {

    constructor(props) {
        super(props)

        this.title = getHeader()
    }

    togglePanel = () => {
        const { panel, openModal, closeModal} = this.props
        !panel ? openModal('panel') : closeModal('panel')
    }

    render() {
        const {openModal, closeModal, logout, userMenu, user} = this.props
        const Menu = user ?
                        <UserMenu
                            handleShow={openModal}
                            handleClose={closeModal}
                            logout={logout}
                            user={user}
                            open={userMenu}
                          />:
                          null
        return (
            <div>
                <AppBar
                    title={this.title}
                    onLeftIconButtonTouchTap={this.togglePanel}
                    iconElementRight={Menu}
                    style={styleAppBar}
                />
            </div>
        )
    }
}
