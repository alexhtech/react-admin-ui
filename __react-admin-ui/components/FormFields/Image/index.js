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

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function (_React$Component) {
    (0, _inherits3.default)(Image, _React$Component);

    function Image(props) {
        (0, _classCallCheck3.default)(this, Image);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).call(this, props));

        _this.state = {
            image: props.input.value
        };
        return _this;
    }

    (0, _createClass3.default)(Image, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                this.state.image && _react2.default.createElement(
                    'div',
                    { className: 'form-field--image' },
                    _react2.default.createElement('img', { src: this.state.image.path }),
                    _react2.default.createElement('i', { className: 'fa fa-times remove', onClick: function onClick() {
                            _this2.props.input.onChange('');
                            _this2.setState({
                                image: undefined
                            });
                        } })
                ),
                _react2.default.createElement(_Loader2.default, { onLoad: function onLoad(image) {
                        _this2.setState({
                            image: image
                        });
                        _this2.props.input.onChange('/api/images/' + _this2.state.image.id);
                    } })
            );
        }
    }]);
    return Image;
}(_react2.default.Component);

exports.default = Image;