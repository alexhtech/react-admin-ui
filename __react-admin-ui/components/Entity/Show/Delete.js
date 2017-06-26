'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActionButton = require('../../Common/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteAction = function DeleteAction(_ref) {
    var toggleConfirmDelete = _ref.toggleConfirmDelete,
        confirmDelete = _ref.confirmDelete,
        onDelete = _ref.onDelete;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RaisedButton2.default, { label: 'Delete', onClick: toggleConfirmDelete }),
        _react2.default.createElement(
            _Dialog2.default,
            { open: confirmDelete, actions: _react2.default.createElement(
                    'div',
                    { className: 'controls' },
                    _react2.default.createElement(_RaisedButton2.default, {
                        label: 'Cancel',
                        onClick: toggleConfirmDelete
                    }),
                    _react2.default.createElement(_ActionButton2.default, {
                        component: _RaisedButton2.default,
                        label: 'Delete',
                        action: onDelete,
                        primary: true
                    })
                ) },
            'Are you sure to delete?'
        )
    );
};

exports.default = DeleteAction;