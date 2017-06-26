import App from '../components/App'
import Home from '../components/App/Home'
// import Navigation from '../pages/Navigation'
import Error from 'react-isomorphic-tools/pages/Error'
import Admin from '../components/App/Admin'
import admin from './admin'

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                component: Admin,
                path: '/admin',
                routes: admin
            },
            {
                path: '/error',
                component: Error
            }
        ]
    }

]


export {
    routes
}