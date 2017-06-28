import React from 'react'
import Drawler from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {getEntities, getPrefix} from '../../utils'
import {Link} from 'react-router'
import styled from 'styled-components'

const DrawlerContainerStyle = {
    top: '64px',
    height: 'calc( 100% - 64px )'
}

const EntityItem = styled(Link)`
    text-decoration: none
`

export default class Panel extends React.Component {

    constructor(props) {
        super(props)

        this.entities = getEntities()
    }

    render() {
        const {open} = this.props
        return (
            <Drawler open={open} containerStyle={DrawlerContainerStyle}>
                {Object.values(this.entities).filter((item)=>!item.hidden).map((item, index)=>(
                    <EntityItem key={index} to={`/${getPrefix()}/${item.name}`}>
                        <MenuItem>{item.title || item.name}</MenuItem>
                    </EntityItem>
                ))}
            </Drawler>
        )
    }
}
