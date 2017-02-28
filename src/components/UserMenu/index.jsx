import React from "react"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"
import Person from "material-ui/svg-icons/social/person"

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {user, logout, handleShow, handleClose, open} = this.props

        const close = () => {
            handleClose("userMenu")
        }
        const show = (e) => {
            this.setState({anchorEl: e.currentTarget})
            handleShow("userMenu")
        }
        return (
            <div className="user-menu">
                <a onClick={show}>
                    <Person/> {user.get('username') || user.get('email')}
                </a>
                <Popover
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={close}
                >
                    <Menu onItemTouchTap={close}>
                        <MenuItem primaryText="Sign out" onClick={logout}/>
                    </Menu>
                </Popover>
            </div>
        )
    }
}