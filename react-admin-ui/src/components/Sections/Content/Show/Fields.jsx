import React from 'react'
import {showField} from '../../../../utils'
import {getWidgets} from '../../../../lib'
import Item from './Item'
import {ItemWrapper, StyledLabel, ContentWrapper} from '../..'

const Fields = ({fields, data}) => {
    return <ContentWrapper>
        <div className='row'>
            {fields.map(({column = '12', ...item}, key)=> {
                let {component} = item
                if (typeof (component) == 'string') {
                    let widget = showField(component, getWidgets())
                    if (widget) {
                        item = {...item, component: widget, id: `__${item.name}`}
                    }
                }
                return (
                    <div className={`col-${column}`} key={key}>
                        <StyledLabel>
                            {item.title || item.name}
                        </StyledLabel>
                        <ItemWrapper>
                            <Item key={key} item={item} data={data}/>
                        </ItemWrapper>
                    </div>
                )
            })}
        </div>
    </ContentWrapper>
}


export default Fields