import React from 'react'
import moment from 'moment'

export default ({data})=>(
    <div>{moment(data).format('MMMM Do YYYY, H:mm:ss')}</div>
)