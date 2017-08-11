import React from 'react'
import {getEntity, getPrefix} from '../lib'
import {showField} from '../utils'
import {Divider, FlatButton, Chip} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import EntityForm from '../components/Sections/Content/EntityForm'
import qs from 'qs'
import {Link} from 'react-isomorphic-tools'
import {connect} from 'react-redux'
import {handleEdit, handleEditSuccess, handleEditFail} from '../actions'
import {HeaderWrapper} from '../components/Sections'
import validate from '../validate'

@connect((state, props)=>({
    show: state.fetchData[`${props.match.params.name}Show`].response
}))
export default class Edit extends React.Component {


    getInitialValues = (initFields, data = this.props.show) => {
        let values = {}
        for (let i in initFields) {
            if (initFields.hasOwnProperty(i)) {
                let name = initFields[i]
                const deepName = name.split('.')
                values[deepName[deepName.length - 1]] = showField(name, data)
            }
        }
        return values
    }

    render() {
        const entity = getEntity(this.props.match.params.name)
        const {
            actions:{
                edit:{
                    initFields,
                    fields,
                    component: CustomForm
                }
            }
        } = entity
        const prefix = getPrefix()
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
        const initialValues = this.getInitialValues(initFields)
        return (
            <div>
                <HeaderWrapper>
                    <Chip>#{this.props.match.params.id}</Chip>
                    <FlatButton
                        icon={<Back/>}
                        label='Back to list'
                        containerElement={<Link to={{pathname: `${prefix}/${entity.name}`, query}}/>}
                    />
                </HeaderWrapper>
                <Divider/>
                {!!CustomForm ?
                    <CustomForm initialValues={initialValues}
                                entity={entity}
                                form={entity.name}
                                query={query}
                                params={this.props.match.params}
                                prefix={prefix}
                    /> :
                    <EntityForm onSubmit={handleEdit}
                                onSubmitSuccess={handleEditSuccess}
                                onSubmitFail={handleEditFail}
                                initialValues={initialValues}
                                entity={entity}
                                form={entity.name}
                                submitLabel='Save'
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
