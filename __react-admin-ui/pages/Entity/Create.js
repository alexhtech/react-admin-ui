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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('../../components/Entity/Form');

var _Form2 = _interopRequireDefault(_Form);

var _utils = require('../../utils');

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRouterRedux = require('react-router-redux');

var _reactRedux = require('react-redux');

var _immutable = require('redux-form/immutable');

var _actions = require('../../actions');

var _Snackbar = require('../../actions/Snackbar');

var _immutable2 = require('immutable');

var _immutable3 = _interopRequireDefault(_immutable2);

var _validate = require('../../validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreatePage = (_dec = (0, _reactRedux.connect)(null, { push: _reactRouterRedux.push, open: _Snackbar.open, fetchToState: _reactIsomorphicTools.fetchToState }), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(CreatePage, _React$Component);

    function CreatePage(props) {
        (0, _classCallCheck3.default)(this, CreatePage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CreatePage.__proto__ || (0, _getPrototypeOf2.default)(CreatePage)).call(this, props));

        _this.handleSubmit = function (form) {
            var _this$entity$actions$ = _this.entity.actions.create,
                wrapper = _this$entity$actions$.wrapper,
                url = _this$entity$actions$.url,
                _this$entity$actions$2 = _this$entity$actions$.params,
                params = _this$entity$actions$2 === undefined ? {} : _this$entity$actions$2,
                result = _this$entity$actions$.result;

            var _params = _immutable3.default.fromJS(wrapper ? (0, _assign2.default)(params, (0, _defineProperty3.default)({}, wrapper, form)) : (0, _assign2.default)(form, params));
            if (typeof result == 'function') {
                _params = result(_params);
            }
            return (0, _reactIsomorphicTools.fetcher)(typeof url == 'function' ? url(_this.props.params, _this.props.location.query) : _this.entity.url, {
                params: _params,
                method: 'POST'
            });
        };

        _this.handleSubmitFail = function (props, dispatch, e) {
            var error = e && e.error && e.error.message || 'Error creation';
            _this.props.open('default', error);
            throw new _immutable.SubmissionError({ error: error });
        };

        _this.entity = (0, _utils.getEntity)(props.params.name);
        _this.handleSubmitSuccessAfterHook = _this.entity.actions.create.onSubmitSuccessAfterHook;
        _this.handleSubmitSuccessBeforeHook = _this.entity.actions.create.onSubmitSuccessBeforeHook;
        return _this;
    }

    (0, _createClass3.default)(CreatePage, [{
        key: 'handleSubmitSuccess',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(result, dispatch, props) {
                var _entity$actions$creat, redirect, _entity$id, id, _props, _fetchToState, params, location, _push, _open, error;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _entity$actions$creat = this.entity.actions.create.redirect, redirect = _entity$actions$creat === undefined ? 'list' : _entity$actions$creat;
                                _entity$id = this.entity.id, id = _entity$id === undefined ? 'id' : _entity$id;

                                if (!this.handleSubmitSuccessBeforeHook) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 6;
                                return this.handleSubmitSuccessBeforeHook(result, dispatch, props);

                            case 6:
                                _props = this.props, _fetchToState = _props.fetchToState, params = _props.params, location = _props.location, _push = _props.push, _open = _props.open;

                                _open('default', 'Successfully created');
                                _context.next = 10;
                                return (0, _actions.list)({ fetchToState: _fetchToState, params: params, location: location });

                            case 10:
                                if (!result[id]) redirect = 'list';
                                _context.t0 = redirect;
                                _context.next = _context.t0 === 'list' ? 14 : _context.t0 === 'show' ? 16 : _context.t0 === 'edit' ? 18 : _context.t0 === 'create' ? 20 : 22;
                                break;

                            case 14:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name);
                                return _context.abrupt('break', 22);

                            case 16:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name + '/show/' + result[id]);
                                return _context.abrupt('break', 22);

                            case 18:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name + '/edit/' + result[id]);
                                return _context.abrupt('break', 22);

                            case 20:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name + '/create');
                                return _context.abrupt('break', 22);

                            case 22:
                                _push('/' + (0, _utils.getPrefix)() + '/' + this.props.params.name);

                                if (!this.handleSubmitSuccessAfterHook) {
                                    _context.next = 26;
                                    break;
                                }

                                _context.next = 26;
                                return this.handleSubmitSuccessAfterHook(result, dispatch, props);

                            case 26:
                                _context.next = 33;
                                break;

                            case 28:
                                _context.prev = 28;
                                _context.t1 = _context['catch'](0);
                                error = _context.t1 && _context.t1.error && _context.t1.error.message || 'Error creation';

                                this.props.open('default', error);
                                throw new _immutable.SubmissionError({ error: error });

                            case 33:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 28]]);
            }));

            function handleSubmitSuccess(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return handleSubmitSuccess;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _entity$actions$creat2 = this.entity.actions.create,
                _entity$actions$creat3 = _entity$actions$creat2.form,
                form = _entity$actions$creat3 === undefined ? this.props.params.name : _entity$actions$creat3,
                fields = _entity$actions$creat2.fields,
                Component = _entity$actions$creat2.component,
                onSubmitSuccess = _entity$actions$creat2.onSubmitSuccess,
                initialValues = _entity$actions$creat2.initialValues,
                fieldsValidate = _entity$actions$creat2.fieldsValidate,
                onSubmitFail = _entity$actions$creat2.onSubmitFail;

            return _react2.default.createElement(
                'div',
                { className: 'block' },
                Component ? _react2.default.createElement(Component, { form: form, onSubmit: this.handleSubmit,
                    onSubmitSuccess: onSubmitSuccess || this.handleSubmitSuccess.bind(this),
                    initialValues: initialValues || {}, entity: this.entity }) : _react2.default.createElement(_Form2.default, {
                    form: form,
                    fields: fields,
                    onSubmit: this.handleSubmit,
                    onSubmitSuccess: onSubmitSuccess || this.handleSubmitSuccess.bind(this),
                    onSubmitFail: onSubmitFail || this.handleSubmitFail,
                    initialValues: initialValues || {},
                    entity: this.entity,
                    label: 'Create',
                    fieldsValidate: fieldsValidate,
                    validate: _validate.validate
                })
            );
        }
    }]);
    return CreatePage;
}(_react2.default.Component)) || _class);
exports.default = CreatePage;