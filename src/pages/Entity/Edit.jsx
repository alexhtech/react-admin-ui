import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity} from '../../../react-admin-ui'
import {fetchData} from 'react-security-fetcher'
import {goto} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showField} from '../../utils/utility'
import {preload} from 'react-isomorphic-render/redux'

@preload(({fetchData, dispatch, parameters, location})=>{
    const entity = getEntity(parameters.name)
    return dispatch(fetchData(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(parameters): `/${parameters.name}/${parameters.id}`, `${parameters.name}Edit`, 'GET', {params: location.query}))
})
@connect((state)=>({
    fetchData: state.fetchData,
}), (dispatch)=>({
    actions: bindActionCreators({goto}, dispatch)
}))
export default class EditPage extends React.Component{
    render(){
        const {name: entityName} = this.props.params
        const entity = getEntity(entityName)
        const {actions:{edit:{form, fields, formFields, component: Component, wrapper, url, params = {}, onSubmitSuccess}}} = entity
        const {goto} = this.props.actions
        const data = this.props.fetchData[`${entityName}Edit`].response

        const getInitialValues = () =>{
            let values = {}
            for(let i in formFields){
                if(formFields.hasOwnProperty(i)){
                    let {name} = formFields[i]
                    values[name] = showField(name, data)
                }
            }
            return values
        }

        const handleSubmit = async (form) =>{
            let _params = wrapper ? Object.assign(params, {[wrapper]: form}): Object.assign(form, params)
            const {result} = getEntity(entityName).actions.create
            if(typeof (result) == 'function'){
                _params = result(_params)
            }
            try{
                return await fetchData(url(this.props.params), 'PUT', {params: _params})
            }
            catch (e){
                throw e
            }
        }

        const handleSubmitSuccess = () =>{
            goto(`/entity/${entityName}`)
        }

        return(
            <div>
                {Component ?
                    <Component form={form} onSubmit={handleSubmit} initialValues={getInitialValues()}/>:
                    <EntityForm form={form} fields={fields} onSubmit={handleSubmit} onSubmitSuccess={onSubmitSuccess||handleSubmitSuccess} initialValues={getInitialValues()}/>
                }
            </div>
        )
    }
}
