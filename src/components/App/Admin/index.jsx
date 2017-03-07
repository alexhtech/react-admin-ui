import React from "react"

import {setEntities, setPrefix} from "../../../../react-admin-ui/src"
import "../../../../react-admin-ui/assets/styles/style.sass"

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import {grey500, blueGrey800, grey700} from "material-ui/styles/colors"
import getMuiTheme from "material-ui/styles/getMuiTheme"


setEntities(require("../../../entities"))
setPrefix("admin/entity")


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