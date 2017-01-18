import React from 'react'
import {preload} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'
import List from '../../components/Entity/List'
import {getEntity} from '../../../react-admin-ui'

@preload(({fetchData, dispatch, parameters, location})=>{
        const {url, actions:{ list: {url: listUrl, params}}} = getEntity(parameters.name)
        return dispatch(fetchData(listUrl||url, `${parameters.name}List`, 'GET', {params: Object.assign(location.query, params)}))
})
@connect((state)=>({
    fetchData: state.fetchData,
}))
export default class ListPage extends React.Component{
    render(){
        const {name: entityName} = this.props.params
        const entity = getEntity(entityName)
        const data = this.props.fetchData[`${entityName}List`]
        return (
            <List data={data} entity={entity}/>
        )
    }
}