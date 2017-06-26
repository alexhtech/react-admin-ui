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

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRedux = require('react-redux');

var _List = require('../../components/Entity/List');

var _List2 = _interopRequireDefault(_List);

var _utils = require('../../utils');

var _actions = require('../../actions');

var _reselect = require('reselect');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getList = function getList(state, props) {
    return state.getIn(['fetchData', props.params.name + 'List']) || _immutable2.default.Map({});
};

var getListSelector = (0, _reselect.createSelector)(getList, function (data) {
    return data.toJS();
});

var getResponse = function getResponse(state, props) {
    return state.getIn(['fetchData', props.params.name + 'List', 'response']) || _immutable2.default.List([]);
};

var getItemsSelector = (0, _reselect.createSelector)(getResponse, function (response) {
    var data = response.toJS();
    return data.items || data.Items || data.data;
});

var ListPage = (_dec = (0, _reactIsomorphicTools.preload)(_actions.list), _dec2 = (0, _reactRedux.connect)(function (state, props) {
    return {
        list: getListSelector(state, props),
        items: getItemsSelector(state, props)
    };
}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    (0, _inherits3.default)(ListPage, _React$Component);

    function ListPage() {
        (0, _classCallCheck3.default)(this, ListPage);
        return (0, _possibleConstructorReturn3.default)(this, (ListPage.__proto__ || (0, _getPrototypeOf2.default)(ListPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(ListPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'block' },
                _react2.default.createElement(_List2.default, {
                    data: this.props.list,
                    items: this.props.items,
                    entity: (0, _utils.getEntity)(this.props.params.name)
                })
            );
        }
    }]);
    return ListPage;
}(_react2.default.Component), _class2.displayName = 'AdminListPage', _temp)) || _class) || _class);
exports.default = ListPage;