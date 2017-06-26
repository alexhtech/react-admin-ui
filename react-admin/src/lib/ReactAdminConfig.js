import {Map} from 'immutable'

class ReactAdminConfig {
    constructor() {
        super();
        this.entities = Map({})
        this.prefix = 'entity'
        this.widgets = Map({})
        this.formFields = Map({})
        this.header = 'React Admin'
        this.filters = Map({})
    }

    // getters/setters

    setEntities = (entities) => this.entities = Map(entities)

    getEntities = () => this.entities

    getEntity = (entityName) => this.entities.find(entityName) || false

    setPrefix = (prefix) => this.prefix = prefix

    getPrefix = () => this.prefix

    setWidgets = (widgets) => this.widgets = Map(widgets)

    getWidgets = () => this.widgets

    setFormFields = (formFields) => this.formFields = formFields

    getFormFields = () => this.formFields

    getHeader = () => this.header

    setHeader = (header) => this.header = header

    getFilters = () => this.filters

    setFilters = (filters) => this.filters
}


export default ReactAdminConfig