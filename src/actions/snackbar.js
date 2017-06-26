import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from '../constants'

const open = (key, message) => dispatch => {
    dispatch({
        type: SNACKBAR_OPEN,
        meta: key,
        payload: message
    })
}

const close = (key, message) => dispatch => {
    dispatch({
        type: SNACKBAR_CLOSE,
        meta: key,
        message: message
    })
}


export {open, close}