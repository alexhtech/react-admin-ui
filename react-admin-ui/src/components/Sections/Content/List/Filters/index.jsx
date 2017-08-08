import React from 'react'
import PropTypes from 'prop-types'
import {Divider} from 'material-ui'
import Form from './Form'
import isJSON from 'is-json'
import {getEntity} from '../../../../../lib'
import {parse, stringify} from 'qs'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {destroy, initialize} from 'redux-form'

@connect(null, {destroy, initialize})
export default class index extends React.Component {
    static propTypes = {
        entityName: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.check(nextProps)) {
            this.props.destroy('reactAdminFilters')
            const query = parse(nextProps.location.search, {ignoreQueryPrefix: true})
            const data = query && query.filters && isJSON(query.filters) ? JSON.parse(query.filters) : undefined
            this.props.initialize('reactAdminFilters', data)
        }
    }

    check = (nextProps) => {
        if (nextProps.entityName != this.props.entityName) return true
        const query = parse(this.props.location.search, {ignoreQueryPrefix: true})
        const nextQuery = parse(nextProps.location.search, {ignoreQueryPrefix: true})
        if (!!query.filters && !nextQuery.filters) return true

        return false
    }

    render() {
        const entity = getEntity(this.props.entityName)
        const {filters} = entity.actions.list
        const query = parse(this.props.location.search, {ignoreQueryPrefix: true})
        return !filters ? null :
            <div>
                <Form entityName={this.props.entityName} filters={filters} onSubmit={async(filters = {}, dispatch)=> {
                    dispatch(push({
                        ...this.props.location,
                        search: stringify({
                                ...query,
                                filters: Object.keys(filters).length != 0 ? JSON.stringify(filters) : undefined,
                                page: undefined
                            },
                            {addQueryPrefix: true}
                        )
                    }))
                }}
                      form='reactAdminFilters'
                      initialValues={
                          query && query.filters && isJSON(query.filters) ? JSON.parse(query.filters) : undefined
                      }
                />
                <Divider/>
            </div>
    }
}