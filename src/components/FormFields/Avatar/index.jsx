import React from 'react'
import './style.sass'

export default class Avatar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: (props&&props.input)? props.input.value: null
        }
    }

    handleClick = (e) => {
        const {file} = this.refs
        file.click()
    }

    handleChange = (e) => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                this.setState({
                    value: {
                        path: reader.result
                    }
                })
                if(this.props.input && (typeof (this.props.input.onChange) == 'function')){
                    this.props.input.onChange(file)
                }

            }
            reader.readAsDataURL(file)
        }
    }

    handleRemove = () => {
        this.setState({
            value: null
        })
        if(this.props.input && (typeof (this.props.input.onChange) == 'function')){
            this.props.input.onChange({})
        }
    }

    render(){
        const {value} = this.state
        return (
            <div className={this.props.className||'avatar'}>
                <div className='avatar--image'>
                    <img src={(value&&value.path) ? value.path: ''} />
                    <div className='avatar--remove'>
                        <i className='fa fa-remove' onClick={this.handleRemove}/>
                    </div>
                </div>
                <div className='avatar--download'>
                    <i className='fa fa-download' aria-hidden='true' onClick={this.handleClick}> {this.props.label||'Load'}</i>
                </div>
                <input ref='file' type='file' onChange={this.handleChange} hidden={true} accept='image/*'/>
            </div>
        )
    }
}