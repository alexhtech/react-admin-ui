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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('redux-form/immutable');

var _reduxFormMaterialUi = require('redux-form-material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExampleItem = function (_React$Component) {
    (0, _inherits3.default)(ExampleItem, _React$Component);

    function ExampleItem() {
        (0, _classCallCheck3.default)(this, ExampleItem);
        return (0, _possibleConstructorReturn3.default)(this, (ExampleItem.__proto__ || (0, _getPrototypeOf2.default)(ExampleItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(ExampleItem, [{
        key: 'render',
        value: function render() {
            var name = this.props.input.name;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_immutable.Field, { component: _reduxFormMaterialUi.TextField, name: name + '.title' })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_immutable.Field, { component: _reduxFormMaterialUi.TextField, name: name + '.date' })
                )
            );
        }
    }]);
    return ExampleItem;
}(_react2.default.Component);

exports.default = ExampleItem;