import React from 'react'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import moment from 'moment'
moment.locale('en')

Date.toString = function () {
    return moment(this).utc().format()
}


@connect((state=>({
    modals: state.modals,
    router: state.router
})))
export default class Entity extends React.Component{
    render(){
    const {panel} = this.props.modals
    const {routes, params} = this.props
        return (
            <div style={{position: 'absolute', left: panel ? '256px': 0, top: '64px', transition: '450ms', padding: '20px'}}>
                <Breadcrumbs routes={routes} params={params}/>
                {this.props.children}
            </div>
        )
    }
}