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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _dec, _class;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    position: absolute;\n    left: ', ';\n    top: 45px;\n    transition: 450ms;\n    padding: 20px;\n    width: calc(100% - ', ')\n'], ['\n    position: absolute;\n    left: ', ';\n    top: 45px;\n    transition: 450ms;\n    padding: 20px;\n    width: calc(100% - ', ')\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBreadcrumbs = require('react-breadcrumbs');

var _reactBreadcrumbs2 = _interopRequireDefault(_reactBreadcrumbs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require('react-router');

var _Snackbar = require('../../components/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Panel = require('../../components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadcrumbsWrapper = _styledComponents2.default.div(_templateObject, function (props) {
    return props.panel ? '256px' : 0;
}, function (props) {
    return props.panel ? '296px' : '40px';
});

_moment2.default.locale('en');

Date.toString = function () {
    return (0, _moment2.default)(this).utc().format();
};

var Entity = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        panel: state.getIn(['modals', 'panel'])
    };
}, { openModal: _reactIsomorphicTools.openModal, closeModal: _reactIsomorphicTools.closeModal }), _dec(_class = (0, _reactRouter.withRouter)(_class = function (_React$Component) {
    (0, _inherits3.default)(Entity, _React$Component);

    function Entity() {
        (0, _classCallCheck3.default)(this, Entity);
        return (0, _possibleConstructorReturn3.default)(this, (Entity.__proto__ || (0, _getPrototypeOf2.default)(Entity)).apply(this, arguments));
    }

    (0, _createClass3.default)(Entity, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                panel = _props.panel,
                routes = _props.routes,
                params = _props.params;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'body' },
                    _react2.default.createElement(_Panel2.default, {
                        open: panel,
                        handleShow: this.props.openModal,
                        handleClose: this.props.closeModal
                    }),
                    _react2.default.createElement(
                        BreadcrumbsWrapper,
                        { panel: panel },
                        _react2.default.createElement(_reactBreadcrumbs2.default, { routes: routes, params: params }),
                        this.props.children
                    )
                ),
                _react2.default.createElement(_Snackbar2.default, null)
            );
        }
    }]);
    return Entity;
}(_react2.default.Component)) || _class) || _class);
exports.default = Entity;