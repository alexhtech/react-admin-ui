import React from 'react'
import Paper from 'material-ui/Paper'
import {Field, reduxForm} from 'redux-form/immutable'
import {TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const FieldsWrapper = styled.form`
    padding: 10px;
`

const styleField = {
    width: '100%'
}

@reduxForm({
    form: 'login'
})
export default class LoginForm extends React.Component{
    render(){
        const {handleSubmit, submitting, pristine} = this.props
        return (
            <LoginWrapper>
                <Paper zDepth={2}>
                    <form onSubmit={handleSubmit}>
                        <FieldsWrapper>
                            <Field
                                component={TextField}
                                name='_username'
                                floatingLabelText='Login'
                                style={styleField}
                            />
                            <Field
                                component={TextField}
                                name='_password'
                                type='password'
                                floatingLabelText='Password'
                                style={styleField}
                            />
                        </FieldsWrapper>
                        <RaisedButton
                            disabled={submitting||pristine}
                            label='Sign In'
                            type='submit'
                            style={styleField}
                        />
                    </form>
                </Paper>
            </LoginWrapper>
        )
    }
}
