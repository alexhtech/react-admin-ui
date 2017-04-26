"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _immutable2.default.Map({});
    var action = arguments[1];

    switch (action.type) {

        case "@@snackbar/open":
            return state.set(action.meta, { open: true, message: action.payload });

        case "@@snackbar/close":
            return state.set(action.meta, { open: false, message: action.payload });
        default:
            return state;
    }
};