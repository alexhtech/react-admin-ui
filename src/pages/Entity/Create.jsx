import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity, getPrefix} from '../../utils'
import {fetcher, fetchToState} from 'react-isomorphic-tools'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {SubmissionError} from 'redux-form/immutable'
import {list} from '../../actions'
import {open} from '../../actions/Snackbar'
import Immutable from 'immutable'
import {validate} from '../../validate'

@connect(null, {push, open, fetchToState})
export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.entity = getEntity(props.params.name)
        this.handleSubmitSuccessAfterHook = this.entity.actions.edit.onSubmitSuccessAfterHook
        this.handleSubmitSuccessBeforeHook = this.entity.actions.edit.onSubmitSuccessBeforeHook
    }


    async handleSubmitSuccess(result, dispatch, props) {
        try {
            let {redirect = 'list'} = this.entity.actions.create
            const {id = 'id'} = this.entity
            if (this.handleSubmitSuccessBeforeHook) await this.handleSubmitSuccessBeforeHook(result, dispatch, props)
            const {fetchToState, params, location, push, open} = this.props
            open('default', 'Successfully created')
            await list({fetchToState, params, location})
            if (!result[id]) redirect = 'list'
            switch (redirect) {
                case 'list':
                    push(`/${getPrefix()}/${this.props.params.name}`)
                    break
                case 'show':
                    push(`/${getPrefix()}/${this.props.params.name}/show/${result[id]}`)
                    break
                case 'edit':
                    push(`/${getPrefix()}/${this.props.params.name}/edit/${result[id]}`)
                    break
                case 'create':
                    push(`/${getPrefix()}/${this.props.params.name}/create`)
                    break
            }
            push(`/${getPrefix()}/${this.props.params.name}`)
            if (this.handleSubmitSuccessAfterHook) await this.handleSubmitSuccessAfterHook(result, dispatch, props)
        }
        catch (e) {
            const error = e && e.error && e.error.message || 'Error creation'
            this.props.open('default', error)
            throw new SubmissionError({error})
        }
    }


    handleSubmit = (form) => {
        const {wrapper, url, params = {}, result} = this.entity.actions.create
        let _params = Immutable.fromJS(wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params))
        if (typeof (result) == 'function') {
            _params = result(_params)
        }
        return fetcher(typeof (url) == 'function' ? url(this.props.params, this.props.location.query) : this.entity.url, {
            params: _params,
            method: 'POST'
        })
    }

    handleSubmitFail = (props, dispatch, e) => {
        const error = e && e.error && e.error.message || 'Error creation'
        this.props.open('default', error)
        throw new SubmissionError({error})
    }

    render() {
        const {
            entity:{
                actions:{
                    create:{
                        form = this.props.params.name,
                        fields,
                        component: Component,
                        onSubmitSuccess,
                        initialValues,
                        fieldsValidate,
                        onSubmitFail
                    }
                }
            }
        } = this
        return (
            <div className='block'>
                {Component ?
                    <Component form={form} onSubmit={this.handleSubmit}
                               onSubmitSuccess={onSubmitSuccess || ::this.handleSubmitSuccess}
                               initialValues={initialValues || {}} entity={this.entity}/> :
                    <EntityForm
                        form={form}
                        fields={fields}
                        onSubmit={this.handleSubmit}
                        onSubmitSuccess={onSubmitSuccess || ::this.handleSubmitSuccess}
                        onSubmitFail={onSubmitFail || this.handleSubmitFail}
                        initialValues={initialValues || {}}
                        entity={this.entity}
                        label='Create'
                        fieldsValidate={fieldsValidate}
                        validate={validate}
                    />
                }
            </div>
        )
    }
}
