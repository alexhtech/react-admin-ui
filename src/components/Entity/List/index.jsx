import React from 'react'
import Pagination from '../../Pagination'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {Link} from 'react-router'
import {showField} from '../../../utils/utility'
import * as widgets from '../../Widgets'

@Pagination()
export default class List extends React.Component{
    render(){
        const {data: {response: {items}}, entity: {actions: {list: {fields}, create, show, edit}}, location: {pathname}} = this.props
        const style = {
            float: 'right'
        }
        return(
            <div>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            {fields.map((field, key)=>{
                                return (
                                    <TableHeaderColumn style={field.style||{}} key={key}>{field.title||field.name}</TableHeaderColumn>
                                )
                            })}
                            {create ? <TableHeaderColumn><Link to={`${pathname}/create`}><FloatingActionButton mini={true} style={style}><ContentAdd /></FloatingActionButton></Link></TableHeaderColumn>: null}
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {items.map((item, key)=>{
                            return (
                                <TableRow key={key} hoverable={true}>
                                    {fields.map((field, key)=>{
                                        let {component} = item
                                        if(typeof (component) == 'string'){
                                            let widget = showField(component, widgets)
                                            if(widget){
                                                item = {...item, component: widget, id:`__${item.name}`}
                                            }
                                        }
                                        return (
                                            <TableRowColumn style={field.style||{}} key={key}>
                                                {field.component ? <field.component data={showField(field.name, item)}/>: showField(field.name, item)}
                                            </TableRowColumn>
                                        )
                                    })}
                                    <TableRowColumn>
                                    {show ? <Link to={`${pathname}/show/${item.id}`}><i className='fa fa-arrow-right' aria-hidden='true' style={style}></i><br/></Link>: null}
                                    {edit ? <Link to={`${pathname}/edit/${item.id}`}><i className='fa fa-edit' aria-hidden='true' style={style}></i></Link>: null}
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