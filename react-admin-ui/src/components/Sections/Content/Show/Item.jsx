import React from 'react'
import {showField} from '../../../../utils'
import {getPrefix} from '../../../../lib'
import {Link} from 'react-isomorphic-tools'

const Item = ({item, data}) => {
    const prefix = getPrefix()

    if (item.component)
        return <item.component data={showField(item.name, data)} {...item}/>

    if (item.hasOne && showField(item.name, data))
        return <Link
            to={{pathname:`${prefix}/${item.hasOne}/${showField(item.name, data)}`}}>
            id - {showField(item.name, data)} {item.hasOne}
        </Link>
    if (item.hasMany && (showField(item.name, data).length <= 0))
        return <ul>
            {
                showField(item.name, data).map(({id}, index)=> {
                    return (
                        <li key={index}><Link
                            to={{pathname:`${prefix}/${item.hasMany}/${id}`}}>ID {id}</Link>
                        </li>
                    )
                })}
        </ul>
    return <div>{showField(item.name, data)}</div>
}

export default Item
