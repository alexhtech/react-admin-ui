import React from 'react'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'
import {Divider} from 'material-ui'
import Form from './Form'
import isJSON from 'is-json'

@withRouter
export default class index extends React.Component {
    render() {
        const {filters, location: {query}, location} = this.props
        return (
            <div>
                <Form filters={filters} location={location} onSubmit={async(form, dispatch)=> {

                    const filters = form.filter((item)=>item != '')

                    dispatch(push({
                        ...this.props.location,
                        query: {
                            filters: filters.size != 0 ? JSON.stringify(filters) : undefined
                        }
                    }))
                }}
                      form='reactAdminFilters'
                      initialValues={
                          query && query.filters && isJSON(query.filters) ? JSON.parse(query.filters) : undefined
                      }
                />
                <Divider />
            </div>
        )
    }
}
