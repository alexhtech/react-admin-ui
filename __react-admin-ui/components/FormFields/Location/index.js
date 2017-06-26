'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxModalsState = require('redux-modals-state');

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

var _reactIsomorphicTools = require('react-isomorphic-tools');

require('./style.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Location = (_dec = (0, _reactRedux.connect)(function (state) {
    var _state$fetchData = state.fetchData,
        _state$fetchData$data = _state$fetchData.databaseCities,
        databaseCities = _state$fetchData$data === undefined ? { response: { items: [] } } : _state$fetchData$data,
        _state$fetchData$data2 = _state$fetchData.databaseCountries,
        databaseCountries = _state$fetchData$data2 === undefined ? { response: { items: [] } } : _state$fetchData$data2;

    return {
        open: state.modals,
        database: {
            cities: databaseCities.response || { items: [] },
            countries: databaseCountries.response || { items: [] }
        }
    };
}, function (dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)({
            openModal: _reduxModalsState.openModal,
            closeModal: _reduxModalsState.closeModal,
            fetchToState: _reactIsomorphicTools.fetchToState
        }, dispatch)
    };
}), _dec(_class = function (_React$Component) {
    (0, _inherits3.default)(Location, _React$Component);

    function Location(props) {
        (0, _classCallCheck3.default)(this, Location);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Location.__proto__ || (0, _getPrototypeOf2.default)(Location)).call(this, props));

        _this.openModal = function () {
            _this.props.actions.openModal(_this.props._key ? 'location_' + _this.props._key : 'location');
        };

        _this.closeModal = function () {
            _this.props.actions.closeModal(_this.props._key ? 'location_' + _this.props._key : 'location');
        };

        _this.state = {
            value: props.input.value
        };
        return _this;
    }

    (0, _createClass3.default)(Location, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var openModal = this.openModal,
                closeModal = this.closeModal,
                value = this.state.value;

            var text = value.country ? value.country.countryName : '';
            text += value.city ? text.length ? ', ' + value.city.cityName : value.city.cityName : '';
            text += value.street ? ', ' + value.street : '';
            text += value.place ? ' ( ' + value.place + ' )' : '';

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { onClick: openModal },
                    text.length ? text : 'Select Location'
                ),
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: 'Select Location',
                        modal: false,
                        open: this.props.open[this.props._key ? 'location_' + this.props._key : 'location'] || false,
                        onRequestClose: closeModal,
                        contentStyle: { width: '600px' },
                        bodyStyle: { minHeight: '500px' }
                    },
                    _react2.default.createElement(_Location2.default, (0, _extends3.default)({
                        actions: this.props.actions,
                        database: this.props.database,
                        handleSave: function handleSave(_ref) {
                            var _ref$country = _ref.country,
                                country = _ref$country === undefined ? {} : _ref$country,
                                _ref$city = _ref.city,
                                city = _ref$city === undefined ? {} : _ref$city,
                                _ref$place = _ref.place,
                                place = _ref$place === undefined ? '' : _ref$place,
                                _ref$street = _ref.street,
                                street = _ref$street === undefined ? '' : _ref$street,
                                _ref$marker = _ref.marker,
                                latitude = _ref$marker.lat,
                                longitude = _ref$marker.lng;

                            _this2.setState({ value: { country: country, city: city, place: place, street: street, latitude: latitude, longitude: longitude } });
                            _this2.props.input.onChange({
                                country: country,
                                city: city,
                                place: place,
                                street: street,
                                longitude: longitude,
                                latitude: latitude
                            });
                            closeModal();
                        }
                    }, this.props.input.value))
                )
            );
        }
    }]);
    return Location;
}(_react2.default.Component)) || _class);
exports.default = Location;