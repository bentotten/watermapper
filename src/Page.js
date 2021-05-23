import { useState } from "react";
import React from "react"
import L, { layerGroup } from 'leaflet'
import { Map, TileLayer, Marker, Circle, Popup, LayersControl, LayerGroup} from 'react-leaflet'
//import Popup from 'react-leaflet-editable-popup'
import marker from './img/map-marker.png'
import gages from './data/sites.json'
import useFetch from "./Api.js"

export default function Page(props) {
    let data = useFetch('https://waterservices.usgs.gov/nwis/dv/?format=json&sites=14211820,%2014144700,%20453320122483701,%2014211720,%20453004122510301,%2014206900&period=P1D&siteStatus=active')
    console.log(data.value);
    /*
    data.value.timeSeries.forEach(element =>{
        console.log(element)
    })
    */
    let url =
    "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites=14211820";
    const startLocation = {
        lat: 45.5051,
        lng: -122.6750,
        zoom: 11,
    }
    function colorChange(temp){
        if(temp < 13)
            return 'red'
        if(temp > 13)
            return 'blue'
        else
            return 'green'
    }
    function changeRadius(discharge){
        if(discharge > 3000)
            return 900;
        if(discharge > 4000)
            return 1200;
        if(discharge < 2000)
            return 400;
        else
            return 500;
    }
    /*j
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }
     */ 
      let getData = async () => {
        try {
          let response = await fetch(url);
          let data = await response.json();
      
          console.log(data);
          console.log(data.value.timeSeries[0].values[0].value[0]);
      
          const {
            value,
            qualifiers,
            dateTime
          } = data.value.timeSeries[0].values[0].value[0];
      
          console.log(value);
          console.log(qualifiers[0]);
          console.log(dateTime);
        } catch (error) {
          console.error(error);
        }
      };
      
      getData();
      
    const position = [startLocation.lat, startLocation.lng]
    const CSP = [gages[0].longitude, gages[0].latitude]; //COLUMBIA SLOUGH AT PORTLAND OR
    const CRV = [gages[1].longitude, gages[1].latitude] //COLUMBIA RIVER AT VANCOUVER WAA
    const BCL = [gages[2].longitude, gages[2].latitude]; //BRONSON CREEK AT LAIDLAW
    const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    const BCB = [gages[4].longitude, gages[4].latitude] //BEAVERTON CREEK AT 170TH AVE BEAVERTON OR
    const FCP = [gages[5].longitude, gages[5].latitude] //FANNO CREEK AT 56TH AVE AT PORTLAND OR
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })

    const test = [45.6391, -122.7619]
    const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]

    
    return (
        <>
        <div className="m-2">
            <br />
            <h2>Something Goes Here</h2>
        </div>
        <Map 
            className="map" 
            center={position} zoom={startLocation.zoom} 
            scrollWheelZoom={true}
            >
                <LayersControl position = "topright">
                    <LayersControl.BaseLayer checked name="Open Street Map Hybrid">
                    <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                    />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay checked name = "2019">
                        <LayerGroup>
                            <Circle 
                                color = {colorChange(gages[0].temperature)}
                                center = {CSP} 
                                pathOptions={{ color: 'green', fillColor: 'green' }}
                                radius = {800}
                            />
                            <Circle 
                                center = {CRV} 
                                radius = {600}
                            />
                            <Circle 
                                center = {BCL} 
                                radius = {600}
                            />
                            <Marker position={WRP} icon={mapMarker}>
                                <Popup>
                                Site: {gages[3].site}
                                Name: {gages[3].name}
                                URL: {gages[3].url}
                                </Popup>
                                </Marker>
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
                       {/*
                             </LayersControl.Overlay>
                    <LayersControl.Overlay checked name = "2018">

                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name = "2017">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2016">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2015">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2014">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2013">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2012">

                    </LayersControl.Overlay>
                     <LayersControl.Overlay checked name = "2011">

                    </LayersControl.Overlay>
 
                       */} 
                </LayersControl>
        </Map>
        </>
    )
}