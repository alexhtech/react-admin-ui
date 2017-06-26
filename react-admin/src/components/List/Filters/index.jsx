import React from 'react'
import PropTypes from 'prop-types'
import {Divider} from 'material-ui'
import Form from './Form'
import isJSON from 'is-json'

export default class index extends React.Component {
    static propTypes = {
        filters: PropTypes.array,
        query: PropTypes.object
    }

    render() {
        const {filters, query} = this.props
        return !this.props.filters ? null :
            <div>
                <Form filters={filters} onSubmit={async(form, dispatch)=> {
                    const filters = form.filter((item)=>item != '')
                    {/*dispatch(push({*/}
                        {/*...this.props.location,*/}
                        {/*query: {*/}
                            {/*filters: filters.size != 0 ? JSON.stringify(filters) : undefined*/}
                        {/*}*/}
                    {/*}))*/}
                }}
                      form='reactAdminFilters'
                      initialValues={
                          query && query.filters && isJSON(query.filters) ? JSON.parse(query.filters) : undefined
                      }
                />
                <Divider />
            </div>

    }
}