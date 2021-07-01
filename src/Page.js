import { useEffect, useState } from "react";
import React from "react"
import L, {} from 'leaflet'
import { Marker, Circle, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import marker from './img/map-marker.png'
//import gages from './data/sites.json'
//import useFetch from "./Api.js"
import Home from './Home.js';
import axios from 'axios';
import tempSiteURLS from './data/temp_gage_urls.json'
//import CallApi from "./Api.js"
import add_TempURLS from './data/temp2.json'

export default function Page(props) {
    //gage site coordinate variables
    //temp gage houses

    let BRF = [0, 0]; //BULL RUN RIVER AT LOWER FLUME NR 
    let BRMT = [0, 0]; //BULL RUN RIVER NEAR MULTNOMAH FALLS, OR
    let FCBT = [0, 0]; //FIR CREEK NEAR BRIGHTWOOD, OR
    let NFMT = [0, 0]; //NORTH FORK BULL RUN RIVER NEAR MULTNOMAH FALLS, OR
    let CRVT = [0, 0]; //COLUMBIA RIVER AT VANCOUVER, WA
    let PRA = [0, 0]; //PUDDING RIVER AT AURORA
    let TRL = [0, 0]; //TUALITIN RIVER NEAR WEST LINN
    let JCRT = [0, 0]; //JOHNSON CREEK AT REGNER ROAD, AT GRESHAM, OR
    let CSC = [0, 0]; //CRYSTAL SPRINGS CREEK
    let JCMT = [0, 0]; //JOHNSON CREEK AT MILWAUKIE, OR
    let WRPT = [0, 0]; //WILLAMETTE RIVER AT PORTLAND
    let BCB = [0, 0]; //BEVERTON CREEK AT BEAVERTON

    //discharge gage houses

    let BRB = [0, 0]; //BULL RUN RIVER NEAR MULTNOMAH FALLS, OR
    let BRM = [0, 0]; //BULL RUN RIVER NEAR MULTNOMAH FALLS, OR
    let FCB = [0, 0]; //FIR CREEK NEAR BRIGHTWOOD, OR
    let NFM = [0, 0]; //NORTH FORK BULL RUN RIVER NEAR MULTNOMAH FALLS, OR
    let BRL = [0, 0]; //BULL RUN RIVER BLW LAKE BEN MORROW, OREG
    let CCB = [0, 0]; //CEDAR CREEK NEAR BRIGHTWOOD, OREG
    let LSM = [0, 0]; //LITTLE SANDY RIVER NEAR MARMOT, OREG
    let BRT = [0, 0]; //BEAVER CREEK AT TROUTDALE, OR
    let CRV = [0, 0]; //COLUMBIA RIVER AT VANCOUVER, WA
    let PDA = [0, 0]; //PUDDING RIVER AT AURORA, OR
    let FCP = [0, 0]; //FANNO CREEK AT 56TH AVE, AT PORTLAND, OR
    let TCL = [0, 0]; //TRYON CREEK NEAR LAKE OSWEGO, O
    let JCR = [0, 0]; //JOHNSON CREEK AT REGNER ROAD, AT GRESHAM, OR
    let JCM = [0, 0]; //JOHNSON CREEK AT MILWAUKIE, OR
    let WRP = [0, 0]; //WILLAMETTE RIVER AT PORTLAND, OR
    let FCG = [0, 0]; //FAIRVIEW CREEK AT GLISAN ST NEAR GRESHAM, OR
    let CSP = [0, 0]; //COLUMBIA SLOUGH AT PORTLAND, OR

    let discharge_obj =[{}]; //discharge gage data

    let temp_obj =[{}];//temp gage data

    function getUrl4(){
        let url4 =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites=14211820,%2014144700,%2014211315,%2014206900,%2014211550,%2014211720,%2014211814,%2014211400,%2014142800,%2014140500,%2014139500,%2014138900,%2014139700,%2014138870,%2014138850,%2014138720,%2014202000 "
        return url4;
    }
    function getUrl5(){
        let url5 =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites=14211720,%2014211542,%2014207200,%2014202000,%20453004122510301,%2014144700,%2014138720,%2014138850,%2014138870,%2014138900,%2014211400,%2014211550";
        return url5;
    }
    
    /*const startLocation = {
        lat: 45.4865092,
        lng: -122.421757,
        zoom: 11,
    }*/


    function colorChange(temp) {
        if (temp < 5 )
            return '#1652CB';
        if (temp >= 5 && temp < 9)
            return '#169ACB';
        if (temp >= 9 && temp < 13)
            return '#16CB72';
        if (temp >= 13 && temp < 17) 
            return '#16CB2E';
        if (temp >= 17 && temp < 24) 
            return '#42CB16';    
        if (temp >= 24 && temp < 30) 
            return '#E1EA03';       
         if (temp >= 30 && temp < 40) 
            return '#E97E06';       
        if (temp >= 40 && temp < 60) 
            return '#E97E06';        
        else
            return '#E90606'
    }


    function changeRadius(discharge) {
        if(discharge >= 500000)
            return 10000;
        if (discharge >= 200000 && discharge < 500000)
            return 9000;
        if (discharge >= 100000 && discharge < 200000)
            return 8000;
        if (discharge >= 50000 && discharge < 100000)
            return 7000;
        if(discharge >= 10000 && discharge < 50000)
            return 6000;
        if(discharge >= 5000 && discharge < 10000)
            return 5000;
        if(discharge >= 1000 && discharge < 5000)
            return 4000;
        if(discharge >= 500 && discharge < 1000)
            return 3000;
        if(discharge >= 100 && discharge < 500)
            return 2000;
        else
            return 1000;
    }
      const [water, setData] = useState(null);
      useEffect(() => {
        async function getData(){
            try {
              const response = await axios.get(getUrl5());
       //       console.log(response);
              setData(response.data);
            } catch (err) {
              console.error(err);
            }
          }
        getData();
        
      }, [])
      
     
      if(water){
       // console.log(water);
        for(let i = 0; i < water.value.timeSeries.length; ++i){
            temp_obj[i] ={
                name: water.value.timeSeries[i].sourceInfo.siteName,
                site: water.value.timeSeries[i].sourceInfo.siteCode[0].value,
                lat:  water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                long: water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                temp: water.value.timeSeries[i].values[0].value[0].value
            };
        }
         //  console.log(temp_obj);
        BRF = [temp_obj[0].lat, temp_obj[0].long];
        BRMT = [temp_obj[1].lat, temp_obj[1].long];
        FCBT = [temp_obj[2].lat, temp_obj[2].long];
        NFMT = [temp_obj[3].lat, temp_obj[3].long];
        CRVT = [temp_obj[4].lat, temp_obj[4].long];
        PRA = [temp_obj[5].lat, temp_obj[5].long];
        TRL = [temp_obj[6].lat, temp_obj[6].long];
        JCRT = [temp_obj[7].lat, temp_obj[7].long];
        CSC = [temp_obj[8].lat, temp_obj[8].long];
        JCMT = [temp_obj[9].lat, temp_obj[9].long];
        WRPT = [temp_obj[10].lat, temp_obj[10].long];
        BCB = [temp_obj[11].lat, temp_obj[11].long];
      }   
     

      //discharge api call
      const[discharge, setDischarge] = useState(null);
      useEffect(() =>{
        async function getDischarge(){
            try{
                const response = await axios.get(getUrl4());
              // console.log(response);
                setDischarge(response.data)
            } catch (err){
                console.log(err);
            }
        }
          getDischarge();
      }, [])
      
      if(discharge){
         // console.log(discharge);
          for(let i = 0; i < discharge.value.timeSeries.length; ++i){
            discharge_obj[i] ={
                name: discharge.value.timeSeries[i].sourceInfo.siteName,
                site: discharge.value.timeSeries[i].sourceInfo.siteCode[0].value,
                lat:  discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                long: discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                quantity: discharge.value.timeSeries[i].values[0].value[0].value
            };
          }
         BRB = [discharge_obj[0].lat, discharge_obj[0].long];
         BRM = [discharge_obj[1].lat, discharge_obj[1].long];
         FCB = [discharge_obj[2].lat, discharge_obj[2].long];
         NFM = [discharge_obj[3].lat, discharge_obj[3].long];
         BRL = [discharge_obj[4].lat, discharge_obj[4].long];
         CCB = [discharge_obj[5].lat, discharge_obj[5].long];
         LSM = [discharge_obj[6].lat, discharge_obj[6].long];
         BRT = [discharge_obj[7].lat, discharge_obj[7].long];
         CRV = [discharge_obj[8].lat, discharge_obj[8].long];
         PDA = [discharge_obj[9].lat, discharge_obj[9].long];
         FCP = [discharge_obj[10].lat, discharge_obj[10].long];
         TCL = [discharge_obj[11].lat, discharge_obj[11].long];
         JCR = [discharge_obj[12].lat, discharge_obj[12].long];
         JCM = [discharge_obj[13].lat, discharge_obj[13].long];
         WRP = [discharge_obj[14].lat, discharge_obj[14].long];
         FCG = [discharge_obj[15].lat, discharge_obj[15].long];
         CSP = [discharge_obj[16].lat, discharge_obj[16].long];
      }




    

    //const position = [startLocation.lat, startLocation.lng]

    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })
    //console.log(discharge_obj)
    //const test = [45.6391, -122.7619]
    //const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]
    return (
        <>
            <Home />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Stream Discharge">
                    <LayerGroup>
                        <Circle
                            color={'blue'}
                            center={BRB}
                            radius={discharge_obj[0] && changeRadius(discharge_obj[0].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[0] && discharge_obj[0].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[0] && discharge_obj[0].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRM}
                            radius={discharge_obj[1] && changeRadius(discharge_obj[1].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[1] && discharge_obj[1].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[1] && discharge_obj[1].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCB}
                            radius={discharge_obj[2] && changeRadius(discharge_obj[2].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[0] && discharge_obj[0].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[0] && discharge_obj[0].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={NFM}
                            radius={discharge_obj[3] && changeRadius(discharge_obj[3].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[3] && discharge_obj[3].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[3] && discharge_obj[3].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRL}
                            radius={discharge_obj[4] && changeRadius(discharge_obj[4].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[4] && discharge_obj[4].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[4] && discharge_obj[4].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CCB}
                            radius={discharge_obj[5] && changeRadius(discharge_obj[5].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[5] && discharge_obj[5].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[5] && discharge_obj[5].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={LSM}
                            radius={discharge_obj[6] && changeRadius(discharge_obj[6].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[6] && discharge_obj[6].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[6] && discharge_obj[6].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRT}
                            radius={discharge_obj[7] && changeRadius(discharge_obj[7].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[7] && discharge_obj[7].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[7] && discharge_obj[7].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CRV}
                            radius={discharge_obj[8] && changeRadius(discharge_obj[8].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[8] && discharge_obj[8].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[8] && discharge_obj[8].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={PDA}
                            radius={discharge_obj[9] && changeRadius(discharge_obj[9].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[9] && discharge_obj[9].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[9] && discharge_obj[9].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCP}
                            radius={discharge_obj[10] && changeRadius(discharge_obj[10].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[10] && discharge_obj[10].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[10] && discharge_obj[10].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={TCL}
                            radius={discharge_obj[11] && changeRadius(discharge_obj[11].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[11] && discharge_obj[11].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[11] && discharge_obj[11].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={JCR}
                            radius={discharge_obj[12] && changeRadius(discharge_obj[12].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[12] && discharge_obj[12].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[12] && discharge_obj[12].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={JCM}
                            radius={discharge_obj[13] && changeRadius(discharge_obj[13].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[13] && discharge_obj[13].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[13] && discharge_obj[13].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={WRP}
                            radius={discharge_obj[14] && changeRadius(discharge_obj[14].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[14] && discharge_obj[14].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[14] && discharge_obj[14].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCG}
                            radius={discharge_obj[15] && changeRadius(discharge_obj[15].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[15] && discharge_obj[15].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[15] && discharge_obj[15].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CSP}
                            radius={discharge_obj[16] && changeRadius(discharge_obj[16].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{discharge_obj[16] && discharge_obj[16].name}</div>
                                <div>Daily Discharge Volume: {discharge_obj[16] && discharge_obj[16].quantity} ft<sup>3</sup>/s</div>
                            </Popup>
                        </Circle>
                    </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Tempearture">
                    <LayerGroup>
                        <Marker position={BRF} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[0].name}</b></div>
                                <div>Site: {temp_obj[0].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[0] && temp_obj[0].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[2].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={colorChange(temp_obj[0].temp)}
                                center={BRF}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[0].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[0].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={BRMT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[1] && temp_obj[1].name}</b></div>
                                <div>Site: {temp_obj[1] && temp_obj[1].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[1] && temp_obj[1].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[3].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[1] && colorChange(temp_obj[1].temp)}
                                center={BRMT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[1] && temp_obj[1].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[1] && temp_obj[1].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={FCBT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[2] && temp_obj[2].name}</b></div>
                                <div>Site: {temp_obj[2] && temp_obj[2].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[2] && temp_obj[2].temp} {'\u00B0'}C</div>

                                <a href={add_TempURLS[5].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[2] && colorChange(temp_obj[2].temp)}
                                center={FCBT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[2] && temp_obj[2].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[2] && temp_obj[2].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={NFMT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[3] && temp_obj[3].name}</b></div>
                                <div>Site: {temp_obj[3] && temp_obj[3].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[3] && temp_obj[3].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[6].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[3] && colorChange(temp_obj[3].temp)}
                                center={NFMT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[3] && temp_obj[3].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[3] && temp_obj[3].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={CRVT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[4] && temp_obj[4].name}</b></div>
                                <div>Site: {temp_obj[4] && temp_obj[4].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[4] && temp_obj[4].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[0].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[4] && colorChange(temp_obj[4].temp)}
                                center={CRVT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[4] && temp_obj[4].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[4] && temp_obj[4].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={PRA} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[5] && temp_obj[5].name}</b></div>
                                <div>Site: {temp_obj[5] && temp_obj[5].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[5] && temp_obj[5].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[4].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[5] && colorChange(temp_obj[5].temp)}
                                center={PRA}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[5] && temp_obj[5].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[5] && temp_obj[5].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={TRL} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[6] && temp_obj[6].name}</b></div>
                                <div>Site: {temp_obj[6] && temp_obj[6].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[6] && temp_obj[6].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[10].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[6] && colorChange(temp_obj[6].temp)}
                                center={TRL}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[6] && temp_obj[6].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[6] && temp_obj[6].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={JCRT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[7] && temp_obj[7].name}</b></div>
                                <div>Site: {temp_obj[7] && temp_obj[7].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[7] && temp_obj[7].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[7].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[7] && colorChange(temp_obj[7].temp)}
                                center={JCRT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[7] && temp_obj[7].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[7] && temp_obj[7].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={CSC} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[8] && temp_obj[8].name}</b></div>
                                <div>Site: {temp_obj[8] && temp_obj[8].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[8] && temp_obj[8].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[10].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[8] && colorChange(temp_obj[8].temp)}
                                center={CSC}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[8] && temp_obj[8].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[8] && temp_obj[8].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={JCMT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[9] && temp_obj[9].name}</b></div>
                                <div>Site: {temp_obj[9] && temp_obj[9].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[9] && temp_obj[9].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[8].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[9] && colorChange(temp_obj[9].temp)}
                                center={JCMT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[9] && temp_obj[9].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[9] && temp_obj[9].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={WRPT} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[10] && temp_obj[10].name}</b></div>
                                <div>Site: {temp_obj[10] && temp_obj[10].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[10] && temp_obj[10].temp} {'\u00B0'}C</div>
                                <a href={add_TempURLS[1].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[10] && colorChange(temp_obj[10].temp)}
                                center={WRPT}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[10] && temp_obj[10].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[10] && temp_obj[10].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={BCB} icon={mapMarker}>
                            <Popup>
                                <div><b>{temp_obj[11] && temp_obj[11].name}</b></div>
                                <div>Site: {temp_obj[11] && temp_obj[11].site}</div>
                                <div>Daily Temperature Reading: {temp_obj[11] && temp_obj[11].temp} {'\u00B0'}C</div>
                                <a href={tempSiteURLS[4].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                                color={temp_obj[11] && colorChange(temp_obj[11].temp)}
                                center={BCB}
                                radius={7000}
                            >
                                <Popup>
                                    <div><b>{temp_obj[11] && temp_obj[11].name}</b></div>
                                    <div>Daily Temperature Reading: {temp_obj[11] && temp_obj[11].temp} {'\u00B0'}C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                    </LayerGroup>
                </LayersControl.BaseLayer>
            </LayersControl>
        </>
    )
}