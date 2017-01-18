import React from 'react'
import onClickOutside from 'react-onclickoutside-decorator'
import List, {showField} from './list'
import './style.sass'

export default class Export extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false,
            pristine: true
        }
    }
    handleOpen = () => {
        this.setState({open: true})
        if(this.state.pristine){
            this.props.getItems()
            this.setState({pristine: false})
        }
    }
    handleClose = () => {
        this.setState({open: false})
    }
    render(){
        return (
            <AutoComplete
                onClickOutside={this.handleClose}
                handleOpen={this.handleOpen}
                open={this.state.open}
                items={this.props.items}
                selectedItem={this.props.selectedItem}
                getItems={this.props.getItems}
                name={this.props.name}
                onSelect={this.props.onSelect}
                style={this.props.style}
                className={this.props.className}
                placeholder={this.props.placeholder}
            />
        )
    }
}


@onClickOutside
class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            selectedItem: props.selectedItem
        }
    }
    handleChange = () => {
        this.setState({
            value: this.refs.q.value,
            selectedItem: null
        })
        this.props.getItems(this.refs.q.value)
    }

    componentDidMount = () => {
        const {getItems} = this.props
        const {selectedItem} = this.state
        if(selectedItem){
            getItems()
        }
    }
    componentWillReceiveProps = (props) => {
        if(this.state.selectedItem){
            const {name} = this.props
            const item = this.selectedItem(props.items, this.state.selectedItem.id)
            if(item && this.state.value != showField(name, item)){
                this.setState({value: showField(name, item)})
            }
        }
    }

    selectedItem = (items, id) => {
        for(let i in items){
            if(items.hasOwnProperty(i) && items[i].id == id){
                return items[i]
            }
        }

    }

    handleSelect = (id) => {
        const {name} = this.props
        const item = this.selectedItem(this.props.items, id)
        this.setState({selectedItem: id, value: item[name]})
        this.props.onClickOutside()
        this.props.onSelect(item)
    }

    handleRemove = () => {
        this.setState({selectedItem: null, value: ''})
        this.props.onSelect(null)
    }

    render(){
        const {open, handleOpen, items, name} = this.props
        return(
            <div className={`${this.props.className || 'autocomplete'}`} style={this.props.style}>
                {this.state.selectedItem != null ? <a onClick={this.handleRemove} className='remove'>X</a>: null}
                <input
                    onFocus={handleOpen}
                    value={this.state.value}
                    onChange={this.handleChange}
                    ref='q' className={`${open ? 'open': ''}`}
                    placeholder={this.props.placeholder}
                />
                <List
                    items={items}
                    name={name}
                    hidden={!open}
                    handleSelect={this.handleSelect}
                />
            </div>
        )
    }
}
