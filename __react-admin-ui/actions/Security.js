'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.getAccount = exports.login = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactIsomorphicTools = require('react-isomorphic-tools');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(form) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch) {
            var response;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return (0, _reactIsomorphicTools.fetcher)('/login_check', {
                                params: form,
                                method: 'POST'
                            });

                        case 3:
                            response = _context.sent;

                            _reactIsomorphicTools.Auth.setToken(response.token);
                            _reactIsomorphicTools.Auth.setRefreshToken(response.refreshToken);
                            _context.t0 = dispatch;
                            _context.next = 9;
                            return dispatch(getAccount());

                        case 9:
                            _context.t1 = _context.sent;
                            _context.t2 = {
                                type: 'LOGIN_SUCCESS',
                                payload: _context.t1
                            };
                            (0, _context.t0)(_context.t2);
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t3 = _context['catch'](0);

                            dispatch({
                                type: 'LOGIN_ERROR'
                            });
                            throw _context.t3;

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 14]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};

var getAccount = exports.getAccount = function getAccount() {
    return function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dispatch) {
            var response;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (_reactIsomorphicTools.Auth.isAuthenticated()) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt('return');

                        case 2:
                            _context2.prev = 2;
                            _context2.next = 5;
                            return (0, _reactIsomorphicTools.fetcher)('/accounts/');

                        case 5:
                            response = _context2.sent;

                            dispatch({
                                type: 'ACCOUNT_SUCCESS',
                                payload: response
                            });
                            return _context2.abrupt('return', response);

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](2);

                            dispatch({
                                type: 'ACCOUNT_ERROR'
                            });
                            throw _context2.t0;

                        case 14:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[2, 10]]);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();
};

var logout = exports.logout = function logout() {
    return function (dispatch) {
        _reactIsomorphicTools.Auth.logout();
        dispatch({
            type: 'LOGOUT_SUCCESS'
        });
        dispatch((0, _reactRouterRedux.push)('/login'));
    };
};