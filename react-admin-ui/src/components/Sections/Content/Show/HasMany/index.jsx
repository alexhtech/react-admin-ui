import React from 'react'
import Actions from './Actions'

export default class HasMany extends React.Component {
    render() {
        const {hasMany, name, id} = this.props
        switch (typeof hasMany) {
            case 'object': {
                return hasMany.map((item, index)=><Actions name={item} key={index} params={{name, id}}/>)
            }
            case 'string': {
                return <Actions name={hasMany} params={{name, id}}/>
            }
            default:
                return null
        }
    }
}