import React from "react"
import {showField} from "../../../utils/utility"
import * as widgets from "../../Widgets"
import ActionButton from "../../Common/ActionButton"
import RaisedButton from "material-ui/RaisedButton"
import {Link} from 'react-router'
import Children from '../Children'
import {getPrefix} from '../../..'
import withRouter from 'react-router/lib/withRouter'

@withRouter
export default class Show extends React.Component {
    render() {
        const {
            data, entity:{
            actions:{
                show:{fields, children},
                edit,
                del
            }
        },
            location:{
                query
            },
            params:{
                name, id
            }
        } = this.props
        return (
            <div className="entity-show--fields">
                {fields.map((item, key)=> {
                    let {component} = item
                    if (typeof (component) == "string") {
                        let widget = showField(component, widgets)
                        if (widget) {
                            item = {...item, component: widget, id: `__${item.name}`}
                        }
                    }
                    return (
                        <div key={key} className="entity-show--field">
                            <div className="entity-show--field-label">
                                {item.title || item.name}
                            </div>
                            {item.component ?
                                <item.component data={showField(item.name, data)}/> : showField(item.name, data)}
                            <Children children={children}/>
                            <div className="controls">
                                {del && <ActionButton component={RaisedButton} label="Delete" action={this.props.onDelete}/>}
                                {edit && <RaisedButton label="Edit" type="submit" primary={true}
                                                       containerElement={<Link
                                                           to={{pathname: `/${getPrefix()}/${name}/edit/${id}`, query}}/>}/>}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}