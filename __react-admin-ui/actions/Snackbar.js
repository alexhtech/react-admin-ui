'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var open = function open(key, message) {
    return function (dispatch) {
        dispatch({
            type: '@@snackbar/open',
            meta: key,
            payload: message
        });
    };
};

var close = function close(key, message) {
    return function (dispatch) {
        dispatch({
            type: '@@snackbar/close',
            meta: key,
            message: message
        });
    };
};

exports.open = open;
exports.close = close;