import React from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import UserMenu from './UserMenu'
import {getHeader} from '../../../lib'

@connect((state)=>({
    panel: state.modals.panel || false
}), {
    openModal, closeModal
})
export default class Header extends React.Component {

    togglePanel = () => {
        !this.props.panel ? this.props.openModal('panel') : this.props.closeModal('panel')
    }

    shouldComponentUpdate = () => {
        return false
    }

    render() {
        return <AppBar
            title={getHeader()}
            onLeftIconButtonTouchTap={this.togglePanel}
            iconElementRight={<UserMenu/>}
            style={{position: false}}
        />

    }
}