import React from 'react'
import {showField} from '../../../utils/utility'
import {getWidgets} from '../../..'
import ActionButton from '../../Common/ActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import Children from '../Children'
import {getPrefix} from '../../..'
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
                show:{fields, children},
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
                {fields.map((item, key)=> {
                    let {component} = item
                    if (typeof (component) == 'string') {
                        let widget = showField(component, getWidgets())
                        if (widget) {
                            item = {...item, component: widget, id: `__${item.name}`}
                        }
                    }
                    return (
                        <div key={key} className='entity-show--field'>
                            <div className='entity-show--field-label'>
                                {item.title || item.name}
                            </div>
                            {item.component ?
                                <item.component data={showField(item.name, data)}/> : showField(item.name, data)}
                        </div>
                    )
                })}

                {
                    Object.keys(children).map((item, index)=> {
                            const child = children[item]
                            return (
                                <div key={index}>
                                    <p>
                                        {child.label || child.name }
                                    </p>
                                    <Children {...children[item]}/>
                                </div>
                            )
                        }
                    )
                }

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
        )
    }
}