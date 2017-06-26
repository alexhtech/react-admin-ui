'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _Actions = require('./Actions');

var _Actions2 = _interopRequireDefault(_Actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasMany = function (_React$Component) {
    (0, _inherits3.default)(HasMany, _React$Component);

    function HasMany() {
        (0, _classCallCheck3.default)(this, HasMany);
        return (0, _possibleConstructorReturn3.default)(this, (HasMany.__proto__ || (0, _getPrototypeOf2.default)(HasMany)).apply(this, arguments));
    }

    (0, _createClass3.default)(HasMany, [{
        key: 'render',
        value: function render() {
            var hasMany = this.props.hasMany;

            return _react2.default.createElement(
                'div',
                null,
                function () {
                    if ((typeof hasMany === 'undefined' ? 'undefined' : (0, _typeof3.default)(hasMany)) == 'object') {
                        return hasMany.map(function (item, index) {
                            return _react2.default.createElement(_Actions2.default, { name: item, key: index });
                        });
                    }
                    if (typeof hasMany == 'string') {
                        return _react2.default.createElement(_Actions2.default, { name: hasMany });
                    }
                    return null;
                }()
            );
        }
    }]);
    return HasMany;
}(_react2.default.Component);

exports.default = HasMany;