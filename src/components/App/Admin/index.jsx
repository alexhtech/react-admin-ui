import React from 'react'
import {connect} from 'react-redux'
import {renderRoutes} from 'react-router-config'

import {setEntities, setPrefix, setFormFields, setFilters} from '../../../../react-admin-ui/src/lib'
import '../../../../assets/styles/style.sass'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey500, blueGrey800, grey700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as material from 'redux-form-material-ui'
import * as entities from '../../../entities'

setEntities(entities)
setPrefix('/admin/entity')
setFormFields({
    material,
})
setFilters({
    material,
})

@connect(state=>({
    userAgent: state.navigator.userAgent
}))
export default class index extends React.Component {


    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({
                palette: {
                    primary1Color: blueGrey800,
                    primary2Color: grey700,
                    primary3Color: grey500
                },
            }, {
                avatar: {
                    borderColor: null,
                },
                userAgent: this.props.userAgent
            })}>
                {renderRoutes(this.props.route.routes)}
            </MuiThemeProvider>
        )
    }
}
