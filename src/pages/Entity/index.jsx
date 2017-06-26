import React from 'react'
import {connect} from 'react-redux'
import Breadcrumbs from 'react-breadcrumbs'
import moment from 'moment'
import {withRouter} from 'react-router'
import Snackbar from '../../components/Snackbar'
import Panel from '../../components/Panel'
import Header from '../../components/Header'
import {openModal, closeModal} from 'react-isomorphic-tools'
import {logout} from '../../actions/Security'
import styled from 'styled-components'

const BreadcrumbsWrapper = styled.div`
    position: absolute;
    left: ${props => props.panel ? '256px' : 0};
    top: 45px;
    transition: 450ms;
    padding: 20px;
    width: calc(100% - ${props => props.panel ? '296px' : '40px'});
    .breadcrumbs {
        padding: 10px 0;
        span:last-child {
            color: blue;
        }
        a {
            color: black;
            text-decoration: none;
        }
    } 
`

moment.locale('en')

Date.toString = function () {
    return moment(this).utc().format()
}

@connect((state=>({
    user: state.getIn(['authentication', 'user'])
})), {openModal, closeModal, logout})
@withRouter
export default class Entity extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpenPanel: true
        }

    }

    togglePanel = () => {
        this.setState(prevState => ({
            isOpenPanel: !prevState.isOpenPanel
        }))
    }

    render() {
        const {routes, params, user, logout} = this.props
        return (
            <div>
                <Header
                    user={user}
                    logout={logout}
                    togglePanel={this.togglePanel}
                />
                <Panel
                    open={this.state.isOpenPanel}
                    handleShow={this.togglePanel}
                    handleClose={this.togglePanel}
                />
                <BreadcrumbsWrapper panel={this.state.isOpenPanel}>
                    <Breadcrumbs routes={routes} params={params}/>
                    {this.props.children}
                </BreadcrumbsWrapper>
                <Snackbar/>
            </div>
        )
    }
}
