import React from "react"
import {preload} from "react-isomorphic-tools"
import {connect} from "react-redux"
import List from "../../components/Entity/List"
import {getEntity} from "../.."
import {list} from '../../actions'

@preload(list)
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