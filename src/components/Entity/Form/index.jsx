import React from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form'
import * as widgets from '../../Widgets'
import {showField} from '../../../utils/utility'
import {RaisedButton} from 'material-ui'
import ActionButton from '../../Common/ActionButton'

@reduxForm()
export default class EntityForm extends React.Component{

    render(){
        const {handleSubmit, submitting, fields, entity:{actions:{del}}} = this.props
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
                <div className='controls'>
                    {del && <ActionButton component={RaisedButton} label='Delete' action={this.props.onDelete}/>}
                    <RaisedButton label='Save' type='submit' primary={true} disabled={submitting}/>
                </div>
            </form>
        )
    }
}