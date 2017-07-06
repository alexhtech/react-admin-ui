import React from 'react'
import {reduxForm, Field} from 'redux-form/immutable'
import FilterWrapper from './FilterWrapper'
import {FlatButton } from 'material-ui'
// import CleaerFilterIcon from 'material-ui/svg-icons/communication/clear-all'
import SearchIcon from 'material-ui/svg-icons/action/search'
import {showField} from '../../../../utils/utility'
import {getFilters} from '../../../../utils'
import styled from 'styled-components'
import {push} from 'react-router-redux'

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
`

const WrapperFields = styled.div`
    display: flex;
    align-items: center;
`

// const styleClearButton = {
//     marginRight: '10px'
// }

const styleButton = {
}

const WrapperButtons = styled.div`

`

@reduxForm()
export default class FiltersForm extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.props.destroy()
        }
    }

    filterClear = () => {
        this.props.destroy()
        this.props.dispatch(push(this.props.location.pathname))
    }

    render() {
        const {filters, handleSubmit} = this.props
        return (
            <Form onSubmit={handleSubmit}>
                <WrapperFields>
                    {filters.map(({component, name, ...rest}, index)=> {
                        return <FilterWrapper key={index}>
                            <Field
                                name={name}
                                component={showField(component, getFilters())}
                                {...rest}
                            />
                        </FilterWrapper>
                    })}
                </WrapperFields>
                <WrapperButtons>
                    {/*<FlatButton
                        type='button'
                        icon={<CleaerFilterIcon/>}
                        style={styleClearButton}
                        label='CLEAR FILTERS'
                        onClick={this.filterClear}
                    />*/}
                    <FlatButton
                        type='submit'
                        icon={<SearchIcon/>}
                        style={styleButton}
                        label='SEARCH'
                    />
                </WrapperButtons>
            </Form>
        )
    }
}
