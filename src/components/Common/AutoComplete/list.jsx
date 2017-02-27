import React from "react"
export const showField = (itemName, data) => {
    const field = itemName.split(".")
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
export default class List extends React.Component{


    handleSelect = (e) => {
        this.props.handleSelect(e.target.dataset.id)
    }
    render(){
        const {items, name} = this.props
        return (
            <ul hidden={this.props.hidden}>
                {items.map((item, key)=>{
                    if(key>=9)return;
                    return (
                    <li key={key} data-id={item.id} onClick={this.handleSelect}>{showField(name, item)}</li>
                )})}
            </ul>
        )
    }
}