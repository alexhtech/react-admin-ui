'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Form = require('../../components/Entity/Form');

var _Form2 = _interopRequireDefault(_Form);

var _utils = require('../../utils');

var _reactRedux = require('react-redux');

var _immutable = require('redux-form/immutable');

var _utility = require('../../utils/utility');

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRouterRedux = require('react-router-redux');

var _Snackbar = require('../../actions/Snackbar');

var _actions = require('../../actions');

var _immutable2 = require('immutable');

var _immutable3 = _interopRequireDefault(_immutable2);

var _validate = require('../../validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditPage = (_dec = (0, _reactIsomorphicTools.preload)(_actions.edit), _dec2 = (0, _reactRedux.connect)(function (state, props) {
    return {
        item: state.getIn(['fetchData', props.params.name + 'Edit', 'response']).toJS()
    };
}, { push: _reactRouterRedux.push, open: _Snackbar.open, fetchToState: _reactIsomorphicTools.fetchToState, closeModal: _reactIsomorphicTools.closeModal }), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(EditPage, _React$Component);

    function EditPage(props) {
        (0, _classCallCheck3.default)(this, EditPage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditPage.__proto__ || (0, _getPrototypeOf2.default)(EditPage)).call(this, props));

        _this.getInitialValues = function () {
            var initFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.entity.actions.edit.initFields;
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.item;

            var values = {};
            for (var i in initFields) {
                if (initFields.hasOwnProperty(i)) {
                    var name = initFields[i];
                    var deepName = name.split('.');
                    values[deepName[deepName.length - 1]] = (0, _utility.showField)(name, data);
                }
            }
            return values;
        };

        _this.handleSubmit = function (form) {
            var _this$entity$actions$ = _this.entity.actions.edit,
                wrapper = _this$entity$actions$.wrapper,
                _this$entity$actions$2 = _this$entity$actions$.params,
                params = _this$entity$actions$2 === undefined ? {} : _this$entity$actions$2,
                url = _this$entity$actions$.url,
                _this$entity$actions$3 = _this$entity$actions$.method,
                method = _this$entity$actions$3 === undefined ? 'PUT' : _this$entity$actions$3;

            var _params = _immutable3.default.fromJS(wrapper ? (0, _assign2.default)(params, (0, _defineProperty3.default)({}, wrapper, form)) : (0, _assign2.default)(form, params));
            var result = _this.entity.actions.edit.result;

            if (typeof result == 'function') {
                _params = result(_params);
            }

            return (0, _reactIsomorphicTools.fetcher)(typeof url == 'function' ? url(_this.props.params, _this.props.location.query) : _this.entity.url + '/' + _this.props.params.id, {
                params: _params,
                method: method
            });
        };

        _this.handleSubmitFail = function (props, dispatch, e) {
            var error = e && e.error && e.error.message || 'Error saving';
            _this.props.open('default', error);
            throw new _immutable.SubmissionError({ error: error });
        };

        _this.entity = (0, _utils.getEntity)(props.params.name);
        _this.handleSubmitSuccessAfterHook = _this.entity.actions.edit.onSubmitSuccessAfterHook;
        _this.handleSubmitSuccessBeforeHook = _this.entity.actions.edit.onSubmitSuccessBeforeHook;
        return _this;
    }

    (0, _createClass3.default)(EditPage, [{
        key: 'handleDelete',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var _props, _fetchToState, params, location, _push, _open, _closeModal;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _props = this.props, _fetchToState = _props.fetchToState, params = _props.params, location = _props.location, _push = _props.push, _open = _props.open, _closeModal = _props.closeModal;
                                _context.next = 4;
                                return (0, _reactIsomorphicTools.fetcher)(this.entity.actions.del.url(this.props.params, this.props.location.query), {
                                    method: 'DELETE'
                                });

                            case 4:
                                _closeModal('confirmDelete');
                                _open('default', 'Successfully deleted');
                                _context.next = 8;
                                return (0, _actions.list)({ fetchToState: _fetchToState, params: params, location: location });

                            case 8:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name);
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](0);

                                this.props.open('default', 'Error deleting');

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 11]]);
            }));

            function handleDelete() {
                return _ref.apply(this, arguments);
            }

            return handleDelete;
        }()
    }, {
        key: 'handleSubmitSuccess',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(result, dispatch, props) {
                var _entity$actions$creat, redirect, _entity$id, id, _props2, fetchToState, location, params, push;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _entity$actions$creat = this.entity.actions.create.redirect, redirect = _entity$actions$creat === undefined ? 'list' : _entity$actions$creat;
                                _entity$id = this.entity.id, id = _entity$id === undefined ? 'id' : _entity$id;

                                if (!this.handleSubmitSuccessBeforeHook) {
                                    _context2.next = 5;
                                    break;
                                }

                                _context2.next = 5;
                                return this.handleSubmitSuccessBeforeHook(result, dispatch, props);

                            case 5:
                                this.props.open('default', 'Successfully saved');
                                _props2 = this.props, fetchToState = _props2.fetchToState, location = _props2.location, params = _props2.params, push = _props2.push;
                                _context2.next = 9;
                                return (0, _actions.edit)({ fetchToState: fetchToState, location: location, params: params });

                            case 9:
                                _context2.next = 11;
                                return (0, _actions.list)({ fetchToState: fetchToState, location: location, params: params });

                            case 11:
                                if (!result[id]) redirect = 'list';
                                _context2.t0 = redirect;
                                _context2.next = _context2.t0 === 'list' ? 15 : _context2.t0 === 'show' ? 17 : _context2.t0 === 'stay' ? 21 : 22;
                                break;

                            case 15:
                                push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name);
                                return _context2.abrupt('break', 22);

                            case 17:
                                _context2.next = 19;
                                return (0, _actions.show)({ fetchToState: fetchToState, location: location, params: params });

                            case 19:
                                push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name + '/show/' + result[id]);
                                return _context2.abrupt('break', 22);

                            case 21:
                                return _context2.abrupt('break', 22);

                            case 22:
                                if (!this.handleSubmitSuccessAfterHook) {
                                    _context2.next = 25;
                                    break;
                                }

                                _context2.next = 25;
                                return this.handleSubmitSuccessAfterHook(result, dispatch, props);

                            case 25:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleSubmitSuccess(_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
            }

            return handleSubmitSuccess;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _entity$actions$edit = this.entity.actions.edit,
                _entity$actions$edit$ = _entity$actions$edit.form,
                form = _entity$actions$edit$ === undefined ? this.props.params.name : _entity$actions$edit$,
                fields = _entity$actions$edit.fields,
                Component = _entity$actions$edit.component,
                fieldsValidate = _entity$actions$edit.fieldsValidate;

            return _react2.default.createElement(
                'div',
                { className: 'block' },
                Component ? _react2.default.createElement(Component, { form: form, onSubmit: this.handleSubmit,
                    onSubmitSuccess: this.handleSubmitSuccess.bind(this),
                    onSubmitFail: this.handleSubmitFail,
                    initialValues: this.getInitialValues(),
                    entity: this.entity, del: true
                }) : _react2.default.createElement(_Form2.default, {
                    form: form,
                    fields: fields,
                    onSubmit: this.handleSubmit,
                    onSubmitSuccess: this.handleSubmitSuccess.bind(this),
                    onSubmitFail: this.handleSubmitFail,
                    initialValues: this.getInitialValues(),
                    onDelete: this.handleDelete.bind(this),
                    entity: this.entity, del: true,
                    fieldsValidate: fieldsValidate,
                    validate: _validate.validate
                })
            );
        }
    }]);
    return EditPage;
}(_react2.default.Component), _class2.displayName = 'AdminEditPage', _temp)) || _class) || _class);
exports.default = EditPage;