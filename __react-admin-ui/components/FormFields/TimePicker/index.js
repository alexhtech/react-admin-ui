'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxFormMaterialUi = require('redux-form-material-ui');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var input = _ref.input,
        props = (0, _objectWithoutProperties3.default)(_ref, ['input']);

    props.input = (0, _extends3.default)({}, input, { value: (0, _moment2.default)(input.value).toDate() });
    return _react2.default.createElement(_reduxFormMaterialUi.TimePicker, props);
};