import {setBaseUrl} from 'react-isomorphic-tools'
import createHistory from 'history/createBrowserHistory'
import {render} from './Application'
import configureStore from './store/configureStore'
import config from '../config'
const history = createHistory()
const store = configureStore()
setBaseUrl(config().baseUrl)


render()

if (module.hot) module.hot.accept('./Application', render)



export {
    store,
    history
}