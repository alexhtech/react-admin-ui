import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity, getPrefix} from '../../utils'
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
        this.handleSubmitSuccessAfterHook = this.entity.actions.edit.onSubmitSuccessAfterHook
        this.handleSubmitSuccessBeforeHook = this.entity.actions.edit.onSubmitSuccessBeforeHook
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

    getInitialValues = (initFields = this.entity.actions.edit.initFields, data = this.props.item) => {
        let values = {}
        for (let i in initFields) {
            if (initFields.hasOwnProperty(i)) {
                let name = initFields[i]
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

        return fetcher(typeof (url) == 'function' ? url(this.props.params, this.props.location.query): `${this.entity.url}/${this.props.params.id}`, {
            params: _params,
            method: 'PUT'
        })
    }


    async handleSubmitSuccess(result, dispatch, props) {
        let {redirect = 'list'} = this.entity.actions.create
        if (this.handleSubmitSuccessBeforeHook) await this.handleSubmitSuccessBeforeHook(result, dispatch, props)
        this.props.open('default', 'Successfully saved')
        const {fetchToState, location, params, push} = this.props
        await edit({fetchToState, location, params})
        await list({fetchToState, location, params})
        if(!result.id) redirect = 'list'
        switch (redirect) {
            case 'list':
                push(`/${getPrefix()}/${this.props.params.name}`)
                break
            case 'show':
                push(`/${getPrefix()}/${this.props.params.name}/show/${result.id}`)
                break
            case 'edit':
                push(`/${getPrefix()}/${this.props.params.name}/edit/${result.id}`)
                break
        }
        if (this.handleSubmitSuccessAfterHook) await this.handleSubmitSuccessAfterHook(result, dispatch, props)
    }

    handleSubmitFail = () => {
        this.props.open('default', 'Error saving')
    }

    render() {
        const {
            entity: {
                actions:{
                    edit:{form = this.props.params.name, fields, component: Component}
                }
            }
        } = this
        return (
            <div className='block'>
                {Component ?
                    <Component form={form} onSubmit={this.handleSubmit}
                               onSubmitSuccess={::this.handleSubmitSuccess}
                               onSubmitFail={this.handleSubmitFail}
                               initialValues={this.getInitialValues()}
                               entity={this.entity} del={true}
                    /> :
                    <EntityForm form={form} fields={fields} onSubmit={this.handleSubmit}
                                onSubmitSuccess={::this.handleSubmitSuccess}
                                onSubmitFail={this.handleSubmitFail}
                                initialValues={this.getInitialValues()} onDelete={::this.handleDelete}
                                entity={this.entity} del={true}/>
                }
            </div>
        )
    }
}
