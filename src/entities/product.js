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
            fieldsValidate: [
                {
                    name: 'name',
                    test: value => value.length > 20,
                    isRequired: true,
                    errorText: {
                        isRequired: 'Обязательное поле',
                        test: 'Не более 20 символов'
                    }
                }
            ],
            url: ()=>'/products',
            redirect: 'edit'
        },
        edit: {
            fields:[
                {name: 'name', component: 'material.TextField'},
                {name: 'groupId', component: 'material.TextField'}
            ],
            initFields:[
                'name', 'group'
            ]
        },
        // del: {}
    }
}
