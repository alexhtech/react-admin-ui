import React from 'react'
import ActionButton from '../../Common/ActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import styled from 'styled-components'

const styleButtonMargin = {
    marginRight: '15px'
}

const ControlsButton = styled.div`
    display: flex;
    justify-content: flex-end;
`

const DeleteAction = ({toggleConfirmDelete, confirmDelete, onDelete}) => (
    <div>
        <RaisedButton label='Delete' style={styleButtonMargin} onClick={toggleConfirmDelete}/>
        <Dialog open={confirmDelete} actions={
            <ControlsButton>
                <RaisedButton
                    label='Cancel'
                    onClick={toggleConfirmDelete}
                    style={styleButtonMargin}
                />
                <ActionButton
                    component={RaisedButton}
                    label='Delete'
                    action={onDelete}
                    primary={true}
                />
            </ControlsButton>
        }>
            Are you sure to delete?
        </Dialog>
    </div>
)

export default DeleteAction
