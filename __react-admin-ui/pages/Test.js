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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = (_dec = (0, _reactIsomorphicTools.preload)(function (_ref) {
    var fetchToState = _ref.fetchToState;
    return fetchToState('/groups/1', {
        key: 'groups'
    });
}), _dec2 = (0, _reactRedux.connect)(function (state) {
    return {
        groups: state.getIn(['fetchData'])
    };
}), _dec(_class = _dec2(_class = function (_React$Component) {
    (0, _inherits3.default)(Test, _React$Component);

    function Test() {
        (0, _classCallCheck3.default)(this, Test);
        return (0, _possibleConstructorReturn3.default)(this, (Test.__proto__ || (0, _getPrototypeOf2.default)(Test)).apply(this, arguments));
    }

    (0, _createClass3.default)(Test, [{
        key: 'render',
        value: function render() {
            console.log(this.props);
            return _react2.default.createElement(
                'div',
                null,
                'Test component'
            );
        }
    }]);
    return Test;
}(_react2.default.Component)) || _class) || _class);
exports.default = Test;