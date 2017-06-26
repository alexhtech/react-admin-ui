import React from 'react'
import {Field, FieldArray} from 'redux-form/immutable'
import {getFormFields} from '../../../utils'
import {showField} from '../../../utils/utility'
import Wrapper from './Wrapper'
import styled from 'styled-components'

const Label = styled.div`
    display: inline-block;
    margin-bottom: 15px;
`

export default ({fields})=>
    <Wrapper className='row'>
        {fields.map(({fieldType = 'field', column = 12, ...item}, key)=> {
            let {component = 'material.TextField'} = item
            if (typeof (component) == 'string') {
                let widget = showField(component, getFormFields())
                if (widget) {
                    item = {...item, component: widget, id: `__${item.name}`}
                }
            }
            return (
                <div className={`entity-form--field col-${column}`} key={key}>
                    <Label>{item.title}</Label>
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
