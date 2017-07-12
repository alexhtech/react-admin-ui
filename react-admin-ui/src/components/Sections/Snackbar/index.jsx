import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
import {close} from '../../../actions/snackbar'

const snackbarSelector = (snackbar) => {
    for (let i in snackbar) {
        if (snackbar.hasOwnProperty(i)) {
            if (snackbar[i] && snackbar[i].open == true) {
                return snackbar[i]
            }
        }
    }
    return {open: false}
}

@connect(state=>({
    snackbar: snackbarSelector(state.snackbar)
}), {
    close
})
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: ''
        }
    }

    componentWillReceiveProps = ({snackbar}) => {
        if (snackbar.open == true) {
            this.setState(snackbar)
            setTimeout(()=> {
                this.setState({
                    open: false
                })
                setTimeout(()=> {
                    this.props.close(this.state.key)
                }, 150)

            }, snackbar.time)
        }
    }

    handleRequestClose = () => {
        this.props.close(this.state.key)
    }

    render() {
        const {message, open} = this.state
        return (
            <div>
                <Snackbar
                    open={open}
                    message={message}
                />
            </div>
        );
    }
}
