'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pagination = require('../../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Table = require('material-ui/Table');

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

var _utility = require('../../../utils/utility');

var _utils = require('../../../utils');

var _chevronRight = require('material-ui/svg-icons/navigation/chevron-right');

var _chevronRight2 = _interopRequireDefault(_chevronRight);

var _edit = require('material-ui/svg-icons/image/edit');

var _edit2 = _interopRequireDefault(_edit);

var _reactRouter = require('react-router');

var _Filters = require('./Filters');

var _Filters2 = _interopRequireDefault(_Filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    float: 'right'
};

var List = (0, _reactRouter.withRouter)(_class = (0, _Pagination2.default)(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(List, _React$Component);

    function List() {
        (0, _classCallCheck3.default)(this, List);
        return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
    }

    (0, _createClass3.default)(List, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                items = _props.items,
                _props$entity = _props.entity,
                name = _props$entity.name,
                _props$entity$actions = _props$entity.actions,
                _props$entity$actions2 = _props$entity$actions.list,
                fields = _props$entity$actions2.fields,
                hasMany = _props$entity$actions2.hasMany,
                filters = _props$entity$actions2.filters,
                create = _props$entity$actions.create,
                show = _props$entity$actions.show,
                edit = _props$entity$actions.edit,
                _props$entity$id = _props$entity.id,
                id = _props$entity$id === undefined ? 'id' : _props$entity$id,
                defaultStyle = _props.defaultStyle;

            var _ref = this.props.location || defaultStyle,
                query = _ref.query;

            return _react2.default.createElement(
                'div',
                null,
                filters && _react2.default.createElement(_Filters2.default, { filters: filters }),
                _react2.default.createElement(
                    _Table.Table,
                    { selectable: false },
                    _react2.default.createElement(
                        _Table.TableHeader,
                        { adjustForCheckbox: false, displaySelectAll: false },
                        _react2.default.createElement(
                            _Table.TableRow,
                            null,
                            fields.map(function (field, key) {
                                return _react2.default.createElement(
                                    _Table.TableHeaderColumn,
                                    {
                                        style: field.style || defaultStyle,
                                        key: key
                                    },
                                    field.title || field.name || field.label
                                );
                            }),
                            function () {
                                if ((typeof hasMany === 'undefined' ? 'undefined' : (0, _typeof3.default)(hasMany)) == 'object') {
                                    return hasMany.map(function (item, index) {
                                        var entity = (0, _utils.getEntity)(item);
                                        return _react2.default.createElement(
                                            _Table.TableHeaderColumn,
                                            {
                                                key: index },
                                            entity.title || entity.name
                                        );
                                    });
                                }
                                if (typeof hasMany == 'string') {
                                    var entity = (0, _utils.getEntity)(hasMany);
                                    return _react2.default.createElement(
                                        _Table.TableHeaderColumn,
                                        null,
                                        entity.title || entity.name
                                    );
                                }
                            }(),
                            create && _react2.default.createElement(
                                _Table.TableHeaderColumn,
                                null,
                                _react2.default.createElement(
                                    _Link2.default,
                                    { to: { pathname: '/' + (0, _utils.getPrefix)() + '/' + name + '/create', query: query } },
                                    _react2.default.createElement(
                                        _FloatingActionButton2.default,
                                        { mini: true, style: style },
                                        _react2.default.createElement(_add2.default, null)
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _Table.TableBody,
                        { displayRowCheckbox: false, showRowHover: true },
                        items.map(function (item, key) {
                            return _react2.default.createElement(
                                _Table.TableRow,
                                { key: key, hoverable: true },
                                fields.map(function (field, key) {
                                    var _field = field,
                                        component = _field.component;

                                    if (typeof component == 'string') {
                                        var widget = (0, _utility.showField)(component, (0, _utils.getWidgets)());
                                        if (widget) {
                                            field = (0, _extends3.default)({}, field, { component: widget, id: '__' + item.name });
                                        }
                                    }
                                    return _react2.default.createElement(
                                        _Table.TableRowColumn,
                                        { style: field.style || {}, key: key },
                                        field.component ? _react2.default.createElement(field.component, {
                                            data: (0, _utility.showField)(field.name, item) }) : (0, _utility.showField)(field.name, item)
                                    );
                                }),
                                function () {
                                    if ((typeof hasMany === 'undefined' ? 'undefined' : (0, _typeof3.default)(hasMany)) == 'object') {
                                        return hasMany.map(function (item, index) {
                                            var entity = (0, _utils.getEntity)(item);
                                            return _react2.default.createElement(
                                                _Table.TableRowColumn,
                                                { key: index },
                                                _react2.default.createElement(
                                                    _Link2.default,
                                                    { to: {
                                                            pathname: '/' + (0, _utils.getPrefix)() + '/' + item,
                                                            query: (0, _extends3.default)({}, query, {
                                                                id: item[id],
                                                                name: _this2.props.params.name
                                                            })
                                                        } },
                                                    'List of ',
                                                    entity.title || entity.name
                                                )
                                            );
                                        });
                                    }
                                    if (typeof hasMany == 'string') {
                                        var entity = (0, _utils.getEntity)(hasMany);
                                        return _react2.default.createElement(
                                            _Table.TableRowColumn,
                                            null,
                                            _react2.default.createElement(
                                                _Link2.default,
                                                { to: {
                                                        pathname: '/' + (0, _utils.getPrefix)() + '/' + hasMany,
                                                        query: (0, _extends3.default)({}, query, {
                                                            id: item[id],
                                                            name: _this2.props.params.name
                                                        })
                                                    } },
                                                'List of ',
                                                entity.title || entity.name
                                            )
                                        );
                                    }
                                }(),
                                _react2.default.createElement(
                                    _Table.TableRowColumn,
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        { style: style },
                                        edit && show && _react2.default.createElement(
                                            _Link2.default,
                                            { to: { pathname: '/' + (0, _utils.getPrefix)() + '/' + name + '/edit/' + item[id], query: query } },
                                            _react2.default.createElement(_edit2.default, null)
                                        ),
                                        show && _react2.default.createElement(
                                            _Link2.default,
                                            { to: {
                                                    pathname: '/' + (0, _utils.getPrefix)() + '/' + name + '/show/' + item[id],
                                                    query: query
                                                } },
                                            _react2.default.createElement(_chevronRight2.default, null)
                                        )
                                    )
                                )
                            );
                        })
                    )
                ),
                items.length == 0 && _react2.default.createElement(
                    'p',
                    null,
                    'No ',
                    name,
                    ' have been found.'
                )
            );
        }
    }]);
    return List;
}(_react2.default.Component), _class2.defaultProps = {
    defaultStyle: {}
}, _temp)) || _class) || _class;

exports.default = List;