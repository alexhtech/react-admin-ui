import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity, getPrefix} from '../../../../react-admin-ui'
import {connect} from 'react-redux'
import {showField} from '../../utils/utility'
import {preload, fetcher} from 'react-isomorphic-tools'
import {push} from 'react-router-redux'
import {open} from '../../actions/Snackbar'

@preload(({fetchToState, params, location})=> {
    const entity = getEntity(params.name)
    return fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params) : `/${params.name}/${params.id}`, {
        params: {...location.query},
        key: `${params.name}Edit`
    })
})
@connect((state, props)=>({
    item: state.getIn(['fetchData', `${props.params.name}Edit`, 'response']).toJS(),
}), {push, open})
export default class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.entity = getEntity(props.params.name)
    }

    static displayName = 'AdminEditPage'

    async handleDelete() {
        try {
            await fetcher(this.entity.actions.del.url(this.props.params), {
                method: 'DELETE'
            })
            this.props.open('default', 'Successfully deleted')
            this.props.push(`/${getPrefix()}/${this.props.params.name}`)
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
                values[name] = showField(name, data)
            }
        }
        return values
    }


    handleSubmit = (form) => {
        const {actions:{edit:{wrapper, params = {}, url}}} = this.entity
        let _params = wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params)
        const {result} = this.entity.actions.create
        if (typeof (result) == 'function') {
            _params = result(_params)
        }

        return fetcher(url(this.props.params), {
            params: _params,
            method: 'PUT'
        })
    }


    handleSubmitSuccess = () => {
        this.props.open('default', 'Successfully saved')
        this.props.push(`/${getPrefix()}/${this.props.params.name}`)
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
                                onSubmitSuccess={onSubmitSuccess || this.handleSubmitSuccess}
                                onSubmitFail={this.handleSubmitFail}
                                initialValues={this.getInitialValues()} onDelete={::this.handleDelete}
                                entity={this.entity} del={true}/>
                }
            </div>
        )
    }
}
