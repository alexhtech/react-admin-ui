class ReactAdminConfig {
    constructor() {
        this.entities = {}
        this.prefix = 'entity'
        this.widgets = {}
        this.formFields = {}
        this.header = 'React Admin'
        this.filters = {}
    }

    // getters/setters

    setEntities = (entities) => this.entities = entities

    getEntities = () => this.entities

    getEntity = (entityName, entities = this.entities) => {
        let entity = false
        for (let i in entities) {
            if (entities.hasOwnProperty(i)) {
                const element = entities[i]
                if (element.name == entityName) {
                    entity = element
                }
                if (element.hasOwnProperty('nestedItems')) {
                    const result = this.getEntity(entityName, element.nestedItems)
                    if (result) return result
                }

            }
        }
        return entity
    }

    setPrefix = (prefix) => this.prefix = prefix

    getPrefix = () => this.prefix

    setWidgets = (widgets) => this.widgets = widgets

    getWidgets = () => this.widgets

    setFormFields = (formFields) => this.formFields = formFields

    getFormFields = () => this.formFields

    getHeader = () => this.header

    setHeader = (header) => this.header = header

    getFilters = () => this.filters

    setFilters = (filters) => this.filters = filters
}


export default ReactAdminConfig