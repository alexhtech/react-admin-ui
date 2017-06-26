'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRedux = require('react-redux');

var _utils = require('../../utils');

var _Show = require('../../components/Entity/Show');

var _Show2 = _interopRequireDefault(_Show);

var _actions = require('../../actions');

var _reactRouterRedux = require('react-router-redux');

var _Snackbar = require('../../actions/Snackbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowPage = (_dec = (0, _reactIsomorphicTools.preload)(_actions.show), _dec2 = (0, _reactRedux.connect)(function (state, props) {
    return {
        item: state.getIn(['fetchData', props.params.name + 'Show', 'response'])
    };
}, { fetchToState: _reactIsomorphicTools.fetchToState, closeModal: _reactIsomorphicTools.closeModal, push: _reactRouterRedux.push, open: _Snackbar.open }), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(ShowPage, _React$Component);

    function ShowPage() {
        (0, _classCallCheck3.default)(this, ShowPage);
        return (0, _possibleConstructorReturn3.default)(this, (ShowPage.__proto__ || (0, _getPrototypeOf2.default)(ShowPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(ShowPage, [{
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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'block' },
                _react2.default.createElement(_Show2.default, {
                    data: this.props.item.toJS(),
                    entity: (0, _utils.getEntity)(this.props.params.name),
                    onDelete: this.handleDelete.bind(this)
                })
            );
        }
    }]);
    return ShowPage;
}(_react2.default.Component), _class2.displayName = 'AdminShowPage', _temp)) || _class) || _class);
exports.default = ShowPage;