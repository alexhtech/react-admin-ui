'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var validate = exports.validate = function validate(values, _ref) {
    var _ref$fieldsValidate = _ref.fieldsValidate,
        fieldsValidate = _ref$fieldsValidate === undefined ? [] : _ref$fieldsValidate;

    var errors = {};

    var validateSingleField = function validateSingleField(value, field, formValues) {
        var _field$isRequired = field.isRequired,
            isRequired = _field$isRequired === undefined ? false : _field$isRequired,
            _field$test = field.test,
            test = _field$test === undefined ? false : _field$test,
            errorText = field.errorText;


        if (isRequired) {
            if (!value) {
                return errorText.isRequired;
            }
        }

        if (test && test(value, formValues)) {
            return errorText.test;
        }
    };

    fieldsValidate.map(function (field) {
        var initValidate = function initValidate(value) {

            if (field.type !== 'array') {
                return validateSingleField(value, field, values);
            } else {

                var fieldsErrors = {};
                var fieldsArrayErrors = [];

                value && value.forEach(function (item, index) {
                    var fieldsForm = field.fieldsForm;


                    fieldsForm.map(function (fieldForm) {
                        var name = fieldForm.name;

                        var currentValue = name != '_error' ? item.get(name) : item;

                        var errorText = validateSingleField(currentValue, fieldForm, values);

                        if (errorText) {
                            fieldsErrors[name] = errorText;
                            fieldsArrayErrors[index] = fieldsErrors;
                        }
                    });
                });

                if (fieldsArrayErrors.length) {
                    return fieldsArrayErrors;
                }
            }
        };

        errors[field.name] = initValidate(values.get(field.name));
    });

    return errors;
};