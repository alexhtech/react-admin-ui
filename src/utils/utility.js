export const showField = (itemName, data) => {
    const field = itemName.split('.')
    let name
    for(let i in field){
        if(field.hasOwnProperty(i)){
            if(i==0){
                name = data[field[i]]
            }else{
                name = name[field[i]]
            }
        }
    }
    return name
}
