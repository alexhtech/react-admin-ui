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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIsomorphicTools = require('react-isomorphic-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = (_temp2 = _class = function (_React$Component) {
    (0, _inherits3.default)(Loader, _React$Component);

    function Loader() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Loader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Loader.__proto__ || (0, _getPrototypeOf2.default)(Loader)).call.apply(_ref, [this].concat(args))), _this), _this.load = function (e) {
            if (!e.target.value) return false;
            for (var file in e.target.files) {
                if (e.target.files.hasOwnProperty(file)) {
                    var body = new FormData();
                    body.append('file', e.target.files[file]);
                    (0, _reactIsomorphicTools.fetcher)('/_uploader/' + _this.props.album + '/upload', {
                        method: 'POST',
                        type: 'form-data',
                        params: body
                    }).then(function (response) {
                        _this.props.onLoad(response);
                    });
                }
            }
            _this.refs.files.value = '';
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Loader, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { type: 'file', ref: 'files', onChange: this.load, multiple: this.props.multiple ? 'multiple' : false })
            );
        }
    }]);
    return Loader;
}(_react2.default.Component), _class.defaultProps = {
    album: 'gallery'
}, _temp2);
exports.default = Loader;