import React from 'react'
import {showField} from '../../../utils/utility'
import {getWidgets} from '../../../utils'
import Wrapper from '../Form/Wrapper'
import Item from './Item'

const Fields = ({fields, data}) =>
    <Wrapper>
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
    </Wrapper>


export default Fields