import React from 'react'
import Dialog from 'material-ui/Dialog'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {openModal, closeModal} from 'redux-modals-state'
import LocationComponent from './Location'
import {redux as fetchData} from 'react-security-fetcher'
import './style.sass'

@connect(state=>{
    const {databaseCities = {response: {items: []}}, databaseCountries = {response: { items: []}}} = state.fetchData
    return {
    open: state.modals,
    database: {
        cities: databaseCities.response||{items: []},
        countries: databaseCountries.response||{items: []}
    }
}}, dispatch=>({
    actions: bindActionCreators({
        openModal,
        closeModal,
        fetchData
    }, dispatch)
}))
export default class Location extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.input.value
        }
    }
    openModal = () =>{
        this.props.actions.openModal(this.props._key ? `location_${this.props._key}`: 'location')
    }
    closeModal = () =>{
        this.props.actions.closeModal(this.props._key ? `location_${this.props._key}`: 'location')
    }

    render(){
        const {
            openModal,
            closeModal,
            state: {
                value
            }
        } = this
        let text = value.country ? value.country.countryName: ''
        text += value.city ? text.length ? `, ${value.city.cityName}`: value.city.cityName: ''
        text += value.street ? `, ${value.street}`: ''
        text += value.place ? ` ( ${value.place} )`: ''

        return(
            <div>
                <a onClick={openModal}>{text.length ? text: 'Select Location'}</a>
                <Dialog
                    title='Select Location'
                    modal={false}
                    open={this.props.open[this.props._key ? `location_${this.props._key}`: 'location']||false}
                    onRequestClose={closeModal}
                    contentStyle={{width: '600px'}}
                    bodyStyle={{minHeight: '500px'}}
                >
                    <LocationComponent
                        actions={this.props.actions}
                        database={this.props.database}
                        handleSave={({country = {}, city = {}, place = '', street = '', marker:{lat:latitude, lng: longitude}})=>{
                            this.setState({value:{country, city, place, street, latitude, longitude}})
                            this.props.input.onChange({
                                country,
                                city,
                                place,
                                street,
                                longitude,
                                latitude
                            })
                            closeModal()
                        }}
                        {...this.props.input.value}
                    />
                </Dialog>
            </div>
        )
    }
}