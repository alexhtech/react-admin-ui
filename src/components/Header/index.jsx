import React from 'react'
import AppBar from 'material-ui/AppBar'
import UserMenu from '../UserMenu'
import {getHeader} from '../../utils'

const styleAppBar = {
    position: 'fixed'
}

export default class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpenUserMenu: false
        }

        this.title = getHeader()
    }

    toggleUserMenu = () => {
        this.setState(prevState => ({
            isOpenUserMenu: !prevState.isOpenUserMenu
        }))
    }

    render() {
        const {logout, user, togglePanel} = this.props
        const Menu = user ?
                        <UserMenu
                            handleShow={this.toggleUserMenu}
                            handleClose={this.toggleUserMenu}
                            logout={logout}
                            user={user}
                            open={this.state.isOpenUserMenu}
                          />:
                          null
        return (
            <AppBar
                title={this.title}
                onLeftIconButtonTouchTap={togglePanel}
                iconElementRight={Menu}
                style={styleAppBar}
            />
        )
    }
}
