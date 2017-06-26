import React from 'react'
import PropTypes from 'prop-types'

export default class ActionButton extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false
        }
    }

    static propTypes = {
        action: PropTypes.func.isRequired,
        component: PropTypes.func.isRequired
    }

    mount = true

    componentWillUnmount = () => {
        this.mount = false
    }

    render() {
        const {className, action, onSuccess, onError, component: Component, ...props} = this.props
        return (
            <span>
                {!this.state.loading ? <Component type='button' className={className} onClick={async (e)=>{
                    try{
                        this.setState({
                            loading: true
                        })
                        const response = await action(e)
                        if(typeof (onSuccess) == 'function'){
                            onSuccess(response)
                        }
                        if(this.mount){
                            this.setState({
                                loading: false
                            })
                        }
                    }
                    catch (e){
                        if(this.mount){
                            this.setState({
                                loading: false,
                                e
                            })
                        }
                        if(typeof (onError) == 'function'){
                            onError(e)
                        }
                    }
                }} {...props}>
                    {this.props.children}
                </Component>:
                    <div className='loader-wrap'>
                        <div className='loader'>
                        </div>
                    </div>
                }
            </span>
        )
    }
}