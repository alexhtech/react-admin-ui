import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import Home from './components/App/Home'


import Admin from './components/App/Admin'
import {
    Layout as AdminLayout,
    Create, Edit, Show, List,
    Login
} from './pages'

import Test from './pages/Test'

export const routes = (
    <Route component={App}>
        <Route path='/' name='Head'>
            <IndexRoute component={Home}/>
            <Route path='test:id' component={Test}/>
            <Route component={Admin}>
                <Route path='login' component={Login}/>
                <Route path='/admin' component={AdminLayout} name='React Admin'>
                    <Route path='entity/:name'>
                        <IndexRoute component={List}/>
                        <Route path='create' name='create' component={Create}/>
                        <Route path='edit/:id' name='edit' component={Edit}/>
                        <Route path='show/:id' component={Show}/>
                    </Route>
                </Route>
            </Route>
        </Route>
        <Route path='/error' getComponent={(nextState, cb)=> {
            import('react-isomorphic-tools/pages/Error').then((Component)=> {
                cb(null, Component)
            })
        }}/>
    </Route>
)
