import React from "react"
import Actions from "./Actions"

export default class index extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div>
                {children && Object.keys(children).map((item, index)=>{
                    return <Actions {...children[item]} key={index} name={item}/>
                })}
            </div>
        )
    }
}