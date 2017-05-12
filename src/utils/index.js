let _entities = {}
function getEntities() {
    return _entities
}
function setEntities(entities) {
    return _entities = entities
}

function getEntity(name, entities = _entities) {
    let entity
    for (let i in entities) {
        if (i == name) {
            entity = entities[name]
        }
        // let child
        // if (entities[i].children) {
        //     child = getEntity(name, entities[i].children)
        // }
        // if (child) entity = child
    }

    return entity || false
}

let prefix = 'entity'
function getPrefix() {
    return prefix
}
function setPrefix(name) {
    prefix = name
}

let widgets = {}
function setWidgets(_widgets) {
    widgets = _widgets
}
function getWidgets() {
    return widgets
}

let formFields = {}
function setFormFields(_formFields) {
    formFields = _formFields
}
function getFormFields() {
    return formFields
}

let header = 'React Admin'
function getHeader() {
    return header
}
function setHeader(name) {
    header = name
}

export {
    setEntities,
    getEntities,
    getEntity,
    getPrefix,
    setPrefix,
    setFormFields,
    getFormFields,
    setWidgets,
    getWidgets,
    getHeader,
    setHeader
}
