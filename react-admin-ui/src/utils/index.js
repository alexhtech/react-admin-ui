const showField = (itemName, data) => {
    let field = itemName.split('.')
    let name
    for (let i in field) {
        if (field.hasOwnProperty(i)) {
            if (i == 0) {
                name = data[field[i]]
            } else {
                name = name[field[i]]
            }
        }
    }
    return name
}

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


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param sources
 */
const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }
    return mergeDeep(target, ...sources);
}


export {
    showField,
    groupFields,
    mergeDeep
}