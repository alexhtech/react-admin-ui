import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getEntity} from '../../../../lib'
import Items from './Items'
import Pagination from './Pagination'

@connect((state, props)=>({
    list: state.fetchData[`${props.entityName}List`]
}))
@Pagination
class List extends React.Component {
    static propTypes = {
        entityName: PropTypes.string.isRequired
    }

    render() {
        const entity = getEntity(this.props.entityName)
        const {items, query, location} = this.props

        return <Items entity={entity} items={items} query={query} location={location}/>

    }
}

export default List