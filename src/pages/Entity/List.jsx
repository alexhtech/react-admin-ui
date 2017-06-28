import React from 'react'
import {preload} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import List from '../../components/Entity/List'
import {getEntity} from '../../utils'
import {list} from '../../actions'
import { createSelector } from 'reselect'
import Immutable from 'immutable'

const getList = (state, props) => state.getIn(['fetchData', `${props.params.name}List`]) || Immutable.Map({})

const getListSelector = createSelector(
    getList,
    data => data.toJS()
)

const getResponse = (state, props) => state.getIn(['fetchData', `${props.params.name}List`, 'response']) || Immutable.List([])

const getItemsSelector = createSelector(
    getResponse,
    response => {
        const data = response.toJS()
        return data.items || data.Items || data.data
    }
)

@preload(list)
@connect((state, props)=>({
    list: getListSelector(state, props),
    items: getItemsSelector(state, props)
}))

export default class ListPage extends React.Component{
    static displayName = 'AdminListPage'
    render(){
        return (
            <List
                data={this.props.list}
                items={this.props.items}
                entity={getEntity(this.props.params.name)}
            />
        )
    }
}
