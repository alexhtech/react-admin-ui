import React from 'react'
import {TimePicker} from 'redux-form-material-ui'
import moment from 'moment'

export default ({input, ...props})=>{
    props.input = {...input, value: moment(input.value).toDate()}
    return (
        <TimePicker {...props}/>
    )
}