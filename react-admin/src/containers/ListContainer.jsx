import React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {getEntity} from '../utils'
import Filters from '../components/Entity/List/Filters'
import List from '../components/Entity/List'

@connect((state, props)=>({
    list: state.getIn(`fetchData.${props.match.params.name}List`.split('.'))
}))
export default class ListContainer extends React.Component {
    render() {
        console.log('container List', this.props.match.params)
        const entity = getEntity(this.props.match.params.name)
        const query = queryString.parse(this.props.location.search)
        const url = this.props.match.url
        return (
            <div>
                <Filters query={query} filters={entity.actions.list.filters}/>
                <List entity={entity} data={this.props.list} query={query} url={url}/>
            </div>
        )
    }
}