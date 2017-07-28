import React from 'react'
import {Field, FieldArray} from 'redux-form'
import {getFormFields} from '../../../../lib'
import {showField} from '../../../../utils'

import {ItemWrapper, StyledLabel, ContentWrapper} from '../..'

export default ({fields})=>
    <ContentWrapper>
        <div className='row'>
            {fields.map(({fieldType = 'field', column = 12, style = {width: '100%'}, ...item}, key)=> {
                let {component = 'material.TextField'} = item
                if (typeof (component) == 'string') {
                    let widget = showField(component, getFormFields())
                    if (widget) {
                        item = {...item, component: widget, id: `__${item.name}`}
                    }
                }
                return (
                    <div className={`col-${column}`} key={key}>
                        <StyledLabel>{item.title}</StyledLabel>
                        {fieldType == 'field' &&
                        <ItemWrapper>
                            <Field {...item} id={`__${item.name}`} style={style}/>
                        </ItemWrapper>}
                        {fieldType == 'array' &&
                        <div>
                            <FieldArray {...item} id={`__${item.name}`} style={style}/>
                        </div>}
                    </div>
                )
            })}
        </div>
    </ContentWrapper>



