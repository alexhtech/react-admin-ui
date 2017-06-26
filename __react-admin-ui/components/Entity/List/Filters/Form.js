'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _immutable = require('redux-form/immutable');

var _FilterWrapper = require('./FilterWrapper');

var _FilterWrapper2 = _interopRequireDefault(_FilterWrapper);

var _materialUi = require('material-ui');

var _utility = require('../../../../utils/utility');

var _utils = require('../../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FiltersForm = (_dec = (0, _immutable.reduxForm)(), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(FiltersForm, _React$Component);

    function FiltersForm() {
        (0, _classCallCheck3.default)(this, FiltersForm);
        return (0, _possibleConstructorReturn3.default)(this, (FiltersForm.__proto__ || (0, _getPrototypeOf2.default)(FiltersForm)).apply(this, arguments));
    }

    (0, _createClass3.default)(FiltersForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                filters = _props.filters,
                handleSubmit = _props.handleSubmit;

            return _react2.default.createElement(
                'form',
                { onSubmit: handleSubmit },
                filters.map(function (_ref, index) {
                    var component = _ref.component,
                        name = _ref.name,
                        rest = (0, _objectWithoutProperties3.default)(_ref, ['component', 'name']);

                    return _react2.default.createElement(
                        _FilterWrapper2.default,
                        { key: index },
                        _react2.default.createElement(_immutable.Field, (0, _extends3.default)({
                            name: name,
                            component: (0, _utility.showField)(component, (0, _utils.getFilters)())
                        }, rest))
                    );
                }),
                _react2.default.createElement(
                    _materialUi.FlatButton,
                    { type: 'submit' },
                    'Apply'
                )
            );
        }
    }]);
    return FiltersForm;
}(_react2.default.Component)) || _class);
exports.default = FiltersForm;