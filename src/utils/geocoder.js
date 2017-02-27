import Geocoder from "google-geocoder"

let apiKey = "AIzaSyDRwj4uoBVTn0gjYjnLdr9ZIhPU_d-uQZg"
let geoKey = "AIzaSyBEhseuUzns1MY8qVEAySe7F2h-QnexSqc"


const geoCoder = Geocoder({key: geoKey})

const setGeoKey = (key) => {
    geoKey = key
}

const setApiKey = (key) => {
    apiKey = key
}

export {apiKey, geoKey, geoCoder, setApiKey, setGeoKey}