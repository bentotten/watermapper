import React from "react"
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import marker from './img/map-marker.png'
import gages from './data/sites.json'
import Legend from "./Legend";


// Future improvement: Pull and dynmically create markers for Gage houses

export default function Home(props) {
    // Map Setup
    const startLocation = {
        lat: 45.5051,
        lng: -122.6750,
        zoom: 11,
    }
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })
    const position = [startLocation.lat, startLocation.lng]

    // Data from sites.json
    const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]

    return (
        <>
            <Map className="map" center={position} zoom={startLocation
                .zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                />

                <Marker position={coodinates[0]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Marker position={coodinates[1]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Marker position={coodinates[2]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Marker position={coodinates[3]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Marker position={coodinates[4]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Marker position={coodinates[5]} icon={mapMarker}>
                    <Popup>
                        KC: Put Popup Here
                    </Popup>
                </Marker>
                <Legend />
            </Map>

        </>
    )
}

