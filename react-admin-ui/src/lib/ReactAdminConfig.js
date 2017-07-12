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

    getEntity = (entityName) => {
        let entity = false
        for (let i in this.entities) {
            if (this.entities.hasOwnProperty(i)) {
                if (this.entities[i].name == entityName) {
                    entity = this.entities[i]
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