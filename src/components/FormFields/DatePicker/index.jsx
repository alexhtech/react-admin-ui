import React from "react"
import {DatePicker} from "redux-form-material-ui"
import moment from "moment"

export default ({input, ...props})=>{
    props.input = {...input, value: moment(input.value).toDate()}
    return (
        <DatePicker {...props}/>
    )
}