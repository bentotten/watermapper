import { useState } from "react";
import React from "react"
import L, { layerGroup } from 'leaflet'
import { Map, TileLayer, Marker, Popup, Circle, LayersControl, LayerGroup} from 'react-leaflet'
import marker from './img/map-marker.png'
import gages from './data/sites.json'
import useFetch from "./Api.js"

export default function Page(props) {
    const startLocation = {
        lat: 45.5051,
        lng: -122.6750,
        zoom: 11,
    }

    const position = [startLocation.lat, startLocation.lng]
    const CSP = [gages[0].longitude, gages[0].latitude]; //COLUMBIA SLOUGH AT PORTLAND OR
    const CRV = [gages[1].longitude, gages[1].latitude] //COLUMBIA RIVER AT VANCOUVER WAA
    const BCL = [gages[2].longitude, gages[2].latitude]; //BRONSON CREEK AT LAIDLAW
    const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    const BCB = [gages[4].longitude, gages[4].latitude] //BEAVERTON CREEK AT 170TH AVE BEAVERTON OR
    const FCP = [gages[5].longitude, gages[5].latitude] //FANNO CREEK AT 56TH AVE AT PORTLAND OR

    const test = [45.6391, -122.7619]
    const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]
    let data = useFetch('https://waterservices.usgs.gov/nwis/dv/?format=json&sites=14211820,%2014144700,%20453320122483701,%2014211720,%20453004122510301,%2014206900&period=P1D&siteStatus=active')
    console.log(data);

    
    return (
        <>
        <div className="m-2">
            <br />
            <h2>Something Goes Here</h2>
        </div>
        <Map className="map" center={position} zoom={startLocation
                .zoom} scrollWheelZoom={true}>
                <LayersControl position = "topright">
                    <LayersControl.BaseLayer checked name="Open Street Map Hybrid">
                    <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                    />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay name = "2019">
                        <LayerGroup>
                            <Circle 
                                center = {CSP} 
                                radius = {600}
                            />
                            <Circle 
                                center = {CRV} 
                                radius = {600}
                            />
                            <Circle 
                                center = {BCL} 
                                radius = {600}
                            />
                            <Circle 
                                center = {WRP} 
                                radius = {600}
                            />
                            <Circle 
                                center = {BCB} 
                                radius = {600}
                            />
                            <Circle 
                                center = {FCP} 
                                radius = {600}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
        </Map>
        </>
    )
}