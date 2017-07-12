import React from 'react'
import {reduxForm, Field, blur} from 'redux-form'
import {FlatButton, Menu, MenuItem, IconMenu} from 'material-ui'
import styled from 'styled-components'
import {HeaderWrapper} from '../../../'
import Close from 'material-ui/svg-icons/navigation/close'

import {getFilters} from '../../../../../lib'
import {showField} from '../../../../../utils'


@reduxForm()
export default class FiltersForm extends React.Component {
    state = {
        filters: []
    }

    handleAddFilter = (event, {props:{value}}) => {
        this.setState({
            filters: this.state.filters.concat([value])
        })
    }

    handleDeleteFilter = (name) => (e) => {
        this.props.dispatch(blur('reactAdminFilters', name, null))
        this.setState({
            filters: this.state.filters.filter(item=>
                !item.name == name
            )
        })
    }

    render() {
        const {filters, handleSubmit} = this.props
        return (
            <HeaderWrapper end>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <StyledFilters className='row'>
                        {this.state.filters.map(({component, name, ...rest}, index)=> {
                            return <div className='col-3' key={index}>
                                <StyledFilter key={index}>
                                    <Close className='close' onClick={this.handleDeleteFilter(name)}/>
                                    <Field
                                        className='field'
                                        name={name}
                                        component={showField(component, getFilters())}
                                        {...rest}
                                    />
                                </StyledFilter>
                            </div>

                        })}
                        <div className='col-2'>

                            <Controls>
                                <AddFilter filters={filters} selectedFilters={this.state.filters}
                                           handleAddFilter={this.handleAddFilter}/>
                                <FlatButton type='submit'>
                                    Apply
                                </FlatButton>
                            </Controls>
                        </div>
                    </StyledFilters>
                </form>
            </HeaderWrapper>
        )
    }
}

const StyledFilter = styled.div`
    .close{
        position: absolute;
        left: -10px;
        top: -10px;
        background: #ffffff;
        border-radius: 15px;
        border: 1px solid #e4e4e4;
        opacity: 0;
        cursor: pointer;
    }
    &:hover{
        .close{
            opacity: 1;
        }
    }
`

const StyledFilters = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 48px;
`
const Controls = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
