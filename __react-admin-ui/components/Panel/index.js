'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _utils = require('../../utils');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DrawlerContainerStyle = {
    top: '64px'
};

var Panel = function (_React$Component) {
    (0, _inherits3.default)(Panel, _React$Component);

    function Panel() {
        (0, _classCallCheck3.default)(this, Panel);
        return (0, _possibleConstructorReturn3.default)(this, (Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).apply(this, arguments));
    }

    (0, _createClass3.default)(Panel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                _this2.props.handleShow('panel');
            }, 100);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.handleClose('panel');
        }
    }, {
        key: 'render',
        value: function render() {
            var open = this.props.open;

            var entities = (0, _utils.getEntities)();
            return _react2.default.createElement(
                _Drawer2.default,
                { open: open == true, containerStyle: DrawlerContainerStyle, containerClassName: 'panel__left' },
                (0, _values2.default)(entities).filter(function (item) {
                    return !item.hidden;
                }).map(function (item, index) {
                    return _react2.default.createElement(
                        _reactRouter.Link,
                        { key: index, to: '/' + (0, _utils.getPrefix)() + '/' + item.name },
                        _react2.default.createElement(
                            _MenuItem2.default,
                            null,
                            item.title || item.name
                        )
                    );
                })
            );
        }
    }]);
    return Panel;
}(_react2.default.Component);

exports.default = Panel;