import React from 'react'
import {fetchData} from 'react-security-fetcher'

export default class Loader extends React.Component{
    
    load = (e) => {
        if(!e.target.value) return false
        for(let file in e.target.files){
            if(e.target.files.hasOwnProperty(file)){
                const body = new FormData()
                body.append('file', e.target.files[file])
                fetchData('/_uploader/gallery/upload', 'POST', {
                    type: 'form-data',
                    params: body
                })
                    .then(response=>{
                        this.props.onLoad(response)
                    })
            }
        }
        this.refs.files.value = ''
    }
    
    render(){
        return (
            <div>
                <input type='file' ref='files' onChange={this.load} multiple={this.props.multiple ? 'multiple': false}/>
            </div>
        )
    }
}