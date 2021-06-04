import React from "react"
import L from 'leaflet'
import { Marker, Popup, LayerGroup } from 'react-leaflet'
import { useEffect, useState } from "react";
import axios from 'axios';
import marker from './img/map-marker.png'
import gauges from './data/sites.json'
import temperatures from './data/temp2.json'
import noData from './data/no-data.json'
import lane from './data/lane.json'
//import Legend from "./Legend";
//import CallApi from "./Api.js"

export default function Home(props) {
    // Map Setup
    /*const startLocation = {
        lat: 45.47745556,
        lng: -122.4487024,
        zoom: 11,
    }
    const position = [startLocation.lat, startLocation.lng]
*/
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })
    // Data from sites.json
    //const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]
    //const coordinates = [[]]

    var url1 = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites='
    for(let i = 0; i < gauges.length; i++){
        if(i === 0)
            url1 += gauges[i].site
        else
            url1 += ",%20" + gauges[i].site
    }

    const [discharge, setDischargeData] = useState(null);
    useEffect(() => {
        getDischargeData();
        
    },[])
    async function getDischargeData(){
        try {
        const response = await axios.get(url1);
        console.log(response.data);
        setDischargeData(response.data);
        } catch (err) {
        console.error(err);
        }
    }

    var url2 = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites='
    for(let i = 0; i < temperatures.length; i++){
        if(i === 0)
        url2 += temperatures[i].site
        else
        url2 += ",%20" + temperatures[i].site
    }
    const [temperature, setTemperatureData] = useState(null);
    useEffect(() => {
        getTemperatureData();
    }, [])
    async function getTemperatureData() {
        try {
        const response = await axios.get(url2);
        console.log(response.data);
        setTemperatureData(response.data);
        } catch (err) {
        console.error(err);
        }
    }
    const items = []
    if(discharge && temperature){
        var hasBoth = false;
        for(let i = 0; i < discharge.value.timeSeries.length; i++){
            for(let j = 0; j < temperature.value.timeSeries.length; j++){
                if(temperature.value.timeSeries[j].sourceInfo.siteCode[0].value === discharge.value.timeSeries[i].sourceInfo.siteCode[0].value){
                    var coordinates2 = [discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                                        discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude]
                    var href2 = "https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=" + discharge.value.timeSeries[i].sourceInfo.siteCode[0].value;
                    items.push(<Marker position={coordinates2} icon={mapMarker}>
                                    <Popup>
                                        <div><b>{discharge.value.timeSeries[i].sourceInfo.siteName}</b></div>
                                        <div>Site: {discharge.value.timeSeries[i].sourceInfo.siteCode[0].value}</div>
                                        <div>Daily Discharge Volume: {discharge.value.timeSeries[i].values[0].value[0].value}ft<sup>3</sup>/s</div>
                                        <div>Daily Temperature Reading: {temperature.value.timeSeries[j].values[0].value[0].value}{'\u00B0'}C</div>
                                        <a href={href2}>https://waterdata.usgs.gov</a>
                                    </Popup>
                                </Marker>);
                    hasBoth = true;
                }
            }
            if(!hasBoth){
                var coordinates = [discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                                    discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude]
                var href = "https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=" + discharge.value.timeSeries[i].sourceInfo.siteCode[0].value;
                items.push(<Marker position={coordinates} icon={mapMarker}>
                                <Popup>
                                <div><b>{discharge.value.timeSeries[i].sourceInfo.siteName}</b></div>
                                <div>Site: {discharge.value.timeSeries[i].sourceInfo.siteCode[0].value}</div>
                                <div>Daily Discharge Volume: {discharge.value.timeSeries[i].values[0].value[0].value}ft<sup>3</sup>/s</div>
                                <a href={href}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>);
                
            }
            hasBoth = false;
        }
        for(let i = 0; i < temperature.value.timeSeries.length; i++){
            for(let j = 0; j < discharge.value.timeSeries.length; j++){
                if(temperature.value.timeSeries[i].sourceInfo.siteCode[0].value === discharge.value.timeSeries[j].sourceInfo.siteCode[0].value){
                    hasBoth = true;
                }
            }
            if(!hasBoth){
                coordinates = [temperature.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                                    temperature.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude]
                href = "https://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=" + temperature.value.timeSeries[i].sourceInfo.siteCode[0].value;
                items.push(<Marker position={coordinates} icon={mapMarker}>
                                <Popup>
                                    <div><b>{temperature.value.timeSeries[i].sourceInfo.siteName}</b></div>
                                    <div>Site: {temperature.value.timeSeries[i].sourceInfo.siteCode[0].value}</div>
                                    <div>Daily Temperature Reading: {temperature.value.timeSeries[i].values[0].value[0].value}{'\u00B0'}C</div>
                                    <a href={href}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>);
                                console.log(temperature.value.timeSeries[i].sourceInfo.siteName)

            }
            hasBoth = false;
        }
        for(let i = 0; i < noData.length; i++){
            coordinates = [noData[i].longitude, noData[i].latitude]
            items.push(<Marker position={coordinates} icon={mapMarker}>
                            <Popup>
                                <div><b>{noData[i].name}</b></div>
                                <div>Site: {noData[i].site}</div>
                                <a href={noData[i].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                        </Marker>);
        }
    }
    for(let i = 0; i < lane.length; i++){
        coordinates = [lane[i].longitude, lane[i].latitude]
        items.push(<Marker position={coordinates} icon={mapMarker}>
                        <Popup>
                            <div><b>{lane[i].name}</b></div>
                            <div>Site: {lane[i].site}</div>
                            <a href={lane[i].website}>https://waterdata.usgs.gov</a>
                        </Popup>
                    </Marker>);
    }
    return (
        <>
            <LayerGroup>
                {items}
            </LayerGroup>
        </>
    )

}

