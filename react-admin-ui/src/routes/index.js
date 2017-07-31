import Layout from '../components/Layout'
import List from '../views/List'
import Show from '../views/Show'
import Create from '../views/Create'
import Edit from '../views/Edit'
import {list, show} from '../actions'
import {getPrefix} from '../lib'

const prefix = getPrefix()

export default [
    {
        component: Layout,
        routes: [
            {
                path: prefix + '/:name',
                component: List,
                preload: list,
                exact: true,
                strict: true
            },
            {
                path: prefix + '/:name/create',
                component: Create,
                exact: true,
                strict: true
            },
            {
                path: prefix + '/:name/:id',
                component: Show,
                preload: show,
                exact: true,
                strict: true
            },
            {
                path: prefix + '/:name/:id/edit',
                component: Edit,
                preload: show,
                exact: true,
                strict: true
            }
        ]
    }
]