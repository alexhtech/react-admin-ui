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

var _reduxForm = require('redux-form');

var _Location = require('../Location');

var _Location2 = _interopRequireDefault(_Location);

require('./style.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Locations = function (_React$Component) {
    (0, _inherits3.default)(Locations, _React$Component);

    function Locations() {
        (0, _classCallCheck3.default)(this, Locations);
        return (0, _possibleConstructorReturn3.default)(this, (Locations.__proto__ || (0, _getPrototypeOf2.default)(Locations)).apply(this, arguments));
    }

    (0, _createClass3.default)(Locations, [{
        key: 'render',
        value: function render() {
            var fields = this.props.fields;

            return _react2.default.createElement(
                'ul',
                { className: 'form-field--locations' },
                fields.map(function (item, key) {
                    return _react2.default.createElement(
                        'li',
                        { key: key },
                        _react2.default.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                        _react2.default.createElement(_reduxForm.Field, { component: _Location2.default, name: item, _key: key }),
                        _react2.default.createElement('i', { className: 'fa fa-times', 'aria-hidden': 'true', onClick: function onClick() {
                                return fields.remove(key);
                            } })
                    );
                }),
                _react2.default.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true', onClick: function onClick() {
                        return fields.push({});
                    } })
            );
        }
    }]);
    return Locations;
}(_react2.default.Component);

exports.default = Locations;