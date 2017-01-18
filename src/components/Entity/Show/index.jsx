import React from 'react'
import {showField} from '../../../utils/utility'
import * as widgets from '../../Widgets'

export default class Show extends React.Component{
    render(){
        const {data, entity:{actions:{show:{fields}}}} = this.props
        return(
            <div className='entity-show--fields'>
                {fields.map((item, key)=>{
                    let {component} = item
                    if(typeof (component) == 'string'){
                        let widget = showField(component, widgets)
                        if(widget){
                            item = {...item, component: widget, id:`__${item.name}`}
                        }
                    }
                    return (
                        <div key={key} className='entity-show--field'>
                            <div className='entity-show--field-label'>
                                {item.title||item.name}
                            </div>
                            {item.component ? <item.component data={showField(item.name, data)}/>: showField(item.name, data)}
                        </div>
                    )
                })}
            </div>
        )
    }
}