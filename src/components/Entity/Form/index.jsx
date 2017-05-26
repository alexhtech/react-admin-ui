import React from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form/immutable'
import {getFormFields, getPrefix} from '../../../utils'
import {showField} from '../../../utils/utility'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import ActionButton from '../../Common/ActionButton'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import withRouter from 'react-router/lib/withRouter'
import Link from 'react-router/lib/Link'

const validate = (values, {fieldsValidate}) => {
    let errors = {}

    fieldsValidate && fieldsValidate.map(field => {
        const { isRequired = false, test = false, errorText } = field
        const initValidate = value => {
            if (isRequired) {
                if (!value) {
                    return errorText.isRequired
                }
            }

            if (test && test(value)) {
                return errorText.test
            }

        }

        errors[field.name] = initValidate(values.get(field.name))

    })

    return errors
}

@withRouter
@connect(state=>({
    'confirmDelete': state.getIn(['modals', 'confirmDelete']) || false
}), {openModal, closeModal})
@reduxForm({validate})
export default class EntityForm extends React.Component {

    static defaultProps = {
        del: false,
        label: 'Save'
    }

    render() {
        const {handleSubmit, submitting, fields, entity:{actions:{del}}} = this.props
        return (
            <form onSubmit={handleSubmit} className='entity-form'>
                <div className='row'>
                    {fields.map(({type = 'field', ...item}, key)=> {
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
                                {type == 'field' &&
                                <div className='field'>
                                    <Field {...item} id={`__${item.name}`}/>
                                </div>}
                                {type == 'array' &&
                                <div className='field'><FieldArray {...item} id={`__${item.name}`} key={key}/></div>}
                            </div>
                        )
                    })}
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div className='controls'>
                            {this.props.del && del && <span>

                                <RaisedButton label='Delete' onClick={()=>this.props.openModal('confirmDelete')}/>
                                <Dialog open={this.props.confirmDelete} actions={
                                    <div className='controls'>
                                        <RaisedButton label='Cancel' onClick={()=>this.props.closeModal('confirmDelete')}/>
                                        <ActionButton component={RaisedButton} label='Delete' action={this.props.onDelete}
                                                      primary={true}/>
                                    </div>}>Are you sure to delete?</Dialog>


                            </span>}
                            {this.props.params.id && <RaisedButton label='Show' type='submit' primary={false} containerElement={
                                <Link to={{
                                    pathname: `/${getPrefix()}/${this.props.params.name}/show/${this.props.params.id}`,
                                    query: this.props.location.query
                                }}
                                />}/>}
                            <RaisedButton label={this.props.label} type='submit' primary={true} disabled={submitting}/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
