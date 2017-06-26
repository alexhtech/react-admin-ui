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

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _reactRedux = require('react-redux');

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _Security = require('../../actions/Security');

var _UserMenu = require('../UserMenu');

var _UserMenu2 = _interopRequireDefault(_UserMenu);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        modals: state.getIn(['modals']).toJS(),
        user: state.getIn(['authentication', 'user'])
    };
}, {
    openModal: _reactIsomorphicTools.openModal, closeModal: _reactIsomorphicTools.closeModal, logout: _Security.logout
}), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header() {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
    }

    (0, _createClass3.default)(Header, [{
        key: 'render',
        value: function render() {
            var _props$modals = this.props.modals,
                userMenu = _props$modals.userMenu,
                panel = _props$modals.panel;
            var user = this.props.user;
            var _props = this.props,
                openModal = _props.openModal,
                closeModal = _props.closeModal,
                logout = _props.logout;

            var togglePanel = function togglePanel() {
                !panel ? openModal('panel') : closeModal('panel');
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_AppBar2.default, {
                    title: (0, _utils.getHeader)(),
                    onLeftIconButtonTouchTap: togglePanel,
                    iconElementRight: user ? _react2.default.createElement(_UserMenu2.default, { handleShow: openModal, handleClose: closeModal, logout: logout, user: user,
                        open: userMenu }) : null,
                    style: { position: 'fixed' }
                })
            );
        }
    }]);
    return Header;
}(_react2.default.Component)) || _class);
exports.default = Header;