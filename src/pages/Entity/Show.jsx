import React from "react"
import {preload, fetcher} from "react-isomorphic-tools"
import {connect} from "react-redux"
import {getEntity, getPrefix} from "../.."
import Show from "../../components/Entity/Show"


@preload(({fetchToState, params, location})=> {
    const entity = getEntity(params.name)
    return fetchToState(typeof (entity.actions.show.url) == "function" ? entity.actions.show.url(params) : `/${params.name}/${params.id}`, {
        params: {...location.query.params},
        key: `${params.name}Show`
    })
})
@connect((state, props)=>({
    item: state.getIn(["fetchData", `${props.params.name}Show`, "response"]),
}))
export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        this.entity = getEntity(props.params.name)
    }

    async handleDelete() {
        try {
            await fetcher(this.entity.actions.del.url(this.props.params, this.props.location.query), {
                method: "DELETE"
            })
            this.props.open("default", "Successfully deleted")
            this.props.push(`/${getPrefix()}/${this.props.params.name}`)
        }
        catch (e) {
            this.props.open("default", "Error deleting")
        }
    }

    render() {
        return (
            <div className="block">
                <Show data={this.props.item.toJS()} entity={this.entity} onDelete={::this.handleDelete}/>
            </div>
        )
    }
}