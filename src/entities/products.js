export default {
    title: 'Products',
    name: 'products',
    url: '/products',
    actions: {
        list: {
            fields: [
                {name: 'id', title: 'Id'},
                {name: 'name', title: 'Name', style: {width: '600px'}},
                {name: 'groupId', hasOne: 'groups'}
            ],
            filters: [
                {
                    name: 'name',
                    component: 'material.TextField',
                    underlineShow: true,
                    hintText: 'Search...',
                    id: 'search',
                    open: true
                }
            ],
            url: ()=> {
                return '/products'
            }
        },
        show: {
            fields: [
                {name: 'name'},
                {name: 'groupId', hasOne: 'groups'}
            ]
        },
        create: {
            fields: [
                {name: 'name', title: 'Name'},
            ],
            url: ()=>'/products',
            redirect: 'list',
        },
        edit: {
            fields: [
                {name: 'name', component: 'material.TextField'},
                {name: 'groupId', component: 'material.TextField'},
            ],
            initFields: [
                'name', 'groupId'
            ]
        },
        del: {
            url: ({id})=>'/products/' + id
        }
    },
    pagination:{
        totalItemsLink: 'totalItems',
        pageName: 'page'
    }
}
