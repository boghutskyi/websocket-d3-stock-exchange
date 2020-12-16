const array = [
    {id: 0, data: {}},
    {id: 1, data: {}},
    {id: 2, data: {}}
]
console.log(array)
const result = array.map(item => {
    if (item.id == 1) {
     return {id: 1, data: {a: 1}}
    }
    return item

})
console.log(result)