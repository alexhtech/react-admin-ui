'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

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

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component) {
    var _dec, _class;

    return _dec = (0, _reactRedux.connect)(function (state) {
        return {
            location: state.getIn(['routing', 'locationBeforeTransitions'])
        };
    }), _dec(_class = function (_React$Component) {
        (0, _inherits3.default)(Pagination, _React$Component);

        function Pagination() {
            (0, _classCallCheck3.default)(this, Pagination);
            return (0, _possibleConstructorReturn3.default)(this, (Pagination.__proto__ || (0, _getPrototypeOf2.default)(Pagination)).apply(this, arguments));
        }

        (0, _createClass3.default)(Pagination, [{
            key: 'render',
            value: function render() {
                var pagination = this.props.entity.pagination;

                var itemsPerPage = pagination && pagination.itemsPerPage ? pagination.itemsPerPage : 10;
                var visible = pagination && pagination.visible ? pagination.visible : 4;
                var disable = pagination && pagination.disable;

                if (disable) return _react2.default.createElement(Component, this.props);

                var name = this.props.name || 'page';
                var location = this.props.location || {};
                var _props$data = this.props.data,
                    _props$data$request$p = _props$data.request.params[name],
                    currentPage = _props$data$request$p === undefined ? 1 : _props$data$request$p,
                    response = _props$data.response;


                var totalItems = response.totalItemCount || response.totalItems || response.total;

                var query = location.query;

                var countPages = Math.ceil(totalItems / itemsPerPage);
                var pages = [];

                for (var i = 1; i <= countPages; i++) {
                    if (i >= currentPage - 1 && pages.length < visible) {
                        pages.push(_react2.default.createElement(
                            _reactRouter.Link,
                            { to: { pathname: location.pathname, query: (0, _extends6.default)({}, query, (0, _defineProperty3.default)({}, name, i)) }, key: i },
                            _react2.default.createElement(
                                'p',
                                { className: i == currentPage && 'active' },
                                i
                            )
                        ));
                    }
                }

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(Component, this.props),
                    _react2.default.createElement(
                        'div',
                        { className: 'paginator' },
                        countPages && currentPage != 1 && _react2.default.createElement(
                            _reactRouter.Link,
                            { to: {
                                    pathname: location.pathname, query: (0, _extends6.default)({}, query, (0, _defineProperty3.default)({}, name, currentPage - 1 == 0 ? 1 : currentPage - 1))
                                }, className: 'paginator__arrows' },
                            _react2.default.createElement('i', { className: 'fa fa-angle-double-left' })
                        ),
                        pages,
                        countPages != currentPage && _react2.default.createElement(
                            _reactRouter.Link,
                            { to: { pathname: location.pathname, query: (0, _extends6.default)({}, query, (0, _defineProperty3.default)({}, name, currentPage - 1 + 2)) },
                                className: 'paginator__arrows' },
                            _react2.default.createElement('i', { className: 'fa fa-angle-double-right' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        'Total items: ',
                        totalItems || 0
                    )
                );
            }
        }]);
        return Pagination;
    }(_react2.default.Component)) || _class;
};