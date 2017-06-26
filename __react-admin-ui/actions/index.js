'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = exports.list = exports.edit = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

var _isJson = require('is-json');

var _isJson2 = _interopRequireDefault(_isJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var edit = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var fetchToState = _ref2.fetchToState,
            params = _ref2.params,
            location = _ref2.location;
        var entity;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        entity = (0, _utils.getEntity)(params.name);
                        _context.next = 3;
                        return fetchToState(typeof entity.actions.show.url == 'function' ? entity.actions.show.url(params, location.query) : entity.url + '/' + params.id, {
                            params: (0, _extends3.default)({}, location.query),
                            key: params.name + 'Edit'
                        });

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function edit(_x) {
        return _ref.apply(this, arguments);
    };
}();

var list = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var fetchToState = _ref4.fetchToState,
            params = _ref4.params,
            _ref4$location$query = _ref4.location.query,
            queryFilters = _ref4$location$query.filters,
            query = (0, _objectWithoutProperties3.default)(_ref4$location$query, ['filters']);

        var _getEntity, baseUrl, _getEntity$actions$li, listUrl, listParams, args, filters, result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _getEntity = (0, _utils.getEntity)(params.name), baseUrl = _getEntity.url, _getEntity$actions$li = _getEntity.actions.list, listUrl = _getEntity$actions$li.url, listParams = _getEntity$actions$li.params;
                        args = {};
                        filters = queryFilters && (0, _isJson2.default)(queryFilters) ? JSON.parse(queryFilters) : undefined;
                        _context2.t0 = typeof listUrl === 'undefined' ? 'undefined' : (0, _typeof3.default)(listUrl);
                        _context2.next = _context2.t0 === 'function' ? 6 : _context2.t0 === 'string' ? 9 : 11;
                        break;

                    case 6:
                        result = listUrl(params, (0, _extends3.default)({}, query, { filters: filters }));

                        args = (typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) == 'object' ? result : {
                            url: result,
                            params: (0, _assign2.default)(query, listParams, { filters: filters })
                        };
                        return _context2.abrupt('break', 13);

                    case 9:
                        args = {
                            url: listUrl,
                            params: (0, _assign2.default)(query, listParams, { filters: filters })
                        };
                        return _context2.abrupt('break', 13);

                    case 11:
                        args = {
                            url: baseUrl,
                            params: (0, _assign2.default)(query, listParams, { filters: filters })
                        };
                        return _context2.abrupt('break', 13);

                    case 13:
                        _context2.next = 15;
                        return fetchToState(args.url, {
                            params: args.params,
                            key: params.name + 'List'
                        });

                    case 15:
                        return _context2.abrupt('return', _context2.sent);

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function list(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var show = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var fetchToState = _ref6.fetchToState,
            params = _ref6.params,
            location = _ref6.location;
        var entity;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        entity = (0, _utils.getEntity)(params.name);
                        _context3.next = 3;
                        return fetchToState(typeof entity.actions.show.url == 'function' ? entity.actions.show.url(params) : entity.url + '/' + params.id, {
                            params: (0, _assign2.default)((0, _extends3.default)({}, location.query.params), entity.actions.show.params),
                            key: params.name + 'Show'
                        });

                    case 3:
                        return _context3.abrupt('return', _context3.sent);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function show(_x3) {
        return _ref5.apply(this, arguments);
    };
}();

exports.edit = edit;
exports.list = list;
exports.show = show;