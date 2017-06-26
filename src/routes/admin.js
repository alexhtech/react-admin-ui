import Layout from '../pages/Entity'
import List from '../containers/ListContainer'
import {edit, list, show} from '../actions'
import {getPrefix} from '../utils'

export default [
    {
        component: Layout,
        routes: [
            {
                path: `${getPrefix()}/:name`,
                component: List,
                preload: list,
                exact: true,
                strict: true
            },
            // {
            //     path: `${getPrefix()}/:name/:id`,
            //     exact:
            // }
            // {
            //     path: `${getPrefix()}/:name`,
            //     component: List,
            //     preload: list,
            //     exact: true
            // },
            // {
            //     path: `${getPrefix()}/:name/create`,
            //     component: Create,
            //     exact: true
            // },
            // {
            //     path: `${getPrefix()}/:name/edit/:id`,
            //     component: Edit,
            //     preload: edit,
            //     exact: true
            // },
            // {
            //     path: `${getPrefix()}/:name/show/:id`,
            //     component: Show,
            //     preload: show,
            //     exact: true
            // }
        ]
    }
]