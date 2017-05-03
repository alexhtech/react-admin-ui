import React from 'react'
import Pagination from '../../Pagination'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {Link} from 'react-router'
import {showField} from '../../../utils/utility'
import {getWidgets} from '../../..'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Edit from 'material-ui/svg-icons/image/edit'
import Children from '../Children'

@Pagination()
export default class List extends React.Component {
    render() {
        let {data: {response}, entity: {actions: {list: {fields, children}, create, show, edit}}, location: {pathname, query}} = this.props
        const items = response.items || response.Items
        const style = {
            float: 'right'
        }

        fields = fields.push(...Object.keys(children).map((item)=> {
            item.isChild = true
            return item
        }))

        return (
            <div>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            {fields.map((field, key)=> {
                                return (
                                    <TableHeaderColumn style={field.style || {}}
                                                       key={key}>{field.title || field.name || field.label}</TableHeaderColumn>
                                )
                            })}
                            {create ?
                                <TableHeaderColumn><Link
                                    to={{pathname: `${pathname}/create`, query}}><FloatingActionButton mini={true}
                                                                                                       style={style}><ContentAdd /></FloatingActionButton></Link></TableHeaderColumn> : null}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {items.map((item, key)=> {
                            return (
                                <TableRow key={key} hoverable={true}>
                                    {fields.map((field, key)=> {
                                        let {component} = field
                                        if (typeof (component) == 'string') {
                                            let widget = showField(component, getWidgets())
                                            if (widget) {
                                                field = {...field, component: widget, id: `__${item.name}`}
                                            }
                                        }
                                        return (
                                            <TableRowColumn style={field.style || {}} key={key}>
                                                {!field.isChild && (field.component ? <field.component
                                                    data={showField(field.name, item)}/> : showField(field.name, item))}
                                                {field.isChild && <Children children={field}/>}
                                            </TableRowColumn>
                                        )
                                    })}
                                    <TableRowColumn>
                                        <div style={{float: 'right'}}>
                                            {edit ? <Link to={{pathname: `${pathname}/edit/${item.id}`, query}}><Edit/></Link> : null}
                                            {show ?
                                                <Link to={{
                                                    pathname: `${pathname}/show/${item.id}`,
                                                    query
                                                }}><ChevronRight/></Link> : null}
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}