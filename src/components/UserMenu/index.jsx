import React from 'react'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Person from 'material-ui/svg-icons/social/person'
import styled from 'styled-components'

const UserMenu = styled.div`
    a {
        line-height: 48px;
        padding: 10px;
        font-weight: 100;
        color: whitesmoke;
        cursor: pointer;
        svg {
            color: white !important;
            margin: -5px 0;
        }
    }
`

export default class UserMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {user, logout, handleShow, handleClose, open} = this.props

        const close = () => {
            handleClose('userMenu')
        }
        const show = (e) => {
            this.setState({anchorEl: e.currentTarget})
            handleShow('userMenu')
        }
        return (
            <UserMenu>
                <a onClick={show}>
                    <Person/> {user.get('username') || user.get('email')}
                </a>
                <Popover
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={close}
                >
                    <Menu onItemTouchTap={close}>
                        <MenuItem primaryText='Sign out' onClick={logout}/>
                    </Menu>
                </Popover>
            </UserMenu>
        )
    }
}
