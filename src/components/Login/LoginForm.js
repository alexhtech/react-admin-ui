import React from "react"
import Paper from "material-ui/Paper"
import {Field, reduxForm} from "redux-form"
import {TextField} from "redux-form-material-ui"
import RaisedButton from "material-ui/RaisedButton"

@reduxForm({
    form: "login"
})
export default class LoginForm extends React.Component{
    render(){
        const {handleSubmit, submitting, pristine} = this.props
        const style = {
            width: "100%"
        }

        return (
            <div className="login-form">
                <Paper zDepth={2}>
                    <form onSubmit={handleSubmit}>
                        <div style={{padding: "10px"}}>
                            <Field component={TextField} name="_username" floatingLabelText="Login" style={style}/>
                            <Field component={TextField} name="_password" type="password" floatingLabelText="Password" style={style}/>
                        </div>
                        <RaisedButton disabled={submitting||pristine} label="Sign In" type="submit" style={style}/>
                    </form>
                </Paper>
            </div>
        )
    }
}