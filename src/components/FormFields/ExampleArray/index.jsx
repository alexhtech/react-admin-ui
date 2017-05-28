import React from 'react'
import {Field} from 'redux-form/immutable'
import Item from './Item'
import {Map} from 'immutable'

export default class Tickets extends React.Component {
    render(){
        const {fields} = this.props
        return (
            <ul>
                {fields.map((item, key)=>{
                    return (
                        <li key={key}>
                            <Field component={Item} name={item} />
                            <button type='button' onClick={() => fields.remove(key)}>del</button>
                        </li>
                    )
                })}
                <button type='button' onClick={() => fields.push(Map({
                        title: '',
                        date: ''
                    }))}>add</button>
            </ul>
        )
    }
}
