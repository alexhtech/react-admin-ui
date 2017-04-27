# Installation

## 1. Routes



```js
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {Layout, Create, Edit, List, Show} from 'react-admin-ui/pages' 
import Admin from './Admin.jsx'

export const routes = (
        <Route component={Admin}>
            <Route path='admin' component={Layout} name='React Admin'>
                <Route path=':name'>
                    <IndexRoute component={List}/>
                    <Route path='create' name='create' component={Create}/>
                    <Route path='edit/:id' name='edit' component={Edit}/>
                    <Route path='show/:id' component={Show}/>
                </Route>
            </Route>
        </Route>
)
```

## 2. Admin.jsx
```js
import React from 'react'
import {setEntities, setPrefix, setFormFields} from 'react-admin-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey500, blueGrey800, grey700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'react-admin-ui/assets/styles/style.sass'
import * as entities from '../../entities'
import * as material from 'redux-form-material-ui'

setPrefix('admin')
setEntities(entities)
setFormFields({
    material
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
```
## 3. src/enities/index.js

It will be consist export of all entities in own project
example:

```js
export languages from './languages'
```

## 4. src/entities/languages.js

```js
export default {
    name: 'languages',
    url: '/languages',
    actions: {
        list: {
            fields: [
                {name: 'name'}
            ]
        },
        show: {
            fields: [
                {name: 'name'}
            ]
        },
        create: {
            wrapper: 'languageForm',
            form: 'languages',
            fields: [
                {name: 'name', component: 'input'}
            ],
            url: ()=>'/languages'
        },
        edit: {
            wrapper: 'languageForm',
            form: 'languages',
            fields: [
                {name: 'name', component: 'input'}
            ],
            formFields: [
                {name: 'name'}
            ],
            url: ({id})=>`/languages/${id}`
        },
        del: {
            url: ({id})=>`/languages/${id}`

        }
    }
}
```

## 5. Snackbar reducer in src/reducers/index.js

```js
//your some code
//...
export snackbar from 'react-admin-ui/reducers/snackbar'
```




