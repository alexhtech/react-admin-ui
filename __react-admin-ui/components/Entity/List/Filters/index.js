'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _materialUi = require('material-ui');

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _isJson = require('is-json');

var _isJson2 = _interopRequireDefault(_isJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = (0, _reactRouter.withRouter)(_class = function (_React$Component) {
    (0, _inherits3.default)(index, _React$Component);

    function index() {
        (0, _classCallCheck3.default)(this, index);
        return (0, _possibleConstructorReturn3.default)(this, (index.__proto__ || (0, _getPrototypeOf2.default)(index)).apply(this, arguments));
    }

    (0, _createClass3.default)(index, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                filters = _props.filters,
                query = _props.location.query;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Form2.default, { filters: filters, onSubmit: function () {
                        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(form, dispatch) {
                            var filters;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            filters = form.filter(function (item) {
                                                return item != '';
                                            });


                                            dispatch((0, _reactRouterRedux.push)((0, _extends3.default)({}, _this2.props.location, {
                                                query: {
                                                    filters: filters.size != 0 ? (0, _stringify2.default)(filters) : undefined
                                                }
                                            })));

                                        case 2:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this2);
                        }));

                        return function (_x, _x2) {
                            return _ref.apply(this, arguments);
                        };
                    }(),
                    form: 'reactAdminFilters',
                    initialValues: query && query.filters && (0, _isJson2.default)(query.filters) ? JSON.parse(query.filters) : undefined
                }),
                _react2.default.createElement(_materialUi.Divider, null)
            );
        }
    }]);
    return index;
}(_react2.default.Component)) || _class;

exports.default = index;