import React from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form'
import * as widgets from '../../Widgets'
import {showField} from '../../../utils/utility'

@reduxForm()
export default class EntityForm extends React.Component{
    render(){
        const {handleSubmit, submitting, fields} = this.props
        return(
            <form onSubmit={handleSubmit} className='entity-form'>
                {fields.map(({type = 'field', ...item}, key)=>{
                    let {component} = item
                    if(typeof (component) == 'string'){
                        let widget = showField(`formFields.${component}`, widgets)
                        if(widget){
                            item = {...item, component: widget, id:`__${item.name}`}
                        }
                    }
                    return(
                        <div className='entity-form--field' key={key}>
                            {item.label!='hide' && <div className='label'>{item.title||item.name}</div>}
                            {type == 'field' && <div className='field'><Field {...item} id={`__${item.name}`} key={key}/></div>}
                            {type == 'array' && <div className='field'><FieldArray {...item} id={`__${item.name}`} key={key}/></div>}
                        </div>
                    )
                })}
                <button type='submit' disabled={submitting}>save</button>
            </form>
        )
    }
}