import React from 'react'
import {TableRow, TableHeaderColumn, FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import RelationsHeader from './RelationsHeader'

import {Link} from 'react-isomorphic-tools'

export default class Header extends React.Component {
    render() {
        const {fields, query, hasMany, prefix, create} = this.props
        return (
            <TableRow>
                {fields.map((field, key)=>
                    <TableHeaderColumn style={field.style} key={key}>
                        {field.title || field.name || field.label}
                    </TableHeaderColumn>
                )}
                <RelationsHeader hasMany={hasMany}/>
                {create &&
                <TableHeaderColumn>
                    <Link to={{pathname: `${prefix}/create`, query}}>
                        <FloatingActionButton mini={true} style={{float: 'right'}}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                </TableHeaderColumn>
                }
            </TableRow>
        )
    }
}