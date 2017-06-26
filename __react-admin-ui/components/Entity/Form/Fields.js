'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('redux-form/immutable');

var _utils = require('../../../utils');

var _utility = require('../../../utils/utility');

var _Wrapper = require('./Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var fields = _ref.fields;
    return _react2.default.createElement(
        _Wrapper2.default,
        { className: 'row' },
        fields.map(function (_ref2, key) {
            var _ref2$fieldType = _ref2.fieldType,
                fieldType = _ref2$fieldType === undefined ? 'field' : _ref2$fieldType,
                _ref2$column = _ref2.column,
                column = _ref2$column === undefined ? 12 : _ref2$column,
                item = (0, _objectWithoutProperties3.default)(_ref2, ['fieldType', 'column']);
            var _item = item,
                _item$component = _item.component,
                component = _item$component === undefined ? 'material.TextField' : _item$component;

            if (typeof component == 'string') {
                var widget = (0, _utility.showField)(component, (0, _utils.getFormFields)());
                if (widget) {
                    item = (0, _extends3.default)({}, item, { component: widget, id: '__' + item.name });
                }
            }
            return _react2.default.createElement(
                'div',
                { className: 'entity-form--field col-' + column, key: key },
                _react2.default.createElement(
                    'div',
                    { className: 'label' },
                    item.title
                ),
                fieldType == 'field' && _react2.default.createElement(
                    'div',
                    { className: 'field' },
                    _react2.default.createElement(_immutable.Field, (0, _extends3.default)({}, item, { id: '__' + item.name }))
                ),
                fieldType == 'array' && _react2.default.createElement(
                    'div',
                    { className: 'field' },
                    _react2.default.createElement(_immutable.FieldArray, (0, _extends3.default)({}, item, { id: '__' + item.name }))
                )
            );
        })
    );
};