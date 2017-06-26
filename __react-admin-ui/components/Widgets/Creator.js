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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Creator = function (_React$Component) {
    (0, _inherits3.default)(Creator, _React$Component);

    function Creator() {
        (0, _classCallCheck3.default)(this, Creator);
        return (0, _possibleConstructorReturn3.default)(this, (Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).apply(this, arguments));
    }

    (0, _createClass3.default)(Creator, [{
        key: 'render',
        value: function render() {
            var data = this.props.data;

            return _react2.default.createElement(
                'span',
                null,
                data.username
            );
        }
    }]);
    return Creator;
}(_react2.default.Component);

exports.default = Creator;