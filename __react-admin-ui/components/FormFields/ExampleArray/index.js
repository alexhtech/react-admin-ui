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

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _immutable2 = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tickets = function (_React$Component) {
    (0, _inherits3.default)(Tickets, _React$Component);

    function Tickets() {
        (0, _classCallCheck3.default)(this, Tickets);
        return (0, _possibleConstructorReturn3.default)(this, (Tickets.__proto__ || (0, _getPrototypeOf2.default)(Tickets)).apply(this, arguments));
    }

    (0, _createClass3.default)(Tickets, [{
        key: 'render',
        value: function render() {
            var fields = this.props.fields;

            return _react2.default.createElement(
                'ul',
                null,
                fields.map(function (item, key) {
                    return _react2.default.createElement(
                        'li',
                        { key: key },
                        _react2.default.createElement(_immutable.Field, { component: _Item2.default, name: item }),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', onClick: function onClick() {
                                    return fields.remove(key);
                                } },
                            'del'
                        )
                    );
                }),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: function onClick() {
                            return fields.push((0, _immutable2.Map)({
                                title: '',
                                date: ''
                            }));
                        } },
                    'add'
                )
            );
        }
    }]);
    return Tickets;
}(_react2.default.Component);

exports.default = Tickets;