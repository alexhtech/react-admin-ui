import React from 'react'
import {reduxForm} from 'redux-form/immutable'
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
import styled from 'styled-components'

const styleButtonMargin = {
    marginRight: '15px'
}

const ControlsButtonWrapper = styled(Wrapper)`
    display: flex;
    justify-content: flex-end;
`

const ControlsButton = styled.div`
    display: flex;
    justify-content: flex-end;
`

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
                        <ControlsButtonWrapper>
                            {this.props.del && del && <span>

                                <RaisedButton label='Delete' style={styleButtonMargin} onClick={()=>this.props.openModal('confirmDelete')}/>
                                <Dialog open={this.props.confirmDelete} actions={
                                    <ControlsButton>
                                        <RaisedButton
                                            label='Cancel'
                                            onClick={()=>this.props.closeModal('confirmDelete')}
                                            style={styleButtonMargin}
                                        />
                                        <ActionButton component={RaisedButton} label='Delete'
                                                      action={this.props.onDelete}
                                                      primary={true}/>
                                    </ControlsButton>}>Are you sure to delete?</Dialog>


                            </span>}
                            {this.props.params.id &&
                            <RaisedButton label='Show' type='submit' primary={false} style={styleButtonMargin} containerElement={
                                <Link to={{
                                    pathname: `/${getPrefix()}/${this.props.params.name}/show/${this.props.params.id}`,
                                    query: this.props.location.query
                                }}
                                />}/>}
                            <RaisedButton label={this.props.label} type='submit' primary={true} disabled={submitting}/>
                        </ControlsButtonWrapper>
                    </div>
                </div>
            </form>
        )
    }
}
