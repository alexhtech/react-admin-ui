'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.showField = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showField = exports.showField = function showField(itemName, data) {
    var field = itemName.split('.');
    var name = void 0;
    for (var i in field) {
        if (field.hasOwnProperty(i)) {
            if (i == 0) {
                name = data[field[i]];
            } else {
                name = name[field[i]];
            }
        }
    }
    return name;
};

var List = function (_React$Component) {
    (0, _inherits3.default)(List, _React$Component);

    function List() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, List);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = List.__proto__ || (0, _getPrototypeOf2.default)(List)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelect = function (e) {
            _this.props.handleSelect(e.target.dataset.id);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(List, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                items = _props.items,
                name = _props.name;

            return _react2.default.createElement(
                'ul',
                { hidden: this.props.hidden },
                items.map(function (item, key) {
                    if (key >= 9) return;
                    return _react2.default.createElement(
                        'li',
                        { key: key, 'data-id': item.id, onClick: _this2.handleSelect },
                        showField(name, item)
                    );
                })
            );
        }
    }]);
    return List;
}(_react2.default.Component);

exports.default = List;