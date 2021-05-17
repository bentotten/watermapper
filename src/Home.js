import React from "react"
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import marker from './img/map-marker.png'


// Future improvement: Pull and dynmically create markers for Gage houses

export default function Home(props) {
    const location = {
        lat: 45.5051,
        lng: -122.6750,
        zoom: 13,
    }
    const myIcon = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })


    const position = [location.lat, location.lng]

    const test = [45.6391, -122.7619]

    return (
        <>
            <br />
            <h2>Portland Water</h2>
            <br />
            <Map className="map" center={position} zoom={location.zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                />
                <Marker position={test} icon={myIcon}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
            </Map>

        </>
    )
}
