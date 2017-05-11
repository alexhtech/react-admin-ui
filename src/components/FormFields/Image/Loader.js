import React from 'react'
import {fetcher} from 'react-isomorphic-tools'

export default class Loader extends React.Component{

    static defaultProps = {
        album: 'gallery'
    }
    
    load = (e) => {
        if(!e.target.value) return false
        for(let file in e.target.files){
            if(e.target.files.hasOwnProperty(file)){
                const body = new FormData()
                body.append('file', e.target.files[file])
                fetcher(`/_uploader/${this.props.album}/upload`, {
                    method: 'POST',
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