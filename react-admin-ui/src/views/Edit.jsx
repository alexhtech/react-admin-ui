import React from 'react'
import {getEntity, getPrefix} from '../lib'
import {showField} from '../utils'
import {Divider, FlatButton, Chip} from 'material-ui'
import Back from 'material-ui/svg-icons/action/assignment-return'
import EntityForm from '../components/Sections/Content/EntityForm'
import queryString from 'query-string'
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
                    fields
                }
            }
        } = entity
        const prefix = getPrefix()
        const query = queryString.parse(this.props.location.search)
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
                <EntityForm
                    onSubmit={handleEdit}
                    onSubmitSuccess={handleEditSuccess}
                    onSubmitFail={handleEditFail}
                    initialValues={this.getInitialValues(initFields)}
                    entity={entity}
                    form={entity.name}
                    submitLabel='Save'
                    query={query}
                    params={this.props.match.params}
                    prefix={prefix}
                    fields={fields}
                    validate={validate}
                />
            </div>
        )
    }
}
