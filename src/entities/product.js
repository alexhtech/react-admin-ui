export default {
    title: 'Products',
    name: 'product',
    url: '/products',
    actions: {
        list: {
            fields: [
                {name: 'name', title: 'Name', style: {width: '600px'}}
            ],
            url: '/products'
        },
        show: {
            fields: [
                {name: 'name'},
                {name: 'groupId', hasOne: 'group'}
            ]
        },
        create: {
            fields:[
                {name: 'name', component: 'material.TextField'}
            ],
            url: ()=>'/products'
        },
        edit: {
            fields:[
                {name: 'name', component: 'material.TextField'},
                {name: 'groupId', component: 'material.TextField'}
            ],
            initFields:[
                'name', 'groupId'
            ]
        },
        // del: {}
    }
}