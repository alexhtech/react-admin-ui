import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'

@connect(state=>({
    snackbar: state.get('snackbar').findEntry(value=>value.open == true)||['key', {open: false, message: ''}]
}), {
    close: (key, message)=>dispatch=> {
        dispatch({
            type: '@@snackbar/close',
            meta: key,
            message: message
        })
    }
})
export default class index extends React.Component {
    handleRequestClose = () => {
        const [key, obj] = this.props.snackbar

        this.props.close(key, obj.message)
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.props.snackbar[1].open}
                    message={this.props.snackbar[1].message}
                    autoHideDuration={1000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}