import {combineReducers} from 'redux-immutable'
import * as baseReducers from 'react-isomorphic-tools/reducers/immutable'
import * as reducers from './'


export default combineReducers(Object.assign(baseReducers, reducers))