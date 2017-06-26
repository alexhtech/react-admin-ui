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

var _dec, _dec2, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('redux-form/immutable');

var _utils = require('../../../utils');

var _utility = require('../../../utils/utility');

var _materialUi = require('material-ui');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _ActionButton = require('../../Common/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _reactRedux = require('react-redux');

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _withRouter = require('react-router/lib/withRouter');

var _withRouter2 = _interopRequireDefault(_withRouter);

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _Wrapper = require('./Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityForm = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        'confirmDelete': state.getIn(['modals', 'confirmDelete']) || false
    };
}, { openModal: _reactIsomorphicTools.openModal, closeModal: _reactIsomorphicTools.closeModal }), _dec2 = (0, _immutable.reduxForm)(), (0, _withRouter2.default)(_class = _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(EntityForm, _React$Component);

    function EntityForm() {
        (0, _classCallCheck3.default)(this, EntityForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EntityForm.__proto__ || (0, _getPrototypeOf2.default)(EntityForm)).call(this));

        _this.tabsStyle = {
            margin: '-15px'
        };
        return _this;
    }

    (0, _createClass3.default)(EntityForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                handleSubmit = _props.handleSubmit,
                submitting = _props.submitting,
                fields = _props.fields,
                del = _props.entity.actions.del;

            var tabs = (0, _utility.groupFields)(fields);
            return _react2.default.createElement(
                'form',
                { onSubmit: handleSubmit },
                tabs.length > 1 ? _react2.default.createElement(
                    _materialUi.Tabs,
                    null,
                    tabs.map(function (item, index) {
                        return _react2.default.createElement(
                            _materialUi.Tab,
                            { label: item.name || 'noName', key: index },
                            _react2.default.createElement(_Fields2.default, { fields: item.fields })
                        );
                    })
                ) : _react2.default.createElement(_Fields2.default, { fields: tabs[0].fields }),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            _Wrapper2.default,
                            { className: 'controls' },
                            this.props.del && del && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_materialUi.RaisedButton, { label: 'Delete', onClick: function onClick() {
                                        return _this2.props.openModal('confirmDelete');
                                    } }),
                                _react2.default.createElement(
                                    _Dialog2.default,
                                    { open: this.props.confirmDelete, actions: _react2.default.createElement(
                                            'div',
                                            { className: 'controls' },
                                            _react2.default.createElement(_materialUi.RaisedButton, { label: 'Cancel',
                                                onClick: function onClick() {
                                                    return _this2.props.closeModal('confirmDelete');
                                                } }),
                                            _react2.default.createElement(_ActionButton2.default, { component: _materialUi.RaisedButton, label: 'Delete',
                                                action: this.props.onDelete,
                                                primary: true })
                                        ) },
                                    'Are you sure to delete?'
                                )
                            ),
                            this.props.params.id && _react2.default.createElement(_materialUi.RaisedButton, { label: 'Show', type: 'submit', primary: false, containerElement: _react2.default.createElement(_Link2.default, { to: {
                                        pathname: '/' + (0, _utils.getPrefix)() + '/' + this.props.params.name + '/show/' + this.props.params.id,
                                        query: this.props.location.query
                                    }
                                }) }),
                            _react2.default.createElement(_materialUi.RaisedButton, { label: this.props.label, type: 'submit', primary: true, disabled: submitting })
                        )
                    )
                )
            );
        }
    }]);
    return EntityForm;
}(_react2.default.Component), _class2.defaultProps = {
    del: false,
    label: 'Save'
}, _temp)) || _class) || _class) || _class);
exports.default = EntityForm;