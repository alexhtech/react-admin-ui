import React from 'react'
import {getEntity, getPrefix} from '../lib'
import {Divider, FlatButton} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import EntityForm from '../components/Sections/Content/EntityForm'
import qs from 'qs'
import {Link} from 'react-isomorphic-tools'
import {handleCreate, handleCreateSuccess, handleCreateFail} from '../actions'
import {HeaderWrapper} from '../components/Sections'

export default class Create extends React.Component {
    render() {
        const entity = getEntity(this.props.match.params.name)
        const {
            actions:{
                create:{
                    initialValues = {},
                    fields,
                    component: CustomForm,
                    validate
                }
            }
        } = entity
        const prefix = getPrefix()
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
        return (
            <div>
                <HeaderWrapper>
                    <span className='title'>Create item of {entity.title || entity.name}</span>
                    <FlatButton
                        icon={<Back/>}
                        label='Back to list'
                        containerElement={<Link to={{pathname: `${prefix}/${entity.name}`, query}}/>}
                    />
                </HeaderWrapper>
                <Divider/>
                {CustomForm ?
                    <CustomForm initialValues={initialValues}
                                entity={entity}
                                form={entity.name}
                                query={query}
                                params={this.props.match.params}
                                prefix={prefix}
                    /> :
                    <EntityForm onSubmit={handleCreate}
                                onSubmitSuccess={handleCreateSuccess}
                                onSubmitFail={handleCreateFail}
                                initialValues={initialValues}
                                entity={entity}
                                form={entity.name}
                                submitLabel='Create'
                                query={query}
                                params={this.props.match.params}
                                prefix={prefix}
                                fields={fields}
                                validate={validate}
                    />
                }

            </div>
        )
    }
}