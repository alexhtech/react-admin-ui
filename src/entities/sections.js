export default {
    title: 'Sections with Offset pagination',
    name: 'sections',
    actions: {
        list: {
            fields: [],
            params: {
                page: {
                    limit: 10
                }
            },
            url: (params, {page})=> {
                return {
                    url: '/service/content/v1/jsonapi/sections',
                    params:{
                        page:{
                            ...page,
                            limit: 10
                        }
                    }
                }
            }
        }
    },
    pagination: {
        itemsPerPage: 10,
        totalItemsLink: 'meta.page.total',
        itemsLink: 'data',
        type: 'offset',
        pageName: 'page[offset]',
        pageLink: 'page.offset'
    }
}