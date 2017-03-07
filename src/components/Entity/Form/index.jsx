import React from "react"
import {reduxForm, Field, FieldArray} from "redux-form/immutable"
import {getFormFields} from "../../.."
import {showField} from "../../../utils/utility"
import RaisedButton from "material-ui/RaisedButton"
import Dialog from "material-ui/Dialog"
import ActionButton from "../../Common/ActionButton"
import {connect} from 'react-redux'
import {openModal, closeModal} from 'react-isomorphic-tools'

@connect(state=>({
    "confirmDelete": state.getIn(["modals", "confirmDelete"]) || false
}), {openModal, closeModal})
@reduxForm()
export default class EntityForm extends React.Component {

    static defaultProps = {
        del: false,
        label: "Save"
    }

    render() {
        const {handleSubmit, submitting, fields, entity:{actions:{del}}} = this.props
        return (
            <form onSubmit={handleSubmit} className="entity-form">
                {fields.map(({type = "field", ...item}, key)=> {
                    let {component} = item
                    if (typeof (component) == "string") {
                        let widget = showField(component, getFormFields())
                        if (widget) {
                            item = {...item, component: widget, id: `__${item.name}`}
                        }
                    }
                    return (
                        <div className="entity-form--field" key={key}>
                            {item.label != "hide" && <div className="label">{item.title || item.name}</div>}
                            {type == "field" &&
                            <div className="field"><Field {...item} id={`__${item.name}`} key={key}/></div>}
                            {type == "array" &&
                            <div className="field"><FieldArray {...item} id={`__${item.name}`} key={key}/></div>}
                        </div>
                    )
                })}
                <div className="controls">
                    {this.props.del && del && <span>

                        <RaisedButton label="Delete" onClick={()=>this.props.openModal("confirmDelete")}/>
                        <Dialog open={this.props.confirmDelete} actions={
                            <div className="controls">
                                <RaisedButton label="Cancel" onClick={()=>this.props.closeModal("confirmDelete")}/>
                                <ActionButton component={RaisedButton} label="Delete" action={this.props.onDelete}
                                              primary={true}/>
                            </div>}>Are you sure to delete?</Dialog>


                    </span>}
                    <RaisedButton label={this.props.label} type="submit" primary={true} disabled={submitting}/>
                </div>
            </form>
        )
    }
}