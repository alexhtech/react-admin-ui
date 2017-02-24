import {combineReducers} from 'redux-immutable'
import * as baseReducers from 'react-isomorphic-tools'
import * as reducers from './'


export default combineReducers(Object.assign(baseReducers, reducers))