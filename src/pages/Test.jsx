import React from 'react'
import {connect} from 'react-redux'

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