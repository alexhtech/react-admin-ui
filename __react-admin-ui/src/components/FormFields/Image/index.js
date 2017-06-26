import React from 'react'
import Loader from './Loader'

export default class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: props.input.value
        }
    }
    
    render(){

        return (
            <div>
                {this.state.image &&
                    <div className='form-field--image'>
                        <img src={this.state.image.path}/>
                        <i className='fa fa-times remove' onClick={()=>{
                            this.props.input.onChange('')
                            this.setState({
                                image: undefined
                            })
                        }
                        }/>
                    </div>
                }
                <Loader onLoad={(image)=>{
                    this.setState({
                        image
                    })
                    this.props.input.onChange(`/api/images/${this.state.image.id}`)
                }}/>
            </div>
        )
    }
}