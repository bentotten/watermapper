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


export default function Home(props) {
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })

    function getUrl1() {
        var url1 = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites='
        for (let i = 0; i < gauges.length; i++) {
            if (i === 0)
                url1 += gauges[i].site
            else
                url1 += ",%20" + gauges[i].site
        }
        return url1
    }

    const [discharge, setDischargeData] = useState(null);
    useEffect(() => {
        async function getDischargeData() {
            try {
                const response = await axios.get(getUrl1());
                console.log(response.data);
                setDischargeData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getDischargeData();

    }, [discharge])

    function getUrl2() {
        var url2 = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites='
        for (let i = 0; i < temperatures.length; i++) {
            if (i === 0)
                url2 += temperatures[i].site
            else
                url2 += ",%20" + temperatures[i].site
        }
        return url2
    }
    const [temperature, setTemperatureData] = useState(null);

    useEffect(() => {
        async function getTemperatureData() {
            try {
                const response = await axios.get(getUrl2());
                console.log(response.data);
                setTemperatureData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getTemperatureData();
    }, [temperature])

    const items = []
    if (discharge && temperature) {
        var hasBoth = false;
        for (let i = 0; i < discharge.value.timeSeries.length; i++) {
            for (let j = 0; j < temperature.value.timeSeries.length; j++) {
                if (temperature.value.timeSeries[j].sourceInfo.siteCode[0].value === discharge.value.timeSeries[i].sourceInfo.siteCode[0].value) {
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
            if (!hasBoth) {
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
        for (let i = 0; i < temperature.value.timeSeries.length; i++) {
            for (let j = 0; j < discharge.value.timeSeries.length; j++) {
                if (temperature.value.timeSeries[i].sourceInfo.siteCode[0].value === discharge.value.timeSeries[j].sourceInfo.siteCode[0].value) {
                    hasBoth = true;
                }
            }
            if (!hasBoth) {
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
        for (let i = 0; i < noData.length; i++) {
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
    for (let i = 0; i < lane.length; i++) {
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