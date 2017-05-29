import React from 'react'
import {showField} from '../../../utils/utility'
import {getWidgets, getPrefix} from '../../../utils'
import RaisedButton from 'material-ui/RaisedButton'
import Link from 'react-router/lib/Link'
import HasMany from './HasMany'
import withRouter from 'react-router/lib/withRouter'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import DeleteAction from './Delete'
import Item from './Item'

@connect(state=>({
    confirmDelete: state.getIn(['modals', 'confirmDelete']) || false
}), {openModal, closeModal})
@withRouter
export default class Show extends React.Component {

    toggleConfirmDelete = () => {
        const {confirmDelete, openModal, closeModal} = this.props

        if (confirmDelete) {
            closeModal('confirmDelete')
        } else {
            openModal('confirmDelete')
        }
    }

    render() {
        const {
            data, entity:{
            actions:{
                show:{fields, hasMany},
                edit,
                del
            }
        },
            location:{
                query
            },
            params:{
                name, id
            }
        } = this.props
        return (
            <div className='entity-show--fields'>
                <div className='row'>
                    {fields.map((item, key)=> {
                        let {component} = item
                        if (typeof (component) == 'string') {
                            let widget = showField(component, getWidgets())
                            if (widget) {
                                item = {...item, component: widget, id: `__${item.name}`}
                            }
                        }
                        return (
                            <Item
                                key={key}
                                item={item}
                                data={data}
                            />
                        )
                    })}
                    <HasMany hasMany={hasMany}/>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div className='controls'>
                            {del &&
                                <DeleteAction
                                    toggleConfirmDelete={this.toggleConfirmDelete}
                                    confirmDelete={this.props.confirmDelete}
                                    onDelete={this.props.onDelete}
                                />
                            }
                            {edit &&
                                <RaisedButton
                                    label='Edit'
                                    type='submit'
                                    primary={true}
                                    containerElement={
                                        <Link to={{pathname: `/${getPrefix()}/${name}/edit/${id}`, query}}/>
                                    }
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
