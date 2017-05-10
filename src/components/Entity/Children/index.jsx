import React from 'react'
import withRouter from 'react-router/lib/withRouter'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/action/note-add'
import List from 'material-ui/svg-icons/action/list'
import {getPrefix} from '../../..'

@connect(null, {
    push
})
@withRouter
export default class Actions extends React.Component {
    handleTouchTapAdd = () => {
        this.props.push({pathname: `/${getPrefix()}/${this.props.name}/create`, query: Object.assign(this.props.extra, this.props.params)})
    }

    handleTouchTapList = () => {
        this.props.push({pathname: `/${getPrefix()}/${this.props.name}`, query: Object.assign(this.props.extra, this.props.params)})
    }

    render() {
        const {actions:{create, list}} = this.props
        return (
            <div>
                {list && <IconButton>
                    <List hoverColor='green' onTouchTap={this.handleTouchTapList}/>
                </IconButton>}
                {create && <IconButton>
                    <Add hoverColor='green' onTouchTap={this.handleTouchTapAdd}/>
                </IconButton>}
            </div>
        )
    }
}