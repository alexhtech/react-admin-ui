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

var _withRouter = require('react-router/lib/withRouter');

var _withRouter2 = _interopRequireDefault(_withRouter);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _list = require('material-ui/svg-icons/action/list');

var _list2 = _interopRequireDefault(_list);

var _utils = require('../../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = (_dec = (0, _reactRedux.connect)(null, {
    push: _reactRouterRedux.push
}), _dec(_class = (0, _withRouter2.default)(_class = function (_React$Component) {
    (0, _inherits3.default)(Actions, _React$Component);

    function Actions() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Actions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Actions.__proto__ || (0, _getPrototypeOf2.default)(Actions)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouchTapAdd = function () {
            _this.props.push({ pathname: '/' + (0, _utils.getPrefix)() + '/' + _this.props.name + '/create', query: _this.props.params });
        }, _this.handleTouchTapList = function () {
            _this.props.push({ pathname: '/' + (0, _utils.getPrefix)() + '/' + _this.props.name, query: _this.props.params });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Actions, [{
        key: 'render',
        value: function render() {
            var _getEntity = (0, _utils.getEntity)(this.props.name),
                _getEntity$actions = _getEntity.actions,
                create = _getEntity$actions.create,
                list = _getEntity$actions.list,
                name = _getEntity.name,
                label = _getEntity.label;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Relation for ',
                    label || name,
                    list && _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: 'List of ' + (label || name) },
                        _react2.default.createElement(_list2.default, { hoverColor: 'green', onTouchTap: this.handleTouchTapList })
                    ),
                    create && _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: 'Create the ' + (label || name) },
                        _react2.default.createElement(_noteAdd2.default, { hoverColor: 'green', onTouchTap: this.handleTouchTapAdd })
                    )
                )
            );
        }
    }]);
    return Actions;
}(_react2.default.Component)) || _class) || _class);
exports.default = Actions;