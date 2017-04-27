import React from 'react'
import {Field} from 'redux-form'
import Location from '../Location'
import './style.sass'

export default class Locations extends React.Component{
    render(){
        const {fields} = this.props
        return (
            <ul className='form-field--locations'>
                {fields.map((item, key)=>(
                    <li key={key}>
                        <i className='fa fa-map-marker' aria-hidden='true'/>
                        <Field component={Location} name={item} _key={key}/>
                        <i className='fa fa-times' aria-hidden='true' onClick={() => fields.remove(key)} />
                    </li>
                ))}
                <i className='fa fa-plus' aria-hidden='true' onClick={() => fields.push({})}/>
            </ul>
        )
    }
}