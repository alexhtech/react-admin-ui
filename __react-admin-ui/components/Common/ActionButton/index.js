'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionButton = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(ActionButton, _React$Component);

    function ActionButton() {
        (0, _classCallCheck3.default)(this, ActionButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ActionButton.__proto__ || (0, _getPrototypeOf2.default)(ActionButton)).call(this));

        _this.mount = true;

        _this.componentWillUnmount = function () {
            _this.mount = false;
        };

        _this.state = {
            loading: false
        };
        return _this;
    }

    (0, _createClass3.default)(ActionButton, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                action = _props.action,
                onSuccess = _props.onSuccess,
                onError = _props.onError,
                Component = _props.component,
                props = (0, _objectWithoutProperties3.default)(_props, ['className', 'action', 'onSuccess', 'onError', 'component']);

            return _react2.default.createElement(
                'span',
                null,
                !this.state.loading ? _react2.default.createElement(
                    Component,
                    (0, _extends3.default)({ type: 'button', className: className, onClick: function () {
                            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
                                var response;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.prev = 0;

                                                _this2.setState({
                                                    loading: true
                                                });
                                                _context.next = 4;
                                                return action(e);

                                            case 4:
                                                response = _context.sent;

                                                if (typeof onSuccess == 'function') {
                                                    onSuccess(response);
                                                }
                                                if (_this2.mount) {
                                                    _this2.setState({
                                                        loading: false
                                                    });
                                                }
                                                _context.next = 13;
                                                break;

                                            case 9:
                                                _context.prev = 9;
                                                _context.t0 = _context['catch'](0);

                                                if (_this2.mount) {
                                                    _this2.setState({
                                                        loading: false,
                                                        e: _context.t0
                                                    });
                                                }
                                                if (typeof onError == 'function') {
                                                    onError(_context.t0);
                                                }

                                            case 13:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this2, [[0, 9]]);
                            }));

                            return function (_x) {
                                return _ref.apply(this, arguments);
                            };
                        }() }, props),
                    this.props.children
                ) : _react2.default.createElement(
                    'div',
                    { className: 'loader-wrap' },
                    _react2.default.createElement('div', { className: 'loader' })
                )
            );
        }
    }]);
    return ActionButton;
}(_react2.default.Component), _class.propTypes = {
    action: _propTypes2.default.func.isRequired,
    component: _propTypes2.default.func.isRequired
}, _temp);
exports.default = ActionButton;