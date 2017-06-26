import React from 'react'
import Drawler from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {getEntities, getPrefix} from '../../utils'
import {Link} from 'react-router'

const DrawlerContainerStyle = {
    top: '64px'
}

export default class Panel extends React.Component {

    componentDidMount() {
        setTimeout(()=> {
            this.props.handleShow('panel')
        }, 100)


    }
    componentWillUnmount() {
        this.props.handleClose('panel')
    }

    render() {
        const {open} = this.props
        const entities = getEntities()
        return (
            <Drawler open={open == true} containerStyle={DrawlerContainerStyle} containerClassName='panel__left'>
                {Object.values(entities).filter((item)=>!item.hidden).map((item, index)=>(
                    <Link key={index} to={`/${getPrefix()}/${item.name}`}>
                        <MenuItem>{item.title || item.name}</MenuItem>
                    </Link>
                ))}
            </Drawler>
        )
    }
}
