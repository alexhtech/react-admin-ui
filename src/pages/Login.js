import React from 'react'
import LoginForm from '../../../react-admin-ui/components/Login/LoginForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../actions/Security'
import {push} from 'react-router-redux'

@connect((state)=>({
    user: state.authentication.user
}), (dispatch)=>({
    actions: bindActionCreators({login, push}, dispatch)
}))
export default class Login extends React.Component {
    render() {
        const {login, goto} = this.props.actions
        const go = () => {
            push('/')
        }

        return (
            <div>
                <LoginForm onSubmit={login} onSubmitSuccess={go}/>
            </div>
        )
    }
}