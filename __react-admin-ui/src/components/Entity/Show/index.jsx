import React from 'react'
import {showField, groupFields} from '../../../utils/utility'
import {getWidgets, getPrefix} from '../../../utils'
import {RaisedButton, Tabs, Tab} from 'material-ui'
import Link from 'react-router/lib/Link'
import HasMany from './HasMany'
import withRouter from 'react-router/lib/withRouter'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import DeleteAction from './Delete'

import Fields from './Fields'
import Wrapper from '../Form/Wrapper'

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

        const tabs = groupFields(fields)

        return (
            <div className='entity-show--fields'>
                <Wrapper>
                    {tabs.length > 1 ?
                        <Tabs>
                            {tabs.map((item, index)=>
                                <Tab label={item.name || 'noName'} key={index}>
                                    <Fields data={data} fields={item.fields}/>
                                </Tab>
                            )}
                        </Tabs>
                        :
                        <Fields data={data} fields={tabs[0].fields}/>
                    }


                    <HasMany hasMany={hasMany}/>
                </Wrapper>
                <div className='row'>
                    <div className='col-12'>
                        <Wrapper className='controls'>
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
                        </Wrapper>
                    </div>
                </div>
            </div>
        )
    }
}
