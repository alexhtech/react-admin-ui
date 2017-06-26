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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utility = require('../../../utils/utility');

var _utils = require('../../../utils');

var _materialUi = require('material-ui');

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

var _HasMany = require('./HasMany');

var _HasMany2 = _interopRequireDefault(_HasMany);

var _withRouter = require('react-router/lib/withRouter');

var _withRouter2 = _interopRequireDefault(_withRouter);

var _reactRedux = require('react-redux');

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _Delete = require('./Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _Wrapper = require('../Form/Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Show = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        confirmDelete: state.getIn(['modals', 'confirmDelete']) || false
    };
}, { openModal: _reactIsomorphicTools.openModal, closeModal: _reactIsomorphicTools.closeModal }), _dec(_class = (0, _withRouter2.default)(_class = function (_React$Component) {
    (0, _inherits3.default)(Show, _React$Component);

    function Show() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Show);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Show.__proto__ || (0, _getPrototypeOf2.default)(Show)).call.apply(_ref, [this].concat(args))), _this), _this.toggleConfirmDelete = function () {
            var _this$props = _this.props,
                confirmDelete = _this$props.confirmDelete,
                openModal = _this$props.openModal,
                closeModal = _this$props.closeModal;


            if (confirmDelete) {
                closeModal('confirmDelete');
            } else {
                openModal('confirmDelete');
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Show, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                _props$entity$actions = _props.entity.actions,
                _props$entity$actions2 = _props$entity$actions.show,
                fields = _props$entity$actions2.fields,
                hasMany = _props$entity$actions2.hasMany,
                edit = _props$entity$actions.edit,
                del = _props$entity$actions.del,
                query = _props.location.query,
                _props$params = _props.params,
                name = _props$params.name,
                id = _props$params.id;


            var tabs = (0, _utility.groupFields)(fields);

            return _react2.default.createElement(
                'div',
                { className: 'entity-show--fields' },
                _react2.default.createElement(
                    _Wrapper2.default,
                    null,
                    tabs.length > 1 ? _react2.default.createElement(
                        _materialUi.Tabs,
                        null,
                        tabs.map(function (item, index) {
                            return _react2.default.createElement(
                                _materialUi.Tab,
                                { label: item.name || 'noName', key: index },
                                _react2.default.createElement(_Fields2.default, { data: data, fields: item.fields })
                            );
                        })
                    ) : _react2.default.createElement(_Fields2.default, { data: data, fields: tabs[0].fields }),
                    _react2.default.createElement(_HasMany2.default, { hasMany: hasMany })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            _Wrapper2.default,
                            { className: 'controls' },
                            del && _react2.default.createElement(_Delete2.default, {
                                toggleConfirmDelete: this.toggleConfirmDelete,
                                confirmDelete: this.props.confirmDelete,
                                onDelete: this.props.onDelete
                            }),
                            edit && _react2.default.createElement(_materialUi.RaisedButton, {
                                label: 'Edit',
                                type: 'submit',
                                primary: true,
                                containerElement: _react2.default.createElement(_Link2.default, { to: { pathname: '/' + (0, _utils.getPrefix)() + '/' + name + '/edit/' + id, query: query } })
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Show;
}(_react2.default.Component)) || _class) || _class);
exports.default = Show;