// Future improvement: Pull and dynmically create markers for Gage houses
/*
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
                .zoom} scrollWheelZoom={true} zoomControl={false}>
                <ZoomControl position="bottomleft" />
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Stream Discharge">
                        <LayerGroup>

                            <Marker position={coodinates[0]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[0].name}</b></div>
                                    <div>Site: {gages[0].site}</div>
                                    <a href={gages[0].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                            <Marker position={coodinates[1]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[1].name}</b></div>
                                    <div>Site: {gages[1].site}</div>
                                    <a href={gages[1].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                            <Marker position={coodinates[2]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[2].name}</b></div>
                                    <div>Site: {gages[2].site}</div>
                                    <a href={gages[2].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                            <Marker position={coodinates[3]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[3].name}</b></div>
                                    <div>Site: {gages[3].site}</div>
                                    <a href={gages[3].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                            <Marker position={coodinates[4]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[4].name}</b></div>
                                    <div>Site: {gages[4].site}</div>
                                    <a href={gages[4].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                            <Marker position={coodinates[5]} icon={mapMarker}>
                                <Popup>
                                    <div><b>{gages[5].name}</b></div>
                                    <div>Site: {gages[5].site}</div>
                                    <a href={gages[5].website}>https://waterdata.usgs.gov</a>
                                </Popup>
                            </Marker>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </Map>


        </>
    )
}

*/


/*
                <Marker position={coodinates[0]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[0].name}</b></div>
                        <div>Site: {gages[0].site}</div>
                        <a href={gages[0].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={coodinates[1]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[1].name}</b></div>
                        <div>Site: {gages[1].site}</div>
                        <a href={gages[1].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={coodinates[2]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[2].name}</b></div>
                        <div>Site: {gages[2].site}</div>
                        <a href={gages[2].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={coodinates[3]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[3].name}</b></div>
                        <div>Site: {gages[3].site}</div>
                        <a href={gages[3].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={coodinates[4]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[4].name}</b></div>
                        <div>Site: {gages[4].site}</div>
                        <a href={gages[4].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={coodinates[5]} icon={mapMarker}>
                    <Popup>
                        <div><b>{gages[5].name}</b></div>
                        <div>Site: {gages[5].site}</div>
                        <a href={gages[5].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={[tempgages[0].longitude, tempgages[0].latitude]} icon={mapMarker}>
                    <Popup>
                        <div><b>{tempgages[0].name}</b></div>
                        <div>Site: {gages[0].site}</div>
                        <a href={gages[0].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={[tempgages[1].longitude, tempgages[1].latitude]} icon={mapMarker}>
                    <Popup>
                        <div><b>{tempgages[1].name}</b></div>
                        <div>Site: {gages[1].site}</div>
                        <a href={gages[1].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={[tempgages[2].longitude, tempgages[2].latitude]} icon={mapMarker}>
                    <Popup>
                        <div><b>{tempgages[2].name}</b></div>
                        <div>Site: {gages[2].site}</div>
                        <a href={gages[2].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={[tempgages[3].longitude, tempgages[3].latitude]} icon={mapMarker}>
                    <Popup>
                        <div><b>{tempgages[3].name}</b></div>
                        <div>Site: {gages[3].site}</div>
                        <a href={gages[3].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
                <Marker position={[tempgages[4].longitude, tempgages[4].latitude]} icon={mapMarker}>
                    <Popup>
                        <div><b>{tempgages[4].name}</b></div>
                        <div>Site: {gages[4].site}</div>
                        <a href={gages[4].website}>https://waterdata.usgs.gov</a>
                    </Popup>
                </Marker>
            </LayerGroup>
        </>
    )
}*/
