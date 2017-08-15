import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getEntity} from '../../../../lib'
import Items from './Items'
import Pagination from './Pagination'

@connect((state, props)=>({
    list: state.fetchData[`${props.entityName}List`] || {isLoading: true}
}))
@Pagination
class List extends React.Component {
    static propTypes = {
        entityName: PropTypes.string.isRequired
    }

    render() {
        const entity = getEntity(this.props.entityName)
        const {actions:{list:{component: CustomList}}} = entity
        const {items, query, location} = this.props

        const props = {entity, items, query, location}

        return CustomList ? <CustomList {...props}/> : <Items {...props}/>
    }
}

export default List