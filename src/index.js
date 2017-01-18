let _entities
const getEntities = () => _entities
const setEntities = (entities) => {
    _entities = entities
}
const getEntity = (name) => {
    return _entities[name]||false
}

let prefix
const getPrefix = () => prefix || 'entity'
const setPrefix = (name) => prefix = name

export {setEntities, getEntities, getEntity, getPrefix, setPrefix}