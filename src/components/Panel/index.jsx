import React from 'react'
import Drawler from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {getEntities} from '../../../react-admin-ui'
import {Link} from 'react-router'
import {getPrefix} from '../../../react-admin-ui'

export default class Panel extends React.Component{
    componentDidMount = () =>{
        this.props.handleShow('panel')
    }

    render(){
        const {open} = this.props
        const entities = getEntities()
        return(
            <Drawler open={open==true} containerStyle={{top: '64px'}}>
                {Object.values(entities).map((item, index)=>(
                    <Link key={index} to={`/${getPrefix()}/${item.name}`}><MenuItem>{item.title||item.name}</MenuItem></Link>
                ))}
            </Drawler>
        )
    }
}