import React from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/action/note-add'
import List from 'material-ui/svg-icons/action/list'
import {getPrefix, getEntity} from '../../../../../lib'
import qs from 'qs'

@connect(null, {
    push
})
@withRouter
export default class Actions extends React.Component {
    handleTouchTapAdd = () => {
        this.props.push({
            pathname: `${getPrefix()}/${this.props.name}/create`,
            search: qs.stringify(this.props.params, {addQueryPrefix: true})
        })
    }

    handleTouchTapList = () => {
        this.props.push({
            pathname: `${getPrefix()}/${this.props.name}`,
            search: qs.stringify(this.props.params, {addQueryPrefix: true})
        })
    }

    render() {
        const {actions:{create, list}, name, label} = getEntity(this.props.name)
        return (
            <div>
                <p>Relation for {label || name}
                    {list && <IconButton tooltip={`List of ${label || name}`}>
                        <List hoverColor='green' onTouchTap={this.handleTouchTapList}/>
                    </IconButton>}
                    {create && <IconButton tooltip={`Create the ${label || name}`}>
                        <Add hoverColor='green' onTouchTap={this.handleTouchTapAdd}/>
                    </IconButton>}
                </p>
            </div>
        )
    }
}