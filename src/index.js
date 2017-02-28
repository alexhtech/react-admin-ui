let _entities
const getEntities = () => _entities
const setEntities = (entities) => {
    _entities = entities
}

const getEntity = (name, entities = _entities) => {
    let entity
    for (let i in entities) {
        if (i == name) {
            entity = entities[name]
        }
        let child
        if (entities[i].actions && entities[i].actions.show && entities[i].actions.show.children) {
            child = getEntity(name, entities[i].actions.show.children)
        }
        if (child) entity = child
    }

    return entity || false
}

let prefix
const getPrefix = () => prefix || "entity"
const setPrefix = (name) => prefix = name

let widgets
const setWidgets = (_widgets) => widgets = _widgets
const getWidgets = () => widgets

let formFields
let setFormFields = (_formFields) => formFields = _formFields
let getFormFields = () => formFields


export {
    setEntities,
    getEntities,
    getEntity,
    getPrefix,
    setPrefix,
    setFormFields,
    getFormFields,
    setWidgets,
    getWidgets
}