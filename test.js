const fromJS = require('immutable').fromJS


const newMap = fromJS([
    {name: 'test'},
    {name: 'test1'},
    {name: 'test2', component: ()=> {
        return 'test2bl'
    }}
])

// console.log(newMap.find((item)=>item.name == 'test'))


console.log(newMap.last().get('component')())