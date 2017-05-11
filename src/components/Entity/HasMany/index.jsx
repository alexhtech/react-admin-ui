import React from 'react'
import Actions from './Actions'

export default class HasMany extends React.Component {
    render() {
        const {hasMany} = this.props
        return (
            <div>
                {(()=> {
                    if (typeof (hasMany) == 'object') {
                        return hasMany.map((item, index)=><Actions name={item} key={index}/>)
                    }
                    if (typeof (hasMany) == 'string') {
                        return <Actions name={hasMany}/>
                    }
                    return null
                })()}
            </div>
        )
    }
}