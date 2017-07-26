const groupFields = (fields) => {
    let tabs = [{
        name: 'General',
        fields: []
    }]
    for (let i in fields) {
        if (fields.hasOwnProperty(i) && fields[i].fieldType == 'tab') {
            tabs.push(fields[i])
        } else {
            tabs[0].fields.push(fields[i])
        }
    }
    return tabs
}


const showField = (itemName, data) => {
    const field = itemName.split('.')
    let name
    for (let i in field) {
        if (field.hasOwnProperty(i)) {
            if (i == 0) {
                name = data[field[i]]
            } else {
                name = name && name[field[i]]
            }
        }
    }
    return name
}

export {
    showField,
    groupFields
}
