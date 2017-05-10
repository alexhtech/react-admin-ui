import React from 'react'
import {preload, fetcher, fetchToState, closeModal} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import {getEntity, getPrefix} from '../..'
import Show from '../../components/Entity/Show'
import {list} from '../../actions'
import {push} from 'react-router-redux'
import {open} from '../../actions/Snackbar'


@preload(({fetchToState, params, location})=> {
    const entity = getEntity(params.name)
    return fetchToState(typeof (entity.actions.show.url) == 'function' ? entity.actions.show.url(params, location.query) : `/${params.name}/${params.id}`, {
        params: {...location.query.params},
        key: `${params.name}Show`
    })
})
@connect((state, props)=>({
    item: state.getIn(['fetchData', `${props.params.name}Show`, 'response']),
}), {fetchToState, closeModal, push, open})
export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        this.entity = getEntity(props.params.name)
    }

    async handleDelete() {
        try {
            const {fetchToState, params, location, push, open, closeModal} = this.props
            await fetcher(this.entity.actions.del.url(this.props.params, this.props.location.query), {
                method: 'DELETE'
            })
            closeModal('confirmDelete')
            open('default', 'Successfully deleted')
            await list({fetchToState, params, location})
            push(`/${getPrefix()}/${this.props.params.name}`)
        }
        catch (e) {
            this.props.open('default', 'Error deleting')
        }
    }

    render() {
        return (
            <div className='block'>
                <Show data={this.props.item.toJS()} entity={this.entity} onDelete={::this.handleDelete}/>
            </div>
        )
    }
}