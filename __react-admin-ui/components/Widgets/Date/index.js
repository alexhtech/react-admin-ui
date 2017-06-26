'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var data = _ref.data;
    return _react2.default.createElement(
        'div',
        null,
        (0, _moment2.default)(data).format('MMMM Do YYYY, H:mm:ss')
    );
};