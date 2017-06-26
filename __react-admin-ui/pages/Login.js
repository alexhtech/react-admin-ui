'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoginForm = require('../components/Login/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _reactRedux = require('react-redux');

var _Security = require('../actions/Security');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = (_dec = (0, _reactRedux.connect)(null, { login: _Security.login, push: _reactRouterRedux.push }), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(Login, _React$Component);

    function Login() {
        (0, _classCallCheck3.default)(this, Login);
        return (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).apply(this, arguments));
    }

    (0, _createClass3.default)(Login, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                login = _props.login,
                push = _props.push;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_LoginForm2.default, { onSubmit: login, onSubmitSuccess: function onSubmitSuccess() {
                        return push('/admin');
                    } })
            );
        }
    }]);
    return Login;
}(_react2.default.Component)) || _class);
exports.default = Login;