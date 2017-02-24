import React from 'react'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'redux-modals-state'
import {bindActionCreators} from 'redux'
import Header from '../../../../react-admin-ui/src/components/Header'
import Panel from '../../../../react-admin-ui/src/components/Panel'
import '../../../../react-admin-ui/assets/styles/style.sass'

@connect(state=>({
    panel: state.getIn(['modals','panel'])
}), dispatch=>({
    actions: bindActionCreators({openModal, closeModal}, dispatch)
}))

export default class Admin extends React.Component {
    handleShow = () => {
        this.props.actions.openModal('panel')
    }

    handleClose = () => {
        this.props.actions.closeModal('panel')
    }

    render() {
        return (
            <div>
                <Header />
                <Panel open={this.props.panel} handleShow={this.handleShow}
                       handleClose={this.handleClose}/>
                {this.props.children}
            </div>
        )
    }
}