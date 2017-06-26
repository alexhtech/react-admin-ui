import React from 'react'
import {preload, fetcher, fetchToState, closeModal} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import {getEntity, getPrefix} from '../../utils'
import Show from '../../components/Entity/Show'
import {list, show} from '../../actions'
import {push} from 'react-router-redux'
import {open} from '../../actions/Snackbar'


@preload(show)
@connect((state, props)=>({
    item: state.getIn(['fetchData', `${props.params.name}Show`, 'response']),
}), {fetchToState, closeModal, push, open})
export default class ShowPage extends React.Component {

    static displayName = 'AdminShowPage'

    async handleDelete() {
        try {
            const {fetchToState, params, location, push, open, closeModal} = this.props
            await fetcher(getEntity(this.props.params.name).actions.del.url(this.props.params, this.props.location.query), {
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
                <Show
                    data={this.props.item.toJS()} 
                    entity={getEntity(this.props.params.name)}
                    onDelete={::this.handleDelete}
                />
            </div>
        )
    }
}
