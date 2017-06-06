export default {
    title: 'Products',
    name: 'product',
    url: '/products',
    actions: {
        list: {
            fields: [
                {name: 'name', title: 'Name', style: {width: '600px'}}
            ],
            filters: [
                {name: 'name', component: 'material.TextField', underlineShow: false, hintText: 'Search...'}
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
            fields: [
                {name: 'name', component: 'material.TextField'},
                {name: 'tickets', component: 'formFields.Tickets', fieldType: 'array'}
            ],
            fieldsValidate: [
                {
                    name: 'tickets',
                    type: 'array',
                    fieldsForm: [
                        {
                            name: 'title',
                            isRequired: true,
                            errorText: {
                                isRequired: 'Обязательное поле',
                            }
                        },
                        {
                            name: 'date',
                            test: value => value.length > 10,
                            isRequired: true,
                            errorText: {
                                isRequired: 'Обязательное поле',
                                test: 'Не более 10 символов'
                            }
                        },
                        // {
                        //     name: '_error',
                        //     test: value => value.length > 3,
                        //     isRequired: true,
                        //     errorText: {
                        //         isRequired: 'Обязательное поле',
                        //         test: 'Не более 3 символов'
                        //     }
                        // },
                    ]
                }
            ],
            url: ()=>'/products',
            redirect: 'edit',
            initialValues: {
                tickets: []
            }
        },
        edit: {
            fields: [
                {name: 'name', component: 'material.TextField'},
                {name: 'groupId', component: 'material.TextField'}
            ],
            initFields: [
                'name', 'group'
            ]
        },
        // del: {}
    }
}
