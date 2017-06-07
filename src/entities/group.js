export default {
    title: 'Groups',
    name: 'group',
    url: '/groups',
    actions: {
        list: {
            fields: [
                {name: 'name'}
            ],
            hasMany: 'product'
        },
        show: {
            fields: [
                {name: 'name'},
                {
                    name: 'Products', fieldType: 'tab',
                    fields: [
                        {name: 'products', hasMany: 'product'}
                    ]
                }
            ],
            params: {
                filter: {
                    include: 'products'
                }
            },
            hasMany: 'product'
        },
        create: {
            fields: [
                {name: 'name', component: 'material.TextField'}
            ]

        },
        edit: {
            fields: [
                {name: 'name', component: 'material.TextField'}
            ],
            initFields: [
                'name'
            ]
        },
        // del: {}
    },
    // hidden: true
}