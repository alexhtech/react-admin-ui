import React from 'react'
import {showField} from '../../../utils/utility'
import {getWidgets, getPrefix} from '../../../utils'
import ActionButton from '../../Common/ActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import Link from 'react-router/lib/Link'
import HasMany from './HasMany'
import withRouter from 'react-router/lib/withRouter'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import Dialog from 'material-ui/Dialog'

@connect(state=>({
    'confirmDelete': state.getIn(['modals', 'confirmDelete']) || false
}), {openModal, closeModal})
@withRouter
export default class Show extends React.Component {
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
                            <div key={key} className={`entity-show--field col-${item.column || 12}`}>
                                <div className='entity-show--field-label'>
                                    {item.title || item.name}
                                </div>

                                {(()=> {
                                    if (item.component)
                                        return <item.component data={showField(item.name, data)} {...item}/>
                                    if (item.hasOne && showField(item.name, data))
                                        return <Link
                                            to={`/${getPrefix()}/${item.hasOne}/show/${showField(item.name, data)}`}>
                                            id - {showField(item.name, data)} {item.hasOne}
                                        </Link>

                                    if (item.hasMany && (showField(item.name, data).length <= 0))
                                        return <ul className='entity-show--field--many-items'>
                                            {
                                                showField(item.name, data).map(({id}, index)=> {
                                                    return (
                                                        <li key={index}><Link
                                                            to={`/${getPrefix()}/${item.hasMany}/show/${id}`}>ID {id}</Link>
                                                        </li>
                                                    )
                                                })}
                                        </ul>


                                    return showField(item.name, data)

                                })()}

                            </div>
                        )
                    })}
                    <HasMany hasMany={hasMany}/>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div className='controls'>
                            {del &&
                            <span>
                                    <RaisedButton label='Delete' onClick={()=>this.props.openModal('confirmDelete')}/>
                                    <Dialog open={this.props.confirmDelete} actions={
                                        <div className='controls'>
                                            <RaisedButton label='Cancel' onClick={()=>this.props.closeModal('confirmDelete')}/>
                                            <ActionButton component={RaisedButton} label='Delete' action={this.props.onDelete}
                                                          primary={true}/>
                                        </div>
                                    }>
                                        Are you sure to delete?
                                    </Dialog>
                                </span>
                            }
                            {edit && <RaisedButton label='Edit' type='submit' primary={true} containerElement={
                                <Link to={{pathname: `/${getPrefix()}/${name}/edit/${id}`, query}}
                                />}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
