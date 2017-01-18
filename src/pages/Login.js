import React from 'react'
import LoginForm from '../../../react-admin-ui/components/Login/LoginForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from '../actions/Security'
import { goto } from 'react-isomorphic-render/redux'
import { head } from 'react-isomorphic-render'

@connect((state)=>({
    user: state.authentication.user
}), (dispatch)=>({
    actions: bindActionCreators({login, goto}, dispatch)
}))
export default class Login extends React.Component{
    render(){
        const {login, goto} = this.props.actions
        const go = () => {
            goto('/')
        }

        return (
            <div>
                {head('React Admin | Login')}
                <LoginForm onSubmit={login} onSubmitSuccess={go}/>
            </div>
        )
    }
}