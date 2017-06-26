import React from 'react'
import {connect} from 'react-redux'
import Drawler from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {getEntities, getPrefix} from '../../utils'
import {Link, openModal, closeModal} from 'react-isomorphic-tools'
import styled from 'styled-components'


const DrawlerStyled = styled(Drawler)`
color: rgba(0, 0, 0, 0.87);
    background-color: rgb(255, 255, 255);
    transition: margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    border-radius: 2px;
    flex: 0 0 256px;
    margin-left: 0px;
    order: -1;
    margin-left: ${props=>props.panel ? '0' : '-256px'};
`

@connect((state=>({
    panel: state.getIn(['modals', 'panel']) || false
})), {openModal, closeModal})
export default class Panel extends React.Component {

    componentDidMount() {
        setTimeout(()=> {
            this.props.openModal('panel')
        }, 200)


    }

    componentWillUnmount() {
        this.props.closeModal('panel')
    }

    render() {
        const {panel} = this.props
        const style = {
            position: 'relative'
        }

        return (
            <DrawlerStyled open={true} panel={panel} containerStyle={style}>
                {Object.values(getEntities()).filter((item)=>!item.hidden).map((item, index)=>(
                    <Link key={index} to={{pathname: `${getPrefix()}/${item.name}`}}>
                        <MenuItem>{item.title || item.name}</MenuItem>
                    </Link>
                ))}
            </DrawlerStyled>
        )
    }
}
