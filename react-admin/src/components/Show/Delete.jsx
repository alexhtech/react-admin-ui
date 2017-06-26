import React from 'react'
import ActionButton from '../../Common/ActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

const DeleteAction = ({toggleConfirmDelete, confirmDelete, onDelete}) => (
    <div>
        <RaisedButton label='Delete' onClick={toggleConfirmDelete}/>
        <Dialog open={confirmDelete} actions={
            <div className='controls'>
                <RaisedButton
                    label='Cancel'
                    onClick={toggleConfirmDelete}
                />
                <ActionButton
                    component={RaisedButton}
                    label='Delete'
                    action={onDelete}
                    primary={true}
                />
            </div>
        }>
            Are you sure to delete?
        </Dialog>
    </div>
)

export default DeleteAction
