'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utility = require('../../../utils/utility');

var _utils = require('../../../utils');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fields = function Fields(_ref) {
    var fields = _ref.fields,
        data = _ref.data;
    return _react2.default.createElement(
        'div',
        { className: 'row' },
        fields.map(function (item, key) {
            var _item = item,
                component = _item.component;

            if (typeof component == 'string') {
                var widget = (0, _utility.showField)(component, (0, _utils.getWidgets)());
                if (widget) {
                    item = (0, _extends3.default)({}, item, { component: widget, id: '__' + item.name });
                }
            }
            return _react2.default.createElement(_Item2.default, {
                key: key,
                item: item,
                data: data
            });
        })
    );
};

exports.default = Fields;