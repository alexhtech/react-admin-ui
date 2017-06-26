import React from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form/immutable'
import {getPrefix} from '../../../utils'
import {groupFields} from '../../../utils/utility'
import {RaisedButton, Tabs, Tab} from 'material-ui'
import Dialog from 'material-ui/Dialog'
import ActionButton from '../../Common/ActionButton'
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'
import withRouter from 'react-router/lib/withRouter'
import Link from 'react-router/lib/Link'
import Fields from './Fields'
import Wrapper from './Wrapper'

@withRouter
@connect(state=>({
    'confirmDelete': state.getIn(['modals', 'confirmDelete']) || false
}), {openModal, closeModal})
@reduxForm()
export default class EntityForm extends React.Component {
    constructor() {
        super();
        this.tabsStyle = {
            margin: '-15px'
        }
    }

    static defaultProps = {
        del: false,
        label: 'Save'
    }


    render() {
        const {handleSubmit, submitting, fields, entity:{actions:{del}}} = this.props
        const tabs = groupFields(fields)
        return (
            <form onSubmit={handleSubmit}>
                {tabs.length > 1 ?
                    <Tabs>
                        {tabs.map((item, index)=>
                            <Tab label={item.name || 'noName'} key={index}>
                                <Fields fields={item.fields}/>
                            </Tab>
                        )}
                    </Tabs> :
                    <Fields fields={tabs[0].fields}/>
                }
                <div className='row'>
                    <div className='col-12'>
                        <Wrapper className='controls'>
                            {this.props.del && del && <span>

                                <RaisedButton label='Delete' onClick={()=>this.props.openModal('confirmDelete')}/>
                                <Dialog open={this.props.confirmDelete} actions={
                                    <div className='controls'>
                                        <RaisedButton label='Cancel'
                                                      onClick={()=>this.props.closeModal('confirmDelete')}/>
                                        <ActionButton component={RaisedButton} label='Delete'
                                                      action={this.props.onDelete}
                                                      primary={true}/>
                                    </div>}>Are you sure to delete?</Dialog>


                            </span>}
                            {this.props.params.id &&
                            <RaisedButton label='Show' type='submit' primary={false} containerElement={
                                <Link to={{
                                    pathname: `/${getPrefix()}/${this.props.params.name}/show/${this.props.params.id}`,
                                    query: this.props.location.query
                                }}
                                />}/>}
                            <RaisedButton label={this.props.label} type='submit' primary={true} disabled={submitting}/>
                        </Wrapper>
                    </div>
                </div>
            </form>
        )
    }
}
