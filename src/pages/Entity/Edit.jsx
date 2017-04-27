import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity, getPrefix} from 'react-admin-ui'
import {connect} from 'react-redux'
import {showField} from '../../utils/utility'
import {preload, fetcher, fetchToState, closeModal} from 'react-isomorphic-tools'
import {push} from 'react-router-redux'
import {open} from '../../actions/Snackbar'
import {edit, list} from '../../actions'
import Immutable from 'immutable'

@preload(edit)
@connect((state, props)=>({
    item: state.getIn(['fetchData', `${props.params.name}Edit`, 'response']).toJS(),
}), {push, open, fetchToState, closeModal})
export default class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.entity = getEntity(props.params.name)
    }

    static displayName = 'AdminEditPage'

    async handleDelete() {
        try {
            const {fetchToState, params, location, push, open, closeModal} = this.props
            await fetcher(this.entity.actions.del.url(this.props.params, this.props.location.query), {
                method: 'DELETE'
            })
            closeModal('confirmDelete')
            open('default', 'Successfully deleted')
            await list({fetchToState, params, location})
            push(`/${getPrefix()}/${this.props.params.name}`)
        }
        catch (e) {
            this.props.open('default', 'Error deleting')
        }
    }

    getInitialValues = (formFields = this.entity.actions.edit.formFields, data = this.props.item) => {
        let values = {}
        for (let i in formFields) {
            if (formFields.hasOwnProperty(i)) {
                let {name} = formFields[i]
                const deepName = name.split('.')
                values[deepName[deepName.length - 1]] = showField(name, data)
            }
        }
        return values
    }


    handleSubmit = (form) => {
        const {actions:{edit:{wrapper, params = {}, url}}} = this.entity
        let _params = Immutable.fromJS(wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params))
        const {result} = this.entity.actions.edit
        if (typeof (result) == 'function') {
            _params = result(_params)
        }

        return fetcher(url(this.props.params, this.props.location.query), {
            params: _params,
            method: 'PUT'
        })
    }


    async handleSubmitSuccess() {
        this.props.open('default', 'Successfully saved')
        const {fetchToState, location, params} = this.props
        await edit({fetchToState, location, params})
        await list({fetchToState, location, params})
        if (this.entity.goToListAfterSave) this.props.push(`/${getPrefix()}/${this.props.params.name}`)
    }

    handleSubmitFail = () => {
        this.props.open('default', 'Error saving')
    }

    render() {
        const {
            entity: {
                actions:{
                    edit:{form, fields, component: Component, onSubmitSuccess}
                }
            }
        } = this
        return (
            <div className='block'>
                {Component ?
                    <Component form={form} onSubmit={this.handleSubmit}
                               onSubmitError={this.handleSubmitFail}
                               initialValues={this.getInitialValues()}/> :
                    <EntityForm form={form} fields={fields} onSubmit={this.handleSubmit}
                                onSubmitSuccess={onSubmitSuccess || ::this.handleSubmitSuccess}
                                onSubmitFail={this.handleSubmitFail}
                                initialValues={this.getInitialValues()} onDelete={::this.handleDelete}
                                entity={this.entity} del={true}/>
                }
            </div>
        )
    }
}
