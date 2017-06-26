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

var _class2;
// import 'draft-js/dist/Draft.css'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

require('./_rich_editor.sass');

var _draftJsExportHtml = require('draft-js-export-html');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(Component) {
    return function (_React$Component) {
        (0, _inherits3.default)(RenderComponent, _React$Component);

        function RenderComponent() {
            (0, _classCallCheck3.default)(this, RenderComponent);

            var _this = (0, _possibleConstructorReturn3.default)(this, (RenderComponent.__proto__ || (0, _getPrototypeOf2.default)(RenderComponent)).call(this));

            _this.componentDidMount = function () {
                _this.setState({ mount: true });
            };

            _this.state = {
                mount: false
            };
            return _this;
        }

        (0, _createClass3.default)(RenderComponent, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.state.mount ? _react2.default.createElement(Component, this.props) : null
                );
            }
        }]);
        return RenderComponent;
    }(_react2.default.Component);
};

var TextEditor = render(_class2 = function (_React$Component2) {
    (0, _inherits3.default)(TextEditor, _React$Component2);

    function TextEditor(props) {
        (0, _classCallCheck3.default)(this, TextEditor);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (TextEditor.__proto__ || (0, _getPrototypeOf2.default)(TextEditor)).call(this, props));

        _this2.state = {
            editorState: _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromBlockArray((0, _draftJs.convertFromHTML)(_this2.props.input.value)))
        };

        _this2.focus = function () {
            return _this2.refs.editor.focus();
        };
        _this2.onChange = function (editorState) {
            _this2.setState({ editorState: editorState });
            _this2.props.input.onChange((0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent()));
        };

        _this2.handleKeyCommand = function (command) {
            return _this2._handleKeyCommand(command);
        };
        _this2.toggleBlockType = function (type) {
            return _this2._toggleBlockType(type);
        };
        _this2.toggleInlineStyle = function (style) {
            return _this2._toggleInlineStyle(style);
        };
        return _this2;
    }

    (0, _createClass3.default)(TextEditor, [{
        key: '_handleKeyCommand',
        value: function _handleKeyCommand(command) {
            var editorState = this.state.editorState;

            var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this.onChange(newState);
                return true;
            }
            return false;
        }
    }, {
        key: '_toggleBlockType',
        value: function _toggleBlockType(blockType) {
            this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
        }
    }, {
        key: '_toggleInlineStyle',
        value: function _toggleInlineStyle(inlineStyle) {
            this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
        }
    }, {
        key: 'render',
        value: function render() {
            var editorState = this.state.editorState;
            // If the user changes block type before entering any text, we can
            // either style the placeholder or hide it. Let's just hide it now.

            var className = 'RichEditor-editor';
            var contentState = editorState.getCurrentContent();
            if (!contentState.hasText()) {
                if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                    className += ' RichEditor-hidePlaceholder';
                }
            }

            // var mapExport = editorState.getNativelyRenderedContent()

            return _react2.default.createElement(
                'div',
                { className: 'RichEditor-root' },
                _react2.default.createElement(BlockStyleControls, {
                    editorState: editorState,
                    onToggle: this.toggleBlockType
                }),
                _react2.default.createElement(InlineStyleControls, {
                    editorState: editorState,
                    onToggle: this.toggleInlineStyle
                }),
                _react2.default.createElement(
                    'div',
                    { className: className, onClick: this.focus },
                    _react2.default.createElement(_draftJs.Editor, {
                        blockStyleFn: getBlockStyle,
                        customStyleMap: styleMap,
                        editorState: editorState,
                        handleKeyCommand: this.handleKeyCommand,
                        onChange: this.onChange,
                        placeholder: 'Tell a story...',
                        ref: 'editor',
                        spellCheck: true
                    })
                )
            );
        }
    }]);
    return TextEditor;
}(_react2.default.Component)) || _class2;

// Custom overrides for 'code' style.


exports.default = TextEditor;
var styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", "monospace"',
        fontSize: 16,
        padding: 2
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

var StyleButton = function (_React$Component3) {
    (0, _inherits3.default)(StyleButton, _React$Component3);

    function StyleButton() {
        (0, _classCallCheck3.default)(this, StyleButton);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (StyleButton.__proto__ || (0, _getPrototypeOf2.default)(StyleButton)).call(this));

        _this3.onToggle = function (e) {
            e.preventDefault();
            _this3.props.onToggle(_this3.props.style);
        };
        return _this3;
    }

    (0, _createClass3.default)(StyleButton, [{
        key: 'render',
        value: function render() {
            var className = 'RichEditor-styleButton';
            if (this.props.active) {
                className += ' RichEditor-activeButton';
            }

            return _react2.default.createElement(
                'span',
                { className: className, onMouseDown: this.onToggle },
                this.props.label
            );
        }
    }]);
    return StyleButton;
}(_react2.default.Component);

var BLOCK_TYPES = [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }, { label: 'Code Block', style: 'code-block' }];

var BlockStyleControls = function BlockStyleControls(props) {
    var editorState = props.editorState;

    var selection = editorState.getSelection();
    var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        BLOCK_TYPES.map(function (type) {
            return _react2.default.createElement(StyleButton, {
                key: type.label,
                active: type.style === blockType,
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};

var INLINE_STYLES = [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }];

var InlineStyleControls = function InlineStyleControls(props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        INLINE_STYLES.map(function (type) {
            return _react2.default.createElement(StyleButton, {
                key: type.label,
                active: currentStyle.has(type.style),
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};