# react-admin-ui
React Admin Panel based on material-ui interface


## Properties of config



### entity

```js
// Group

export default {
    title: 'Title',
    nestedItems: [,
        <instance of Entity>
    ],
    leftIcon: Icon,
    rightIcon: <p>sd</p>
}

```



```js
//Entity

export default {
    title: 'Users', // :String
    name: 'the same of file name !important (users.js) - users', // :String
    url: '/products', //general url for all actions :String
    actions: {
        list:{
            url: '/users', // args (params {name: EntitName}, queryParams) :String :Function->(:Object, :String) ({url: '/users', params: {}}) -> fetchToState (:params)
            params: {pageSize: '20', type: 'admins'}, //extra params for request
            fields:[
                {name: 'avatar.url.path.raw||avatar[0].url', component: 'material.TextField', ...rest}
            ],
            filters: [
                {name: ''} //
            ],
            pagination: { //unnecessary
                itemsPerPage: 10, // default :Number
                visible: 4, // default :Number
                disable: false, // default boolean
                totalItemsLink: 'totalItemCount', // default :String
                itemsLink: 'items', // default :String
                pageName: 'page', // default :String
                pageLink: 'page', // default :String
                type: 'pages' // default :String (pages|offset)
            }
        },
        show:{
            fields: [
                {name: 'avatar'} // the same
            ],
            params: {}, // the same
            url: ({id})=>`/products/${id}` // will work something like this if you didn't define here
        },
        edit:{
            fields: [
                {name: 'first', component: 'material.TextField', ...rest},
                {name: 'last', component: 'material.TextField', ...rest},
                {name: 'avatar', component: 'material.TextField', ...rest},
                {name: 'birthDate', component: 'material.TextField', ...rest}
            ],
            initFields: [
                'user.id', // -> initValues like {id}
                'user' // -> initValues like {user} that should consist id, and other properties
            ],
            wrapper: 'userForm', //global wrapper for Symfony form // unnecessary. it should be :String
            result: (form)=>{
                
                return form
            }
        },
        create:{
            // the same of edit
            // - initFields
            // + initValues
            initValues:{
                user:{
                    first: 'something'
                }
            }
        },
        del:{
            url: ({id})=>`/user/${id}`,
            method: 'DELETE' // any method what you need
        }
    }
}
```
