import React from 'react'
import withRouter from 'react-router/lib/withRouter'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {getPrefix} from '../../..'

@connect(null, {
    push
})
@withRouter
export default class Actions extends React.Component {
    handleTouchTapAdd = () => {
        this.push({pathname: `/${getPrefix()}/${name}/create`, query: this.props.params})
    }

    handleTouchTapList = () => {
        this.push({pathname: `/${getPrefix()}/${name}`, query: this.props.params})
    }

    render() {
        const {actions:{create, list}, name, label} = this.props
        return (
            <div>
                <p>{label || name}</p>
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