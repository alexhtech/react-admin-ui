import React from 'react'
import PropTypes from 'prop-types'
import {TableHeaderColumn} from 'material-ui'
import {getEntity} from '../../../../lib'

export default class Relations extends React.Component {
    static propTypes = {
        hasMany: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    }

    render() {
        const {hasMany} = this.props

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

        return null
    }
}