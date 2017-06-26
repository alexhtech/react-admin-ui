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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGmaps = require('react-gmaps');

var _AutoComplete = require('../../Common/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _geocoder = require('../../../utils/geocoder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Location = function (_React$Component) {
    (0, _inherits3.default)(Location, _React$Component);

    function Location(props) {
        (0, _classCallCheck3.default)(this, Location);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Location.__proto__ || (0, _getPrototypeOf2.default)(Location)).call(this, props));

        _this.onMapCreated = function (map) {
            map.addListener('zoom_changed', function () {
                if (_this.state.zoom != map.zoom) {
                    _this.setState({ zoom: map.zoom });
                }
            });
            map.addListener('dragend', function () {
                var lat = map.center.lat();
                var lng = map.center.lng();
                if (_this.state.map.lat != lat && _this.state.map.lng != lng) {
                    _this.setState({ map: { lng: lng, lat: lat } });
                }
            });
        };

        _this.state = {
            country: props.country || null,
            city: props.city || null,
            place: props.place || '',
            street: props.street || '',
            map: {
                lat: props.latitude || null,
                lng: props.longitude || null

            },
            marker: {
                lat: props.latitude || null,
                lng: props.longitude || null
            },
            zoom: 2
        };
        return _this;
    }

    (0, _createClass3.default)(Location, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                fetchData = _props.actions.fetchData,
                database = _props.database;

            var countrySearch = function countrySearch(q) {
                fetchData('/countries', 'databaseCountries', 'GET', { params: { q: q } });
            };
            var citySearch = function citySearch(q) {
                fetchData('/cities', 'databaseCities', 'GET', { params: { q: q, country_id: _this2.state.country.id } });
            };
            var handleChangePlace = function handleChangePlace() {
                _this2.setState({ place: _this2.refs.place.value });
            };
            var handleChangeStreet = function handleChangeStreet() {
                var value = _this2.refs.street.value;

                _this2.setState({ street: value });
                handleSelect({ street: value, zoom: value ? 14 : 10 });
            };
            var handleSelect = function handleSelect(_ref) {
                var _ref$country = _ref.country,
                    country = _ref$country === undefined ? _this2.state.country : _ref$country,
                    _ref$city = _ref.city,
                    city = _ref$city === undefined ? _this2.state.city : _ref$city,
                    _ref$street = _ref.street,
                    street = _ref$street === undefined ? '' : _ref$street,
                    _ref$zoom = _ref.zoom,
                    zoom = _ref$zoom === undefined ? _this2.state.zoom : _ref$zoom;

                _geocoder.geoCoder.find((country ? country.countryName : '') + ' ' + (city ? city.cityName : '') + ' ' + street, function (err, res) {
                    var _obj = {
                        country: country,
                        city: city,
                        zoom: zoom
                    };
                    if (res[0]) {
                        var location = res[0].location;

                        _this2.setState((0, _extends3.default)({}, _obj, { map: location, marker: location }));
                    } else {
                        _this2.setState(_obj);
                    }
                });
            };

            var handleDragEnd = function handleDragEnd(e) {
                var lat = e.latLng.lat();
                var lng = e.latLng.lng();
                _this2.setState({ marker: { lat: lat, lng: lng } });
            };
            return _react2.default.createElement(
                'div',
                { className: 'location' },
                _react2.default.createElement(
                    'div',
                    { className: 'field--country' },
                    _react2.default.createElement(_AutoComplete2.default, {
                        getItems: countrySearch,
                        items: database.countries.items,
                        selectedItem: this.state.country,
                        name: 'countryName',
                        onSelect: function onSelect(item) {
                            handleSelect({ country: item, city: null, zoom: 5 });
                        },
                        placeholder: 'Country'
                    })
                ),
                this.state.country ? _react2.default.createElement(
                    'div',
                    { className: 'field--city' },
                    _react2.default.createElement(_AutoComplete2.default, {
                        getItems: citySearch,
                        items: database.cities.items,
                        selectedItem: this.state.city,
                        name: 'cityName',
                        onSelect: function onSelect(item) {
                            handleSelect({ city: item, zoom: item ? 10 : 5 });
                        },
                        placeholder: 'City'
                    })
                ) : null,
                this.state.city ? _react2.default.createElement(
                    'div',
                    { className: 'field--street' },
                    _react2.default.createElement('input', { onChange: handleChangeStreet, ref: 'street', value: this.state.street, placeholder: 'Street' })
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'field--place' },
                    _react2.default.createElement('input', { onChange: handleChangePlace, ref: 'place', value: this.state.place, placeholder: 'Place' })
                ),
                _react2.default.createElement(
                    _reactGmaps.Gmaps,
                    {
                        width: '552px',
                        height: '300px',
                        lat: this.state.map.lat || 50.45,
                        lng: this.state.map.lng || 30.52,
                        zoom: this.state.zoom || 12,
                        loadingMessage: 'Be happy',
                        params: { v: '3.exp', key: _geocoder.apiKey },
                        onMapCreated: this.onMapCreated },
                    this.state.marker.lat && this.state.marker.lng ? _react2.default.createElement(_reactGmaps.Marker, {
                        lat: this.state.marker.lat,
                        lng: this.state.marker.lng,
                        draggable: true,
                        onDragEnd: handleDragEnd
                    }) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'button' },
                    _react2.default.createElement(
                        'button',
                        { onClick: this.props.handleSave.bind(null, this.state) },
                        'Save'
                    )
                )
            );
        }
    }]);
    return Location;
}(_react2.default.Component);

exports.default = Location;