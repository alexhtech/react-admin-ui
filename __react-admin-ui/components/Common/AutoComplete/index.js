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

var _class2, _class3, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutsideDecorator = require('react-onclickoutside-decorator');

var _reactOnclickoutsideDecorator2 = _interopRequireDefault(_reactOnclickoutsideDecorator);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Export = function (_React$Component) {
    (0, _inherits3.default)(Export, _React$Component);

    function Export() {
        (0, _classCallCheck3.default)(this, Export);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Export.__proto__ || (0, _getPrototypeOf2.default)(Export)).call(this));

        _this.handleOpen = function () {
            _this.setState({ open: true });
            if (_this.state.pristine) {
                _this.props.getItems();
                _this.setState({ pristine: false });
            }
        };

        _this.handleClose = function () {
            _this.setState({ open: false });
        };

        _this.state = {
            open: false,
            pristine: true
        };
        return _this;
    }

    (0, _createClass3.default)(Export, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(AutoComplete, {
                onClickOutside: this.handleClose,
                handleOpen: this.handleOpen,
                open: this.state.open,
                items: this.props.items,
                selectedItem: this.props.selectedItem,
                getItems: this.props.getItems,
                name: this.props.name,
                onSelect: this.props.onSelect,
                style: this.props.style,
                className: this.props.className,
                placeholder: this.props.placeholder
            });
        }
    }]);
    return Export;
}(_react2.default.Component);

exports.default = Export;

var AutoComplete = (0, _reactOnclickoutsideDecorator2.default)(_class2 = (_temp = _class3 = function (_React$Component2) {
    (0, _inherits3.default)(AutoComplete, _React$Component2);

    function AutoComplete(props) {
        (0, _classCallCheck3.default)(this, AutoComplete);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (AutoComplete.__proto__ || (0, _getPrototypeOf2.default)(AutoComplete)).call(this, props));

        _initialiseProps.call(_this2);

        _this2.state = {
            value: '',
            selectedItem: props.selectedItem
        };
        return _this2;
    }

    (0, _createClass3.default)(AutoComplete, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                open = _props.open,
                handleOpen = _props.handleOpen,
                items = _props.items,
                name = _props.name;

            return _react2.default.createElement(
                'div',
                { className: '' + (this.props.className || 'autocomplete'), style: this.props.style },
                this.state.selectedItem != null ? _react2.default.createElement(
                    'a',
                    { onClick: this.handleRemove, className: 'remove' },
                    'X'
                ) : null,
                _react2.default.createElement('input', {
                    onFocus: handleOpen,
                    value: this.state.value,
                    onChange: this.handleChange,
                    ref: 'q', className: '' + (open ? 'open' : ''),
                    placeholder: this.props.placeholder
                }),
                _react2.default.createElement(_list2.default, {
                    items: items,
                    name: name,
                    hidden: !open,
                    handleSelect: this.handleSelect
                })
            );
        }
    }]);
    return AutoComplete;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.handleChange = function () {
        _this3.setState({
            value: _this3.refs.q.value,
            selectedItem: null
        });
        _this3.props.getItems(_this3.refs.q.value);
    };

    this.componentDidMount = function () {
        var getItems = _this3.props.getItems;
        var selectedItem = _this3.state.selectedItem;

        if (selectedItem) {
            getItems();
        }
    };

    this.componentWillReceiveProps = function (props) {
        if (_this3.state.selectedItem) {
            var name = _this3.props.name;

            var item = _this3.selectedItem(props.items, _this3.state.selectedItem.id);
            if (item && _this3.state.value != (0, _list.showField)(name, item)) {
                _this3.setState({ value: (0, _list.showField)(name, item) });
            }
        }
    };

    this.selectedItem = function (items, id) {
        for (var i in items) {
            if (items.hasOwnProperty(i) && items[i].id == id) {
                return items[i];
            }
        }
    };

    this.handleSelect = function (id) {
        var name = _this3.props.name;

        var item = _this3.selectedItem(_this3.props.items, id);
        _this3.setState({ selectedItem: id, value: item[name] });
        _this3.props.onClickOutside();
        _this3.props.onSelect(item);
    };

    this.handleRemove = function () {
        _this3.setState({ selectedItem: null, value: '' });
        _this3.props.onSelect(null);
    };
}, _temp)) || _class2;