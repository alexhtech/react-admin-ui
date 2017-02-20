import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity} from '../../../../react-admin-ui'
import {fetcher} from 'react-isomorphic-tools'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

@connect(null, (dispatch)=>({
    actions: bindActionCreators({push}, dispatch)
}))
export default class CreatePage extends React.Component {
    render() {
        const {
            actions:{
                create:{form, fields, component: Component, wrapper, url, params = {}, onSubmitSuccess, initialValues}
            }
        } = getEntity(this.props.params.name)
        const {name: entityName} = this.props.params
        const {push} = this.props.actions

        const handleSubmit = async(form) => {
            let _params = wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params)
            const {result} = getEntity(entityName).actions.create
            if (typeof (result) == 'function') {
                _params = result(_params)
            }
            try {
                return await fetcher(url(), {
                    params: _params,
                    method: 'POST'
                })
            }
            catch (e) {
                throw e
            }
        }

        const handleSubmitSuccess = () => {
            push(`/entity/${entityName}`)
        }

        return (
            <div className='block'>
                {Component ? <Component form={form} onSubmit={handleSubmit}/> :
                    <EntityForm
                        form={form} fields={fields} onSubmit={handleSubmit}
                        onSubmitSuccess={onSubmitSuccess || handleSubmitSuccess}
                        initialValues={initialValues} entity={getEntity(this.props.params.name)} label='Create'/>}
            </div>
        )
    }
}