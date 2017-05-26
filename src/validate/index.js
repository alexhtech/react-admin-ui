export const validate = (values, {fieldsValidate = []}) => {
    let errors = {}

    fieldsValidate.map(field => {
        const { isRequired = false, test = false, errorText } = field
        const initValidate = value => {
            if (isRequired) {
                if (!value) {
                    return errorText.isRequired
                }
            }

            if (test && test(value)) {
                return errorText.test
            }

        }

        errors[field.name] = initValidate(values.get(field.name))

    })

    return errors
}
