import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {setBaseUrl} from 'react-isomorphic-tools'
import {render} from './Application'
import configureStore from './store/configureStore'
import config from '../config'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS()
    }
})

import '../assets/style.sass'
setBaseUrl(config().baseUrl)


render()

if (module.hot) module.hot.accept('./Application', render)

export {
    store,
    history
}