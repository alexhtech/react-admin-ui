import React from 'react'
import {preload} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'
import {getEntity} from '../../../../react-admin-ui'
import Show from '../../components/Entity/Show'


@preload(({fetchData, dispatch, parameters, location})=>{
    const entity = getEntity(parameters.name)
    return dispatch(fetchData(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(parameters): `/${parameters.name}/${parameters.id}`, `${parameters.name}Show`, 'GET', {params: location.query}))
})
@connect((state)=>({
    fetchData: state.fetchData,
}))
export default class ShowPage extends React.Component{
    render(){
        const {name: entityName} = this.props.params
        const entity = getEntity(entityName)
        const data = this.props.fetchData[`${entityName}Show`].response
        return (
            <div className='block'>
                <Show data={data} entity={entity}/>
            </div>
        )
    }
}