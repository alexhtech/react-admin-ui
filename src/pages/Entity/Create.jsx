import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity} from '../../../react-admin-ui'
import {fetchData} from 'react-security-fetcher'
import {goto} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
@connect(()=>({

}), (dispatch)=>({
    actions: bindActionCreators({goto}, dispatch)
}))
export default class CreatePage extends React.Component{
    render(){
        const {actions:{create:{form, fields, component: Component, wrapper, url, params = {}, onSubmitSuccess, initialValues}}} = getEntity(this.props.params.name)
        const {name: entityName} = this.props.params
        const {goto} = this.props.actions

        const handleSubmit = async (form) =>{
            let _params = wrapper ? Object.assign(params, {[wrapper]: form}): Object.assign(form, params)
            const {result} = getEntity(entityName).actions.create
            if(typeof (result) == 'function'){
               _params = result(_params) 
            }
            try{
                return await fetchData(url(), 'POST', {params: _params})
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
                {Component ? <Component form={form} onSubmit={handleSubmit}/>: <EntityForm form={form} fields={fields} onSubmit={handleSubmit} onSubmitSuccess={onSubmitSuccess||handleSubmitSuccess} initialValues={initialValues}/>}
            </div>
        )
    }
}