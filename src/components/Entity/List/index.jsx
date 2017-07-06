import React from 'react'
import Pagination from '../../Pagination'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Link from 'react-router/lib/Link'
import {showField} from '../../../utils/utility'
import {getWidgets, getPrefix, getEntity} from '../../../utils'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Edit from 'material-ui/svg-icons/image/edit'
import {withRouter} from 'react-router'
import Filters from './Filters'
import styled from 'styled-components'

const NoItems = styled.p`
    padding-left: 24px;
`

const style = {
    float: 'right'
}

@withRouter
@Pagination
export default class List extends React.Component {

    static defaultProps = {
        defaultStyle: {}
    }

    render() {
        let {
            items,
            entity: {name, actions: {list: {fields, hasMany, filters}, create, show, edit}, id = 'id'},
            defaultStyle
        } = this.props
        const {query} = this.props.location || defaultStyle

        return (
            <div>
                {filters && <Filters filters={filters}/>}
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            {fields.map((field, key)=> {
                                return (
                                    <TableHeaderColumn
                                        style={field.style || defaultStyle}
                                        key={key}
                                    >
                                        {field.title || field.name || field.label}
                                    </TableHeaderColumn>
                                )
                            })}

                            {(()=> {
                                if (typeof (hasMany) == 'object') {
                                    return hasMany.map((item, index)=> {
                                        const entity = getEntity(item)
                                        return <TableHeaderColumn
                                            key={index}>{entity.title || entity.name}</TableHeaderColumn>
                                    })
                                }
                                if (typeof (hasMany) == 'string') {
                                    const entity = getEntity(hasMany)
                                    return <TableHeaderColumn>{entity.title || entity.name}</TableHeaderColumn>
                                }
                            })()}


                            {create &&
                            <TableHeaderColumn>
                                <Link to={{pathname: `/${getPrefix()}/${name}/create`, query}}>
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
                                                {field.component ? <field.component
                                                    data={showField(field.name, item)}/> : showField(field.name, item)}

                                            </TableRowColumn>
                                        )
                                    })}
                                    {(()=> {
                                        if (typeof (hasMany) == 'object') {
                                            return hasMany.map((item, index)=> {
                                                const entity = getEntity(item)
                                                return <TableRowColumn key={index}>
                                                    <Link to={{
                                                        pathname: `/${getPrefix()}/${item}`,
                                                        query: {
                                                            ...query,
                                                            id: item[id],
                                                            name: this.props.params.name
                                                        }
                                                    }}>List of {entity.title || entity.name}</Link>
                                                </TableRowColumn>
                                            })
                                        }
                                        if (typeof (hasMany) == 'string') {
                                            const entity = getEntity(hasMany)
                                            return <TableRowColumn>
                                                <Link to={{
                                                    pathname: `/${getPrefix()}/${hasMany}`,
                                                    query: {
                                                        ...query,
                                                        id: item[id],
                                                        name: this.props.params.name
                                                    }
                                                }}>List of {entity.title || entity.name}</Link>
                                            </TableRowColumn>
                                        }
                                    })()}
                                    <TableRowColumn>
                                        <div style={style}>
                                            {edit && show &&
                                            <Link to={{
                                                    pathname: `/${getPrefix()}/${name}/edit/${item[id]}`,
                                                    query: {
                                                        name: query.name,
                                                        id: query.id
                                                    }
                                                }}>
                                                <Edit/>
                                            </Link>
                                            }
                                            {show &&
                                            <Link to={{
                                                pathname: `/${getPrefix()}/${name}/show/${item[id]}`,
                                                query: {
                                                    name: query.name,
                                                    id: query.id
                                                }
                                            }}><ChevronRight/></Link>
                                            }
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {items.length == 0 && <NoItems>No {name} have been found.</NoItems>}
            </div>
        )
    }
}
