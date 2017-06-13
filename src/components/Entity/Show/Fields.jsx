import React from 'react'
import {showField} from '../../../utils/utility'
import {getWidgets} from '../../../utils'
import Item from './Item'

const Fields = ({fields, data}) =>
    <div className='row'>
        {fields.map((item, key)=> {
            let {component} = item
            if (typeof (component) == 'string') {
                let widget = showField(component, getWidgets())
                if (widget) {
                    item = {...item, component: widget, id: `__${item.name}`}
                }
            }
            return (
                <Item
                    key={key}
                    item={item}
                    data={data}
                />
            )
        })}
    </div>


export default Fields