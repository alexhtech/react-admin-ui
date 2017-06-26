'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGeoKey = exports.setApiKey = exports.geoCoder = exports.geoKey = exports.apiKey = undefined;

var _googleGeocoder = require('google-geocoder');

var _googleGeocoder2 = _interopRequireDefault(_googleGeocoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiKey = 'AIzaSyDRwj4uoBVTn0gjYjnLdr9ZIhPU_d-uQZg';
var geoKey = 'AIzaSyBEhseuUzns1MY8qVEAySe7F2h-QnexSqc';

var geoCoder = (0, _googleGeocoder2.default)({ key: geoKey });

var setGeoKey = function setGeoKey(key) {
    exports.geoKey = geoKey = key;
};

var setApiKey = function setApiKey(key) {
    exports.apiKey = apiKey = key;
};

exports.apiKey = apiKey;
exports.geoKey = geoKey;
exports.geoCoder = geoCoder;
exports.setApiKey = setApiKey;
exports.setGeoKey = setGeoKey;