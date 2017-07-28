import React from 'react'
import {reduxForm, Field, blur} from 'redux-form'
import {FlatButton, MenuItem, IconMenu} from 'material-ui'
import styled from 'styled-components'
import {HeaderWrapper} from '../../../'
import Close from 'material-ui/svg-icons/navigation/close'

import {getFilters} from '../../../../../lib'
import {showField} from '../../../../../utils'


@reduxForm()
export default class FiltersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: props.filters.filter((item=> {
                return item.open || item.initiallyOpen
            }))
        }
    }

    state = {
        filters: []
    }

    handleAddFilter = (event, {props:{value}}) => {
        this.setState({
            filters: this.state.filters.concat([value])
        })
    }

    handleDeleteFilter = (name) => () => {
        this.props.dispatch(blur('reactAdminFilters', name, null))
        this.setState({
            filters: this.state.filters.filter(item=>
                !(item.name == name)
            )
        })
    }

    render() {
        const {filters, handleSubmit} = this.props
        return (
            <HeaderWrapper end>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <Wrapper>
                        <Filters>
                            {this.state.filters.map(({component, name, open, ...rest}, index)=> {
                                return (
                                    <StyledFilter key={index}>
                                        {!open && <Close className='close' onClick={this.handleDeleteFilter(name)}/>}
                                        <Field
                                            className='field'
                                            name={name}
                                            component={showField(component, getFilters())}
                                            {...rest}
                                        />
                                    </StyledFilter>
                                )
                            })}
                        </Filters>

                        <Controls>
                            <AddFilter filters={filters} selectedFilters={this.state.filters}
                                       handleAddFilter={this.handleAddFilter}/>
                            <FlatButton type='submit'>
                                Apply
                            </FlatButton>
                        </Controls>
                    </Wrapper>
                </form>
            </HeaderWrapper>
        )
    }
}

const StyledFilter = styled.div`
    position: relative;
    .close{
        width: 18px !important;
        height: 18px !important;
        margin: auto .4rem auto 0;
        background: #ffffff;
        border-radius: 50%;
        border: 1px solid #e4e4e4;
        cursor: pointer;
    }
`
const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    > div{
        margin-right: 1rem;
        display: flex;
    }
    margin: -.5rem 0;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 0;
`
const Controls = styled.div`
    display: flex;
    align-self: flex-start;
`

class AddFilter extends React.Component {

    getRenderItems = () => {
        return this.props.filters.filter(item=> {
            return !(this.props.selectedFilters.findIndex(selectedItem=>selectedItem.name == item.name) != -1)
        })
    }

    render() {
        const {handleAddFilter} = this.props
        const items = this.getRenderItems()
        return items.length > 0 ?
            <IconMenu
                onItemTouchTap={handleAddFilter}
                iconButtonElement={<FlatButton>Add Filter</FlatButton>} maxHeight={272}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                {this.getRenderItems().map((item, index)=>
                    <MenuItem key={index} value={item}>
                        {item.title || item.name}
                    </MenuItem>
                )}
            </IconMenu> : null
    }
}
