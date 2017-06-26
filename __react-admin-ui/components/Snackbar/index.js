'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        snackbar: state.get('snackbar').findEntry(function (value) {
            return value.open == true;
        }) || ['key', { open: false, message: '' }]
    };
}, {
    close: function close(key, message) {
        return function (dispatch) {
            dispatch({
                type: '@@snackbar/close',
                meta: key,
                message: message
            });
        };
    }
}), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(index, _React$Component);

    function index() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = index.__proto__ || (0, _getPrototypeOf2.default)(index)).call.apply(_ref, [this].concat(args))), _this), _this.handleRequestClose = function () {
            var _this$props$snackbar = (0, _slicedToArray3.default)(_this.props.snackbar, 2),
                key = _this$props$snackbar[0],
                obj = _this$props$snackbar[1];

            _this.props.close(key, obj.message);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(index, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Snackbar2.default, {
                    open: this.props.snackbar[1].open,
                    message: this.props.snackbar[1].message,
                    autoHideDuration: 3000,
                    onRequestClose: this.handleRequestClose
                })
            );
        }
    }]);
    return index;
}(_react2.default.Component)) || _class);
exports.default = index;