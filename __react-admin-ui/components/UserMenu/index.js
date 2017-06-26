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

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserMenu = function (_React$Component) {
    (0, _inherits3.default)(UserMenu, _React$Component);

    function UserMenu(props) {
        (0, _classCallCheck3.default)(this, UserMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserMenu.__proto__ || (0, _getPrototypeOf2.default)(UserMenu)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(UserMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                user = _props.user,
                logout = _props.logout,
                handleShow = _props.handleShow,
                handleClose = _props.handleClose,
                open = _props.open;


            var close = function close() {
                handleClose('userMenu');
            };
            var show = function show(e) {
                _this2.setState({ anchorEl: e.currentTarget });
                handleShow('userMenu');
            };
            return _react2.default.createElement(
                'div',
                { className: 'user-menu' },
                _react2.default.createElement(
                    'a',
                    { onClick: show },
                    _react2.default.createElement(_person2.default, null),
                    ' ',
                    user.get('username') || user.get('email')
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: close
                    },
                    _react2.default.createElement(
                        _Menu2.default,
                        { onItemTouchTap: close },
                        _react2.default.createElement(_MenuItem2.default, { primaryText: 'Sign out', onClick: logout })
                    )
                )
            );
        }
    }]);
    return UserMenu;
}(_react2.default.Component);

exports.default = UserMenu;