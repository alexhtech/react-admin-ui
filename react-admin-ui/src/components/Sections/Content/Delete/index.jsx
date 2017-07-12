import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {openModal, closeModal, Link} from 'react-isomorphic-tools'
import {RaisedButton, Dialog} from 'material-ui'
import ActionButton from '../../../Common/ActionButton'
import {handleDelete} from '../../../../actions'

@connect(state=>({
    open: state.modals.confirmDelete || false
}), {openModal, closeModal, handleDelete})
export default class Delete extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        del: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired,
        prefix: PropTypes.string.isRequired
    }

    handleOpenConfirmModal = () => {
        this.props.openModal('confirmDelete')
    }

    handleCloseConfirmModal = () => {
        this.props.closeModal('confirmDelete')
    }

    onDelete = () => {
        const {id, name, del, query, prefix} = this.props
        return this.props.handleDelete(id, name, del, query, prefix)
    }

    render() {
        const {open} = this.props
        return (
            <div>
                <RaisedButton label='Delete' onClick={this.handleOpenConfirmModal}/>
                <Dialog
                    open={open}
                    actions={
                        <div className='controls'>
                            <RaisedButton label='Cancel' onClick={this.handleCloseConfirmModal}/>
                            <ActionButton label='Delete' action={this.onDelete} primary={true}/>
                        </div>
                    }
                    onRequestClose={this.handleCloseConfirmModal}
                >Are you sure to delete?</Dialog>
            </div>
        )
    }
}
