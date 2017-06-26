import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-isomorphic-tools'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Edit from 'material-ui/svg-icons/image/edit'
import Pagination from '../../Pagination'
import {getWidgets, getPrefix} from '../../../utils'
import RelationsHeader from './RelationsHeader'
import RelationsBody from './RelationsBody'

const style = {
    float: 'right'
}

@Pagination
export default class List extends React.Component {
    static propTypes = {
        entity: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        url: PropTypes.string.isRequired
    }

    render() {
        const {
            entity:{
                actions:{
                    list: {
                        fields,
                        hasMany
                    },
                    create,
                    edit,
                    show
                },
                name,
                id = 'id'
            },
            items,
            query
        } = this.props


        return items.size > 0 ?
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        {fields.map((field, key)=>
                            <TableHeaderColumn style={field.style} key={key}>
                                {field.title || field.name || field.label}
                            </TableHeaderColumn>
                        )}

                        <RelationsHeader hasMany={hasMany}/>

                        {create &&
                        <TableHeaderColumn>
                            <Link to={{pathname: `${getPrefix()}/${name}/create`, query}}>
                                <FloatingActionButton mini={true} style={style}>
                                    <ContentAdd />
                                </FloatingActionButton>
                            </Link>
                        </TableHeaderColumn>
                        }
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
                                            {field.component ?
                                                <field.component data={item.getIn([field.name.split('.')])}/> :
                                                item.getIn([field.name.split('.')])
                                            }
                                        </TableRowColumn>
                                    )
                                })}

                                <RelationsBody entityName={name} item={item} hasMany={hasMany} id={id} query={query}/>

                                <TableRowColumn>
                                    <div style={style}>
                                        {edit && show &&
                                        <Link to={{
                                            pathname: `${getPrefix()}/${name}/edit/${item[id]}`,
                                            query
                                        }}>
                                            <Edit/>
                                        </Link>
                                        }
                                        {show &&
                                        <Link to={{
                                            pathname: `${getPrefix()}/${name}/show/${item[id]}`,
                                            query
                                        }}><ChevronRight/></Link>
                                        }
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table> :
            <p>No {name} have been found.</p>
    }
}
