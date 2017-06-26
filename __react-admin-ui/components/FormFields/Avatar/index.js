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

require('./style.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function (_React$Component) {
    (0, _inherits3.default)(Avatar, _React$Component);

    function Avatar(props) {
        (0, _classCallCheck3.default)(this, Avatar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).call(this, props));

        _this.handleClick = function (e) {
            var file = _this.refs.file;

            file.click();
        };

        _this.handleChange = function (e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    _this.setState({
                        value: {
                            path: reader.result
                        }
                    });
                    if (_this.props.input && typeof _this.props.input.onChange == 'function') {
                        _this.props.input.onChange(file);
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        _this.handleRemove = function () {
            _this.setState({
                value: null
            });
            if (_this.props.input && typeof _this.props.input.onChange == 'function') {
                _this.props.input.onChange({});
            }
        };

        _this.state = {
            value: props && props.input ? props.input.value : null
        };
        return _this;
    }

    (0, _createClass3.default)(Avatar, [{
        key: 'render',
        value: function render() {
            var value = this.state.value;

            return _react2.default.createElement(
                'div',
                { className: this.props.className || 'avatar' },
                _react2.default.createElement(
                    'div',
                    { className: 'avatar--image' },
                    _react2.default.createElement('img', { src: value && value.path ? value.path : '' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'avatar--remove' },
                        _react2.default.createElement('i', { className: 'fa fa-remove', onClick: this.handleRemove })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'avatar--download' },
                    _react2.default.createElement(
                        'i',
                        { className: 'fa fa-download', 'aria-hidden': 'true', onClick: this.handleClick },
                        ' ',
                        this.props.label || 'Load'
                    )
                ),
                _react2.default.createElement('input', { ref: 'file', type: 'file', onChange: this.handleChange, hidden: true, accept: 'image/*' })
            );
        }
    }]);
    return Avatar;
}(_react2.default.Component);

exports.default = Avatar;