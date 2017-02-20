import React from 'react'
import {preload} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import {getEntity} from '../../../../react-admin-ui'
import Show from '../../components/Entity/Show'


@preload(({fetchToState, params, location})=> {
    const entity = getEntity(params.name)
    return fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params) : `/${params.name}/${params.id}`, {
        params: {...location.query},
        key: `${params.name}Show`
    })
})
@connect((state, props)=>({
    item: state.getIn(['fetchData', `${props.params.name}Show`, 'response']),
}))
export default class ShowPage extends React.Component {
    render() {
        return (
            <div className='block'>
                <Show data={this.props.item.toJS()} entity={getEntity(this.props.params.name)}/>
            </div>
        )
    }
}