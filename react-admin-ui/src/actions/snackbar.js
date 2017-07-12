import {SNACKBAR_OPEN, SNACKBAR_CLOSE} from '../constants'

const open = (key, message, time = 1000) => dispatch => {
    dispatch({
        type: SNACKBAR_OPEN,
        meta: {key, time},
        payload: message
    })
}

const close = key => dispatch => {
    dispatch({
        type: SNACKBAR_CLOSE,
        meta: {key}
    })
}

export {
    open,
    close
}