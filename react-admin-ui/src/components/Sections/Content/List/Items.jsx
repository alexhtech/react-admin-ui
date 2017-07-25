import React from 'react'
import {Table, TableHeader, TableBody, TableRow, TableRowColumn} from 'material-ui'
import {getPrefix, getWidgets} from '../../../../lib'
import {showField} from '../../../../utils'
import Header from './Header'
import RelationsBody from './RelationsBody'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Edit from 'material-ui/svg-icons/image/edit'
import {Link} from 'react-isomorphic-tools'


export default class Items extends React.Component {
    render() {
        const {entity:{id = 'id', name, actions:{list:{fields, hasMany}, create, edit, show}}, query, items} = this.props
        const prefix = getPrefix(name) + '/' + name
        const widgets = getWidgets()
        return (
            <Table
                fixedHeader={true}
                fixedFooter={false}
                selectable={false}
                multiSelectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <Header fields={fields} hasMany={hasMany} create={create} query={query} prefix={prefix}/>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={false}
                    showRowHover={true}
                    stripedRows={false}
                >
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
                                                    data={showField(field.name, item)}/> : showField(field.name, item)
                                            }
                                        </TableRowColumn>
                                    )
                                })}

                                <RelationsBody entityName={name} item={item} hasMany={hasMany} id={id} query={query}/>

                                <TableRowColumn>
                                    <div style={{float: 'right'}}>
                                        {edit && show &&
                                        <Link to={{
                                            pathname: `${prefix}/${item[id]}/edit`,
                                            query: {...query, page: undefined}
                                        }}>
                                            <Edit/>
                                        </Link>
                                        }
                                        {show &&
                                        <Link to={{
                                            pathname: `${prefix}/${item[id]}`,
                                            query: {...query, page: undefined}
                                        }}><ChevronRight/></Link>
                                        }
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
}