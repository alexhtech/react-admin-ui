import React from 'react'
import EntityForm from '../../components/Entity/Form'
import {getEntity, getPrefix} from '../../../../react-admin-ui'
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
    constructor(props){
        super(props);
        this.entity = getEntity(props.params.name) 
    }
    handleDelete = async () => {
        if(this.entity.actions.del && (typeof this.entity.actions.del.url == 'function')){
            await fetchData(this.entity.actions.del.url(this.props.params), 'DELETE')
        }
        this.props.actions.goto(`/${getPrefix()}/${this.props.params.name}`)
    }
    getInitialValues = (formFields = this.entity.actions.edit.formFields, data = this.props.fetchData[`${this.entity.name}Edit`].response) =>{
        let values = {}
        for(let i in formFields){
            if(formFields.hasOwnProperty(i)){
                let {name} = formFields[i]
                values[name] = showField(name, data)
            }
        }
        return values
    }


    handleSubmit = async (form) =>{
        const {actions:{edit:{wrapper, params = {}, url}}} = this.entity
        let _params = wrapper ? Object.assign(params, {[wrapper]: form}): Object.assign(form, params)
        const {result} = this.entity.actions.create
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


    handleSubmitSuccess = () =>{
        this.props.actions.goto(`/${getPrefix()}/${this.props.params.name}`)
    }
    
    render(){
        const {
            entity: {
                actions:{
                    edit:{form, fields, component: Component, onSubmitSuccess}
                }
            }
        } = this
        return(
            <div className='block'>
                {Component ?
                    <Component form={form} onSubmit={this.handleSubmit} initialValues={this.getInitialValues()}/>:
                    <EntityForm form={form} fields={fields} onSubmit={this.handleSubmit} onSubmitSuccess={onSubmitSuccess||this.handleSubmitSuccess} initialValues={this.getInitialValues()} onDelete={this.handleDelete} entity={this.entity}/>
                }
            </div>
        )
    }
}
