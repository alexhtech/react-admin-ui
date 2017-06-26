import React from 'react'
import {connect} from 'react-redux'
import List from '../../components/Entity/List'
import {getEntity} from '../../utils'
import {createSelector} from 'reselect'

const getList = (state, props) => state.getIn(['fetchData', `${props.match.params.name}List`])

const getListSelector = createSelector(
    getList,
    data => data.toJS()
)

const getResponse = (state, props) => state.getIn(['fetchData', `${props.match.params.name}List`, 'response'])

const getItemsSelector = createSelector(
    getResponse,
    response => {
        const data = response.toJS()
        return data.items || data.Items || data.data
    }
)

@connect((state, props)=>({
    list: getListSelector(state, props),
    items: getItemsSelector(state, props)
}))
export default class ListPage extends React.Component {
    render() {
        return (
            <div className='block'>
                <List
                    data={this.props.list}
                    items={this.props.items}
                    entity={getEntity(this.props.match.params.name)}
                />
            </div>
        )
    }
}
