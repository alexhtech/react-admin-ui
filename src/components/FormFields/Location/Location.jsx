import React from 'react'
import {Gmaps, Marker} from 'react-gmaps'
import AutoComplete from '../../Common/AutoComplete'
import {geoCoder, apiKey} from '../../../utils/geocoder'

export default class Location extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            country: props.country||null,
            city: props.city||null,
            place: props.place||'',
            street: props.street||'',
            map: {
                lat: props.latitude||null,
                lng: props.longitude||null

            },
            marker: {
                lat: props.latitude||null,
                lng: props.longitude||null
            },
            zoom: 2
        }
    }

    onMapCreated = (map) => {
        map.addListener('zoom_changed', ()=>{
            if(this.state.zoom != map.zoom){
                this.setState({zoom: map.zoom})
            }
        })
        map.addListener('dragend', ()=>{
            const lat = map.center.lat()
            const lng = map.center.lng()
            if(this.state.map.lat !=  lat && this.state.map.lng != lng){
                this.setState({map:{lng, lat}})
            }
        })
    }

    render(){
        const {actions: {fetchData}, database} = this.props
        const countrySearch = (q) =>{
            fetchData('/countries', 'databaseCountries', 'GET', {params: {q: q}})
        }
        const citySearch = (q) => {
            fetchData('/cities', 'databaseCities', 'GET', {params: {q: q, country_id: this.state.country.id}})
        }
        const handleChangePlace = () => {
            this.setState({place: this.refs.place.value})
        }
        const handleChangeStreet = () => {
            const {value} = this.refs.street
            this.setState({street: value})
            handleSelect({street: value, zoom: value ? 14: 10})
        }
        const handleSelect = ({country = this.state.country, city = this.state.city, street = '', zoom = this.state.zoom}) => {
            geoCoder.find(`${country ? country.countryName: ''} ${city ? city.cityName: ''} ${street}`, (err, res)=> {
                let _obj = {
                    country,
                    city,
                    zoom
                }
                if(res[0]){
                    const {location} = res[0]
                    this.setState({..._obj, map: location, marker: location})
                }
                else {
                    this.setState(_obj)
                }
            })
        }

        const handleDragEnd = (e) => {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            this.setState({marker: {lat, lng}})
        }
        return(
            <div className='location'>
                <div className='field--country'>
                    <AutoComplete
                        getItems={countrySearch}
                        items={database.countries.items}
                        selectedItem={this.state.country}
                        name={'countryName'}
                        onSelect={(item)=>{handleSelect({country: item, city: null, zoom: 5})}}
                        placeholder='Country'
                    />
                </div>
                {
                    this.state.country ?
                        <div className='field--city'>
                            <AutoComplete
                                getItems={citySearch}
                                items={database.cities.items}
                                selectedItem={this.state.city}
                                name={'cityName'}
                                onSelect={(item)=>{handleSelect({city: item, zoom: item ? 10: 5})}}
                                placeholder='City'
                            />
                        </div>: null
                }
                {
                    this.state.city ?
                        <div className='field--street'>
                            <input onChange={handleChangeStreet} ref='street' value={this.state.street} placeholder='Street'/>
                        </div>: null
                }
                <div className='field--place'>
                    <input onChange={handleChangePlace} ref='place' value={this.state.place} placeholder='Place'/>
                </div>
                <Gmaps
                    width={'552px'}
                    height={'300px'}
                    lat={this.state.map.lat || 50.45}
                    lng={this.state.map.lng || 30.52}
                    zoom={this.state.zoom || 12}
                    loadingMessage={'Be happy'}
                    params={{v: '3.exp', key: apiKey}}
                    onMapCreated={this.onMapCreated}>
                    {
                        (this.state.marker.lat && this.state.marker.lng) ?
                            <Marker
                                lat={this.state.marker.lat}
                                lng={this.state.marker.lng}
                                draggable={true}
                                onDragEnd={handleDragEnd}
                            />: null
                    }
                </Gmaps>
                <div className='button'>
                    <button onClick={this.props.handleSave.bind(null, this.state)}>Save</button>
                </div>
            </div>
        )
    }
}

