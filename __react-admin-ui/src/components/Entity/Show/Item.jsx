import React from 'react'
import {showField} from '../../../utils/utility'
import {Link} from 'react-router'
import {getPrefix} from '../../../utils'

const Item = ({item, data}) => {
    return (
        <div className={`entity-show--field col-${item.column || 12}`}>
            <div className='entity-show--field-label'>
                {item.title || item.name}
            </div>

            {(()=> {
                if (item.component)
                    return <item.component data={showField(item.name, data)} {...item}/>
                if (item.hasOne && showField(item.name, data))
                    return <Link
                        to={`/${getPrefix()}/${item.hasOne}/show/${showField(item.name, data)}`}>
                        id - {showField(item.name, data)} {item.hasOne}
                    </Link>

                if (item.hasMany && (showField(item.name, data).length <= 0))
                    return <ul className='entity-show--field--many-items'>
                        {
                            showField(item.name, data).map(({id}, index)=> {
                                return (
                                    <li key={index}><Link
                                        to={`/${getPrefix()}/${item.hasMany}/show/${id}`}>ID {id}</Link>
                                    </li>
                                )
                            })}
                    </ul>


                return showField(item.name, data)

            })()}

        </div>
    )
}

export default Item
