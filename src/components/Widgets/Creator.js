import React from 'react'

export default class Creator extends React.Component{
    render(){
    const {data} = this.props
        return (
            <span>{data.username}</span>
        )
    }
}
