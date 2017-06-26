'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var groupFields = function groupFields(fields) {
    var tabs = [{
        name: 'General',
        fields: []
    }];
    for (var i in fields) {
        if (fields.hasOwnProperty(i) && fields[i].fieldType == 'tab') {
            tabs.push(fields[i]);
        } else {
            tabs[0].fields.push(fields[i]);
        }
    }
    return tabs;
};

var showField = function showField(itemName, data) {
    var field = itemName.split('.');
    var name = void 0;
    for (var i in field) {
        if (field.hasOwnProperty(i)) {
            if (i == 0) {
                name = data[field[i]];
            } else {
                name = name[field[i]];
            }
        }
    }
    return name;
};

exports.showField = showField;
exports.groupFields = groupFields;