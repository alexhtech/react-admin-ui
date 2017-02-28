import React from "react"
import LoginForm from "../components/Login/LoginForm"
import {connect} from "react-redux"
import {login} from "../actions/Security"
import {push} from "react-router-redux"

@connect(null, {login, push})
export default class Login extends React.Component {
    render() {
        const {login, push} = this.props
        return (
            <div>
                <LoginForm onSubmit={login} onSubmitSuccess={()=>push("/")}/>
            </div>
        )
    }
}