const validate = (values, {fieldsValidate = []}) => {
    let errors = {}

    const validateSingleField = (value, field, formValues) => {

        const {isRequired = false, test = false, errorText} = field

        if (isRequired) {
            if (!value) {
                return errorText.isRequired
            }
        }

        if (test && test(value, formValues)) {
            return errorText.test
        }
    }

    fieldsValidate.map(field => {
        const initValidate = value => {

            if (field.type !== 'array') {
                return validateSingleField(value, field, values)
            } else {

                const fieldsErrors = {}
                const fieldsArrayErrors = []

                value && value.forEach((item, index) => {
                    const {fieldsForm} = field

                    fieldsForm.map(fieldForm => {
                        const {name} = fieldForm
                        const currentValue = name != '_error' ? item.name : item

                        const errorText = validateSingleField(currentValue, fieldForm, values)

                        if (errorText) {
                            fieldsErrors[name] = errorText
                            fieldsArrayErrors[index] = fieldsErrors
                        }

                    })

                })

                if (fieldsArrayErrors.length) {
                    return fieldsArrayErrors
                }
            }
        }

        errors[field.name] = initValidate(values[field.name])

    })

    return errors
}

export {
    validate as default
}