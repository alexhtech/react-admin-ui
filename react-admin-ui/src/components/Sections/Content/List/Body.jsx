import React from 'react'
import {showField} from '../../../../utils'

export default class Body extends React.Component {
    render() {
        const {entity:{name, id = 'id', actions:{edit, show, list:{fields, hasMany}}}, prefix, query, widgets, items} = this.props
        return (
            <div>
                {items.map((item, key)=> {
                    return (
                        <TableRow key={key} hoverable={true}>
                            {fields.map((field, key)=> {
                                let {component} = field
                                if (typeof (component) == 'string') {
                                    let widget = showField(component, widgets)
                                    if (widget) {
                                        field = {...field, component: widget, id: `__${item.name}`}
                                    }
                                }
                                return (
                                    <TableRowColumn style={field.style || {}} key={key}>
                                        {field.component ?
                                            <field.component
                                                data={showField(field.name, widgets)}/> : showField(field.name, widgets)
                                        }
                                    </TableRowColumn>
                                )
                            })}

                            <RelationsBody entityName={name} item={item} hasMany={hasMany} id={id} query={query}/>

                            <TableRowColumn>
                                <div style={{float: 'right'}}>
                                    {edit && show &&
                                    <Link to={{
                                        pathname: `${prefix}/edit/${item[id]}`,
                                        query
                                    }}>
                                        <Edit/>
                                    </Link>
                                    }
                                    {show &&
                                    <Link to={{
                                        pathname: `${prefix}/show/${item[id]}`,
                                        query
                                    }}><ChevronRight/></Link>
                                    }
                                </div>
                            </TableRowColumn>
                        </TableRow>
                    )
                })}
            </div>
        )
    }
}