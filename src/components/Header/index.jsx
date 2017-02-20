import React from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {openModal, closeModal} from 'redux-modals-state'
import {logout} from '../../actions/Security'
import UserMenu from '../UserMenu'

@connect((state)=>({
    modals: state.getIn(['modals']).toJS(),
    user: state.getIn(['authentication', 'user'])
}), (dispatch)=>({
    actions: bindActionCreators({
        show: (name)=>openModal(name),
        close: (name)=>closeModal(name),
        logout
    }, dispatch)

}))
export default class Header extends React.Component{
    render(){
        const {userMenu, panel} = this.props.modals
        const {user} = this.props
        const {close, logout, show} = this.props.actions
        const showPanel = () => {
            !panel ? show('panel') : close('panel')
        }
        return (
            <div>
                <AppBar
                    title='React Admin'
                    onLeftIconButtonTouchTap={showPanel}
                    iconElementRight={user ? <UserMenu handleShow={show} handleClose={close} logout={logout} user={user} open={userMenu}/>: null}
                    style={{position: 'fixed'}}
                />
            </div>
        )
    }
}