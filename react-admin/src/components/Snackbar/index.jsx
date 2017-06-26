import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
import {close} from '../../actions/snackbar'

@connect(state=>({
    snackbar: state.get('snackbar').findEntry(value=>value.open == true) || ['key', {open: false, message: ''}]
}), {
    close
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
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}