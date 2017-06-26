'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utility = require('../../../utils/utility');

var _reactRouter = require('react-router');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(_ref) {
    var item = _ref.item,
        data = _ref.data;

    return _react2.default.createElement(
        'div',
        { className: 'entity-show--field col-' + (item.column || 12) },
        _react2.default.createElement(
            'div',
            { className: 'entity-show--field-label' },
            item.title || item.name
        ),
        function () {
            if (item.component) return _react2.default.createElement(item.component, (0, _extends3.default)({ data: (0, _utility.showField)(item.name, data) }, item));
            if (item.hasOne && (0, _utility.showField)(item.name, data)) return _react2.default.createElement(
                _reactRouter.Link,
                {
                    to: '/' + (0, _utils.getPrefix)() + '/' + item.hasOne + '/show/' + (0, _utility.showField)(item.name, data) },
                'id - ',
                (0, _utility.showField)(item.name, data),
                ' ',
                item.hasOne
            );

            if (item.hasMany && (0, _utility.showField)(item.name, data).length <= 0) return _react2.default.createElement(
                'ul',
                { className: 'entity-show--field--many-items' },
                (0, _utility.showField)(item.name, data).map(function (_ref2, index) {
                    var id = _ref2.id;

                    return _react2.default.createElement(
                        'li',
                        { key: index },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            {
                                to: '/' + (0, _utils.getPrefix)() + '/' + item.hasMany + '/show/' + id },
                            'ID ',
                            id
                        )
                    );
                })
            );

            return (0, _utility.showField)(item.name, data);
        }()
    );
};

exports.default = Item;