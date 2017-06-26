import React from 'react'
import {preload} from 'react-isomorphic-tools'
import {connect} from 'react-redux'

@preload(({fetchToState})=>fetchToState('/groups/1', {
    key: 'groups'
}))
@connect(state=>({
    groups: state.getIn(['fetchData'])
}))
export default class Test extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>Test component</div>
        )
    }
}