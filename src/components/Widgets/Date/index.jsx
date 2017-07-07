import React from 'react'
import moment from 'moment'

export default (props)=>{
    console.log(props)
    return (
        <div>{moment(props.data).format('MMMM Do YYYY, H:mm:ss')}</div>
    )
}
