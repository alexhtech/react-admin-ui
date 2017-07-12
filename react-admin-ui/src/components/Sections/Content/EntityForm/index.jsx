import React from 'react'
import {reduxForm} from 'redux-form'
import {groupFields} from '../../../../utils'
import {getPrefix} from '../../../../lib'
import {Tabs, Tab, RaisedButton} from 'material-ui'
import Fields from './Fields'
import {Link} from 'react-isomorphic-tools'
import {Controls} from '../../'
import Delete from '../Delete'
import {ContentWrapper} from '../..'

@reduxForm()
export default class EntityForm extends React.Component {
    render() {
        const {
            handleSubmit,
            submitting,
            entity:{
                name,
                actions:{
                    del
                }
            }, submitLabel, query,
            params:{
                id
            },
            fields
        } = this.props
        const tabs = groupFields(fields)
        const prefix = getPrefix()
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    {tabs.length > 1 ?
                        <Tabs>
                            {tabs.map((item, index)=>
                                <Tab label={item.name || 'noName'} key={index}>
                                    <Fields fields={item.fields}/>
                                </Tab>
                            )}
                        </Tabs> : <Fields fields={tabs[0].fields}/>
                    }
                    <ContentWrapper>
                        <Controls>
                            {id && del && <Delete id={id} name={name} del={del} query={query} prefix={prefix}/>}
                            {id && <RaisedButton label='Show' type='button' primary={false} containerElement={
                                <Link to={{
                                    pathname: `${prefix}/${name}/${id}`,
                                    query
                                }}
                                />}/>}
                            <RaisedButton label={submitLabel} type='submit' primary={true} disabled={submitting}/>
                        </Controls>
                    </ContentWrapper>
                </form>
            </div>

        )
    }
}
