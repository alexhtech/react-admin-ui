import React from "react"
import EntityForm from "../../components/Entity/Form"
import {getEntity, getPrefix} from "../.."
import {fetcher, fetchToState} from "react-isomorphic-tools"
import {push} from "react-router-redux"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {list} from '../../actions'
import {open} from "../../actions/Snackbar"
import Immutable from "immutable"

@connect(null, {push, open, fetchToState})
export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.entity = getEntity(props.params.name)
    }


    async handleSubmitSuccess() {
        try {
            const {fetchToState, params, location, push, open} = this.props
            open("default", "Successfully created")
            await list({fetchToState, params, location})
            push(`/${getPrefix()}/${this.props.params.name}`)
        }
        catch (e) {
            this.props.open("default", "Error creating")
        }
    }

    handleSubmit = (form) => {
        const {wrapper, url, params = {}, result} = this.entity.actions.create
        let _params = Immutable.fromJS(wrapper ? Object.assign(params, {[wrapper]: form}) : Object.assign(form, params))
        if (typeof (result) == "function") {
            _params = result(_params)
        }
        return fetcher(url(this.props.params, this.props.location.query), {
            params: _params,
            method: "POST"
        })
    }

    render() {
        const {
            entity:{
                actions:{
                    create:{form, fields, component: Component, onSubmitSuccess, initialValues}
                }
            }
        } = this

        return (
            <div className="block">
                {Component ? <Component form={form} onSubmit={this.handleSubmit}/> :
                    <EntityForm
                        form={form} fields={fields} onSubmit={this.handleSubmit}
                        onSubmitSuccess={onSubmitSuccess || ::this.handleSubmitSuccess}
                        initialValues={initialValues || {}} entity={this.entity} label="Create"/>}
            </div>
        )
    }
}