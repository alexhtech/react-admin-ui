import React from 'react'
import PropTypes from 'prop-types'
import {RaisedButton} from 'material-ui'
import Loader from './Loader'

export default class ActionButton extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    static propTypes = {
        action: PropTypes.func.isRequired
    }

    mount = true

    componentWillUnmount = () => {
        this.mount = false
    }

    render() {
        const {action, onSuccess, onError, label, ...props} = this.props
        return (
            <RaisedButton type='button' onClick={async(e)=> {
                try {
                    this.setState({
                        loading: true
                    })
                    const response = await action(e)
                    if (typeof (onSuccess) == 'function') {
                        onSuccess(response)
                    }
                    if (this.mount) {
                        this.setState({
                            loading: false
                        })
                    }
                }
                catch (e) {
                    if (this.mount) {
                        this.setState({
                            loading: false,
                            e
                        })
                    }
                    if (typeof (onError) == 'function') {
                        onError(e)
                    }
                }
            }} label={this.state.loading ? '' : label} {...props}>
                {this.state.loading && <Loader/>}
            </RaisedButton>)
    }
}
