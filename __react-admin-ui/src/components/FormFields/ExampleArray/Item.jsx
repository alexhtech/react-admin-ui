import React from 'react'
import {Field} from 'redux-form/immutable'
import {TextField} from 'redux-form-material-ui'
export default class ExampleItem extends React.Component{
    render(){
        const {input: {name}} = this.props
        return (
            <div>
                <div>
                    <Field component={TextField} name={`${name}.title`} />
                </div>
                <div>
                    <Field component={TextField} name={`${name}.date`} />
                </div>
            </div>
        )
    }
}
