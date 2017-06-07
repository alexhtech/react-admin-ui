import React from 'react'
import {Field, FieldArray} from 'redux-form/immutable'
import {getFormFields} from '../../../utils'
import {showField} from '../../../utils/utility'
import Wrapper from './Wrapper'


export default ({fields})=>
    <Wrapper>
        {fields.map(({fieldType = 'field', ...item}, key)=> {
            let {component = 'material.TextField'} = item
            if (typeof (component) == 'string') {
                let widget = showField(component, getFormFields())
                if (widget) {
                    item = {...item, component: widget, id: `__${item.name}`}
                }
            }
            return (
                <div className={`entity-form--field col-${item.column || 12}`} key={key}>
                    <div className='label'>{item.title}</div>
                    {fieldType == 'field' &&
                    <div className='field'>
                        <Field {...item} id={`__${item.name}`}/>
                    </div>}
                    {fieldType == 'array' &&
                    <div className='field'><FieldArray {...item} id={`__${item.name}`}/></div>}
                </div>
            )
        })}
    </Wrapper>