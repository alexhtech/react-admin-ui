import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Test from './pages/Test'
import App from './components/App'
import Home from './components/App/Home'


import Admin from './components/App/Admin'
import {Layout as AdminLayout, Create, Edit, Show, List} from '../react-admin-ui/src/pages'

export const routes = (
    <Route path='/' component={App} name='Head'>
        <IndexRoute component={Home}/>
        <Route path='/test:id' component={Test}>
        </Route>
        <Route path='/admin' component={Admin} name='React Admin'>
            <Route path='entity/:name' component={AdminLayout}>
                <IndexRoute component={List}/>
                <Route path='create' name='create' component={Create}/>
                <Route path='edit/:id' name='edit' component={Edit}/>
                <Route path='show/:id' component={Show}/>
            </Route>
        </Route>
    </Route>
)
