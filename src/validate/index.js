export const validate = (values, {fieldsValidate = []}) => {
    let errors = {}

    const validateSingleField = (value, field) => {

        const { isRequired = false, test = false, errorText } = field

        if (isRequired) {
            if (!value) {
                return errorText.isRequired
            }
        }

        if (test && test(value)) {
            return errorText.test
        }
    }

    fieldsValidate.map(field => {
        const initValidate = value => {

            if (field.type !== 'array') {
                return validateSingleField(value, field)
            } else {

                const fieldsErrors = {}
                const fieldsArrayErrors = []

                value.forEach((item, index) => {
                    const {fieldsForm} = field

                    fieldsForm.map(fieldForm => {
                        const {name} = fieldForm

                        const errorText = validateSingleField( name != '_error' ? item.get(name): item, fieldForm)

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

        errors[field.name] = initValidate(values.get(field.name))

    })

    return errors
}
