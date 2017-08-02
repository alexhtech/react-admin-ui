import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-isomorphic-tools'
import {TableRowColumn} from 'material-ui'
import {getEntity, getPrefix} from '../../../../lib'
import {showField} from '../../../../utils'

export default class RelationsBody extends React.Component {
    static propTypes = {
        hasMany: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        item: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        entityName: PropTypes.string.isRequired,
        query: PropTypes.object.isRequired
    }

    render() {
        const {hasMany, entityName, id, item, query} = this.props

        if (typeof (hasMany) == 'object') {
            return hasMany.map((item, index)=> {
                const entity = getEntity(item)
                return <TableRowColumn key={index}>
                    <Link to={{
                        pathname: `${getPrefix()}/${item}`,
                        query: {
                            ...query,
                            id: showField(id, item),
                            name: entityName
                        }
                    }}>List of {entity.title || entity.name}</Link>
                </TableRowColumn>
            })
        }

        if (typeof (hasMany) == 'string') {
            const entity = getEntity(hasMany)
            return <TableRowColumn>
                <Link to={{
                    pathname: `${getPrefix()}/${hasMany}`,
                    query: {
                        ...query,
                        id: showField(id, item),
                        name: entityName
                    }
                }}>List of {entity.title || entity.name}</Link>
            </TableRowColumn>
        }

        return null
    }
}