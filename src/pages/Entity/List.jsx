import React from "react"
import {preload} from "react-isomorphic-tools"
import {connect} from "react-redux"
import List from "../../components/Entity/List"
import {getEntity} from "../.."

@preload(({fetchToState, params, location})=>{
        const {url, actions:{ list: {url: listUrl, params: listParams}}} = getEntity(params.name)
        return fetchToState(listUrl||url, {
            params: Object.assign({...location.query}, listParams)
            ,
            key: `${params.name}List`
        })
})
@connect((state, props)=>({
    list: state.getIn(["fetchData", `${props.params.name}List`])
}))
export default class ListPage extends React.Component{
    static displayName = "AdminListPage"
    render(){
        return (
            <div className="block">
                <List data={this.props.list.toJS()} entity={getEntity(this.props.params.name)}/>
            </div>
        )
    }
}