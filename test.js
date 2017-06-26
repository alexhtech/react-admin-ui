const List = require('immutable').List


const newMap = List([
    {name: 'test'},
    {name: 'test1'}
])

console.log(newMap.find((item)=>item.name == 'test'))