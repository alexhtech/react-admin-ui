import React from "react"
import RaisedButton from "material-ui/RaisedButton"
import Link from "react-router/lib/Link"
import withRouter from "react-router/lib/withRouter"
import {getPrefix} from "../../.."

@withRouter
export default class Actions extends React.Component {
    render() {
        const {actions:{create, list}, name, label} = this.props
        return (
            <div>
                <p>{label}</p>
                {create && <RaisedButton containerElement={<Link to={{
                    pathname:`/${getPrefix()}/${name}/create`,
                    query: this.props.params
                }} />} label="Create"/>}
                {list && <RaisedButton containerElement={<Link to={{
                    pathname:`/${getPrefix()}/${name}`,
                    query: this.props.params
                }} />} label="List"/>}
            </div>
        )
    }
}