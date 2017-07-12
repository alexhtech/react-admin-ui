import {combineReducers} from 'redux'
import * as baseReducers from 'react-isomorphic-tools/reducers'
import * as reducers from './'


export default combineReducers(Object.assign(baseReducers, reducers))