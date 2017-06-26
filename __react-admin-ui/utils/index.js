'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _entities = {};
function getEntities() {
    return _entities;
}
function setEntities(entities) {
    return _entities = entities;
}

function getEntity(name) {
    var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _entities;

    var entity = void 0;
    for (var i in entities) {
        if (i == name) {
            entity = entities[name];
        }
        // let child
        // if (entities[i].children) {
        //     child = getEntity(name, entities[i].children)
        // }
        // if (child) entity = child
    }

    return entity || false;
}

var prefix = 'entity';
function getPrefix() {
    return prefix;
}
function setPrefix(name) {
    prefix = name;
}

var widgets = {};
function setWidgets(_widgets) {
    widgets = _widgets;
}
function getWidgets() {
    return widgets;
}

var formFields = {};
function setFormFields(_formFields) {
    formFields = _formFields;
}
function getFormFields() {
    return formFields;
}

var header = 'React Admin';
function getHeader() {
    return header;
}
function setHeader(name) {
    header = name;
}

var filters = [];
function setFilters(_filters) {
    filters = _filters;
}

function getFilters() {
    return filters;
}

exports.setEntities = setEntities;
exports.getEntities = getEntities;
exports.getEntity = getEntity;
exports.getPrefix = getPrefix;
exports.setPrefix = setPrefix;
exports.setFormFields = setFormFields;
exports.getFormFields = getFormFields;
exports.setWidgets = setWidgets;
exports.getWidgets = getWidgets;
exports.getHeader = getHeader;
exports.setHeader = setHeader;
exports.setFilters = setFilters;
exports.getFilters = getFilters;