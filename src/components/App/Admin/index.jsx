import React from 'react'

import {setEntities, setPrefix, setFormFields, setWidgets} from '../../../utils'
import '../../../../assets/styles/style.sass'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey500, blueGrey800, grey700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as material from 'redux-form-material-ui'
import * as formFields from '../../FormFields'

setEntities(require('../../../entities'))
setPrefix('admin/entity')
setFormFields({
    material,
    formFields
})


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
                }
            })}>
                    {this.props.children}
            </MuiThemeProvider>
        )
    }
}
