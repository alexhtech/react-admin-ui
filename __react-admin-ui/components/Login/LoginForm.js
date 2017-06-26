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

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _immutable = require('redux-form/immutable');

var _reduxFormMaterialUi = require('redux-form-material-ui');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginForm = (_dec = (0, _immutable.reduxForm)({
    form: 'login'
}), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(LoginForm, _React$Component);

    function LoginForm() {
        (0, _classCallCheck3.default)(this, LoginForm);
        return (0, _possibleConstructorReturn3.default)(this, (LoginForm.__proto__ || (0, _getPrototypeOf2.default)(LoginForm)).apply(this, arguments));
    }

    (0, _createClass3.default)(LoginForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                handleSubmit = _props.handleSubmit,
                submitting = _props.submitting,
                pristine = _props.pristine;

            var style = {
                width: '100%'
            };

            return _react2.default.createElement(
                'div',
                { className: 'login-form' },
                _react2.default.createElement(
                    _Paper2.default,
                    { zDepth: 2 },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: handleSubmit },
                        _react2.default.createElement(
                            'div',
                            { style: { padding: '10px' } },
                            _react2.default.createElement(_immutable.Field, { component: _reduxFormMaterialUi.TextField, name: '_username', floatingLabelText: 'Login', style: style }),
                            _react2.default.createElement(_immutable.Field, { component: _reduxFormMaterialUi.TextField, name: '_password', type: 'password', floatingLabelText: 'Password', style: style })
                        ),
                        _react2.default.createElement(_RaisedButton2.default, { disabled: submitting || pristine, label: 'Sign In', type: 'submit', style: style })
                    )
                )
            );
        }
    }]);
    return LoginForm;
}(_react2.default.Component)) || _class);
exports.default = LoginForm;