import React from 'react'
import {reduxForm, Field} from 'redux-form/immutable'
import FilterWrapper from './FilterWrapper'
import {FlatButton} from 'material-ui'

import {showField} from '../../../../utils/utility'
import {getFilters} from '../../../../utils'


@reduxForm()
export default class FiltersForm extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.props.destroy()
        }
    }

    render() {
        const {filters, handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                {filters.map(({component, name, ...rest}, index)=> {
                    return <FilterWrapper key={index}>
                        <Field
                            name={name}
                            component={showField(component, getFilters())}
                            {...rest}
                        />
                    </FilterWrapper>
                })}
                <FlatButton type='submit'>
                    Apply
                </FlatButton>
            </form>
        )
    }
}
