import React from 'react'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import moment from 'moment'
import {withRouter} from 'react-router'
import Snackbar from '../../components/Snackbar'
moment.locale('en')

Date.toString = function () {
    return moment(this).utc().format()
}


@connect((state=>({
    panel: state.getIn(['modals', 'panel'])
})))
@withRouter
export default class Entity extends React.Component {
    render() {
        const panel = this.props.panel
        const {routes, params} = this.props
        return (
            <div style={{
                position: 'absolute',
                left: panel ? '256px' : 0,
                top: '45px',
                transition: '450ms',
                padding: '20px',
                width: `calc(100% - ${panel ? '296px' : '40px'})`
            }}>
                <Breadcrumbs routes={routes} params={params}/>
                <Snackbar/>
                {this.props.children}
            </div>
        )
    }
}