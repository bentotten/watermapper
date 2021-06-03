import { useEffect, useState } from "react";
import React from "react"
import L, { layerGroup, popup } from 'leaflet'
import { Map, TileLayer, Marker, Circle, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import marker from './img/map-marker.png'
import gages from './data/sites.json'
import useFetch from "./Api.js"
import Home from './Home.js';
import axios from 'axios';
import tempSiteURLS from './data/temp_gage_urls.json'
import CallApi from "./Api.js"

export default function Page(props) {
    /*
    data.value.timeSeries.forEach(element =>{
        console.log(element)
    })
    */
    //gage site coordinate variables
            let PRA = [0, 0]; //PUDDING RIVER AT AURORA
            let TRL = [0, 0]; //TUALITIN RIVER NEAR WEST LINN
            let CSC = [0, 0]; //CRYSTAL SPRINGS CREEK
            let WRPT = [0, 0]; //WILLAMETTE RIVER AT PORTLAND
            let BCB = [0, 0]; //BEVERTON CREEK AT BEAVERTO
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

            let obj =[{}];
    //discharge gage houses
    let url =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites=14211820,%2014144700,%2014211315,%2014206900,%2014211550,%2014211720";
    //temperature gage houses
    let url2 =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites=14211720,%2014211542,%2014207200,%2014202000,%20453004122510301 ";
    //test url
    let url3 =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&sites=14211720,%2014211542,%2014207200,%2014202000,%20453004122510301&parameterCd=00010&siteType=FA-CI&siteStatus=active";
    let url4 =
        "https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites=14211820,%2014144700,%2014211315,%2014206900,%2014211550,%2014211720,%2014211814,%2014211400,%2014142800,%2014140500,%2014139500,%2014138900,%2014139700,%2014138870,%2014138850,%2014138720,%2014202000 "


    
    const startLocation = {
        lat: 45.4865092,
        lng: -122.421757,
        zoom: 11,
    }
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

    function notNull(coordinate){
        while(coordinate == [0, 0]){
            if(coordinate != [0,0]){
                break;
                return;
            }
        }
    }

    //discharge api call
    /*
    for (let i in gages) {
        discharge[i] = CallApi(gages[i].daily_url);
    }
    if(discharge){
        console.log(discharge);
        console.log(discharge[0].siteName)
    }
    */
    /*
    (function(){
        async function getDischarge(){
          let response = await fetch(url);
          let data = await response.json();
          return data;
        }
      
        getDischarge().then((discharge) => {
          console.log(discharge);
           for(let i = 0; i < 5; ++i){
                obj[i] ={
                    name: discharge.value.timeSeries[i].sourceInfo.siteName,
                    site: discharge.value.timeSeries[i].sourceInfo.siteCode[0].value,
                    lat:  discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                    long: discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                    quantity: discharge.value.timeSeries[i].values[0].value[0].value
                };
            }   

            console.log(obj[0])
            test_discharge = obj[0].quantity;
            console.log(test_discharge);
        });
      })();

      if(discharge)
        console.log(test_discharge)
        */

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
      //temperature api call
      const [water, setData] = useState(null);
      useEffect(() => {
        getData();
        
      }, [])
      async function getData(){
        try {
          const response = await axios.get(url2);
          console.log(response);
          setData(response.data);
        } catch (err) {
          console.error(err);
        }
      }
      let obj2 =[{}];
      if(water){
        console.log(water);
        for(let i = 0; i < 5; ++i){
            obj2[i] ={
                name: water.value.timeSeries[i].sourceInfo.siteName,
                site: water.value.timeSeries[i].sourceInfo.siteCode[0].value,
                lat:  water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                long: water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                temp: water.value.timeSeries[i].values[0].value[0].value
            };
        }
        console.log(obj2);
        PRA = [obj2[0].lat, obj2[0].long]; //PUDDING RIVER AT AURORA
        TRL = [obj2[1].lat, obj2[1].long]; //TUALITIN RIVER NEAR WEST LINN
        CSC = [obj2[2].lat, obj2[2].long]; //CRYSTAL SPRINGS CREEK
        WRPT = [obj2[3].lat, obj2[3].long]; //WILLAMETTE RIVER AT PORTLAND
        BCB = [obj2[4].lat, obj2[4].long]; //BEVERTON CREEK AT BEAVERTO
        console.log(obj2[0].name)
        console.log(obj2[1].name)
      }   
     
      //discharge api call
      const[discharge, setDischarge] = useState(null);
      useEffect(() =>{
          getDischarge();
      }, [])
      async function getDischarge(){
          try{
              const response = await axios.get(url4);
              console.log(response);
              setDischarge(response.data)
          } catch (err){
              console.log(err);
          }
      }
      if(discharge){
          console.log(discharge);
          for(let i = 0; i < 17; ++i){
            obj[i] ={
                name: discharge.value.timeSeries[i].sourceInfo.siteName,
                site: discharge.value.timeSeries[i].sourceInfo.siteCode[0].value,
                lat:  discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                long: discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                quantity: discharge.value.timeSeries[i].values[0].value[0].value
            };
          }
       BRB = [obj[0].lat, obj[0].long];
       BRM = [obj[1].lat, obj[1].long];
       FCB = [obj[2].lat, obj[2].long];
       NFM = [obj[3].lat, obj[3].long];
       BRL = [obj[4].lat, obj[4].long];
       CCB = [obj[5].lat, obj[5].long];
       LSM = [obj[6].lat, obj[6].long];
       BRT = [obj[7].lat, obj[7].long];
       CRV = [obj[8].lat, obj[8].long];
       PDA = [obj[9].lat, obj[9].long];
       FCP = [obj[10].lat, obj[10].long];
       TCL = [obj[11].lat, obj[11].long];
       JCR = [obj[12].lat, obj[12].long];
       JCM = [obj[13].lat, obj[13].long];
       WRP = [obj[14].lat, obj[14].long];
       FCG = [obj[15].lat, obj[15].long];
       CSP = [obj[16].lat, obj[16].long];
      }


      //dicharge api call
      /*
      const [discharge, SetData] = useState(null);
      useEffect(() => {
        getData2();
        
      }, [])
      async function getData2(){
        try {
          const response2 = await axios.get(url2);
          console.log(response2);
          setData(response2.data2);
        } catch (err) {
          console.error(err);
        }
      }
      if(discharge){
        console.log(discharge);
        for(let i = 0; i < 5; ++i){
            obj[i] ={
                name: discharge.value.timeSeries[i].sourceInfo.siteName,
                site: discharge.value.timeSeries[i].sourceInfo.siteCode[0].value,
                lat:  discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                long: discharge.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                quantity: discharge.value.timeSeries[i].values[0].value[0].value
            };
        }
        console.log(obj);
    }
    */
    //let obj2 = [[]]
   // console.log(data.value.timeSeries[0].sourceInfo.siteName)
   /*
    for(let i = 0; i < 5; ++i){
        obj2[i] ={
            name: water.value.timeSeries[i].sourceInfo.siteName,
            site: water.value.timeSeries[i].sourceInfo.siteCode[0].value,
            lat:  water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
            long: water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
            temp: water.value.timeSeries[i].values[0].value[0].value
        };
    }
    */

   // console.log(obj2[0].name);
   /*
    let obj = [{}];
    let getData = async () => {
        try {
            let response = await fetch(url2);
            let data = await response.json();
            for(let i = 0; i < 5; ++i){
                obj[i] ={
                    name: data.value.timeSeries[i].sourceInfo.siteName,
                    site: data.value.timeSeries[i].sourceInfo.siteCode[0].value,
                    lat:  data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
                    long: data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
                    temp: data.value.timeSeries[i].values[0].value[0].value
                };
            }
            console.log(obj[0].name);
            console.log(WRPS)
            console.log(obj);
            setTimeout( 10000);

        } catch (error) {
            console.error(error);
        }
    };
    getData();
        /*
            const PRA = [45.23317586, -122.7500933]; //= [obj[0].lat, obj[0].long]; //PUDDING RIVER AT AURORA
            const TRL = [45.35650877, -122.6850937]; //TUALITIN RIVER NEAR WEST LINN
            const CSC = [45.4740079, -122.6420388]; //CRYSTAL SPRINGS CREEK
            const WRP = [45.5175, -122.6691667]; //WILLAMETTE RIVER AT PORTLAND
            const BCB = [45.5009505, -122.852045]; //BEVERTON CREEK AT BEAVERTO
            const TRL//= [obj[1].lat, obj[1].long]; //TUALITIN RIVER NEAR WEST LINN
            const CSC//= [obj[2].lat, obj[2].long]; //CRYSTAL SPRINGS CREEK
            const WRP//= [obj[3].lat, obj[3].long]; //WILLAMETTE RIVER AT PORTLAND
            const BCB//= [obj[4].lat, obj[4].long]; //BEVERTON CREEK AT BEAVERTO
    console.log(PRA);
    console.log(obj);
    console.log(Array.isArray(obj));
    console.log(obj[0].name);
    let result = obj.map(gage =>({
        name: gage.name,
        site: gage.site,
        lat: gage.lat,
        long: gage.long,
        temp: gage.temp
    }));
    */
    //console.log(result);
    //console.log(water.value.timeSeries[0].sourceInfo.siteName);
    const position = [startLocation.lat, startLocation.lng]
    /*
    const WRP = [obj[0].long, obj[0].lat]; //WILLAMETTE RIVER AT PORTLAND OR
    const CRV = [obj[1].long, obj[1].lat]; //COLUMBIA RIVER AT VANCOUVER WAA
    const BCL = [obj[2].long, obj[2].lat]; //BRONSON CREEK AT LAIDLAW
    const CSP = [obj[3].long, obj[3].lat]; //WILLAMETTE RIVER AT PORTLAND OR
    const BCB = [obj[4].long, obj[4].lat]; //BEAVERTON CREEK AT 170TH AVE BEAVERTON OR
    const FCP = [obj[5].long, obj[5].lat]; //FANNO CREEK AT 56TH AVE, AT PORTLAND, OR
    */
   // const CSP = [gages[0].longitude, gages[0].latitude]; //COLUMBIA SLOUGH AT PORTLAND OR
  //  const CRV = [gages[1].longitude, gages[1].latitude] //COLUMBIA RIVER AT VANCOUVER WAA
    const JCW = [gages[2].longitude, gages[2].latitude]; //JOHNSON CREEK AT MILWAUKIE OR
    //const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    //const TCL = [gages[4].longitude, gages[4].latitude] //TRYON CREEK NEAR LAKE OSWEGO OR
    //const FCP = [gages[5].longitude, gages[5].latitude]; //FANNO CREEK AT 56TH AVE, AT PORTLAND, OR
    //const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    //const BCB = [gages[4].longitude, gages[4].latitude] //BEAVERTON CREEK AT 170TH AVE BEAVERTON OR
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })
    //const WRPS = [obj[0].lat, obj[0].long]; //WILLAMETTE RIVER AT PORTLAND OR
    //console.log(obj);
    console.log(obj)
    const test = [45.6391, -122.7619]
    const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]
    return (
        <>
            <Home />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Stream Discharge">
                    <LayerGroup>
                        <Circle
                            color={'blue'}
                            center={BRB}
                            radius={obj[0] && changeRadius(obj[0].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[0] && obj[0].name}</div>
                                <div>discharge: {obj[0] && obj[0].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRM}
                            radius={obj[1] && changeRadius(obj[1].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[1] && obj[1].name}</div>
                                <div>discharge: {obj[1] && obj[1].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCB}
                            radius={obj[2] && changeRadius(obj[2].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[0] && obj[0].name}</div>
                                <div>discharge: {obj[0] && obj[0].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={NFM}
                            radius={obj[3] && changeRadius(obj[3].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[3] && obj[3].name}</div>
                                <div>discharge: {obj[3] && obj[3].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRL}
                            radius={obj[4] && changeRadius(obj[4].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[4] && obj[4].name}</div>
                                <div>discharge: {obj[4] && obj[4].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CCB}
                            radius={obj[5] && changeRadius(obj[5].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[5] && obj[5].name}</div>
                                <div>discharge: {obj[5] && obj[5].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={LSM}
                            radius={obj[6] && changeRadius(obj[6].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[6] && obj[6].name}</div>
                                <div>discharge: {obj[6] && obj[6].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={BRT}
                            radius={obj[7] && changeRadius(obj[7].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[7] && obj[7].name}</div>
                                <div>discharge: {obj[7] && obj[7].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CRV}
                            radius={obj[8] && changeRadius(obj[8].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[8] && obj[8].name}</div>
                                <div>discharge: {obj[8] && obj[8].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={PDA}
                            radius={obj[9] && changeRadius(obj[9].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[9] && obj[9].name}</div>
                                <div>discharge: {obj[9] && obj[9].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCP}
                            radius={obj[10] && changeRadius(obj[10].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[10] && obj[10].name}</div>
                                <div>discharge: {obj[10] && obj[10].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={TCL}
                            radius={obj[11] && changeRadius(obj[11].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[11] && obj[11].name}</div>
                                <div>discharge: {obj[11] && obj[11].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={JCR}
                            radius={obj[12] && changeRadius(obj[12].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[12] && obj[12].name}</div>
                                <div>discharge: {obj[12] && obj[12].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={JCM}
                            radius={obj[13] && changeRadius(obj[13].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[13] && obj[13].name}</div>
                                <div>discharge: {obj[13] && obj[13].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={WRP}
                            radius={obj[14] && changeRadius(obj[14].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[14] && obj[14].name}</div>
                                <div>discharge: {obj[14] && obj[14].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={FCG}
                            radius={obj[15] && changeRadius(obj[15].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[15] && obj[15].name}</div>
                                <div>discharge: {obj[15] && obj[15].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'blue'}
                            center={CSP}
                            radius={obj[16] && changeRadius(obj[16].quantity)}
                            pathOptions={{ color: 'blue', fillColor: 'blue' }}
                        >
                            <Popup>
                                <div>{obj[16] && obj[16].name}</div>
                                <div>discharge: {obj[16] && obj[16].quantity}</div>
                            </Popup>
                        </Circle>
                    </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Tempearture">
                    <LayerGroup>
                        <Marker position={PRA} icon={mapMarker}>
                            <Popup>
                                <div><b>{obj2[0].name}</b></div>
                                <div>Site: {obj2[0].site}</div>
                                <a href={tempSiteURLS[0].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                            color={colorChange(obj2[0].temp)}
                            center={PRA}
                            radius={7000}
                            >
                                <Popup>
                                <div><b>{obj2[0].name}</b></div>
                                <div>Temp: {obj2[0].temp} C</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={TRL} icon={mapMarker}>
                            <Popup>
                                <div><b>{ obj2[1] && obj2[1].name}</b></div>
                                <div>Site: {obj2[1] && obj2[1].site}</div>
                                <a href={tempSiteURLS[1].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                            <Circle
                            color={obj2[1] && colorChange(obj2[1].temp)}
                            center={TRL}
                            radius={7000}
                            >
                                <Popup>
                                <div> {obj2[1] && obj2[1].name}</div>
                                <div> Temp: {obj2[1] && obj2[1].temp}</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={CSC} icon={mapMarker}>
                            <Popup>
                                <div><b>{ obj2[2] && obj2[2].name}</b></div>
                                <div>Site: {obj2[2] && obj2[2].site}</div>
                                <a href={tempSiteURLS[2].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                        <Circle
                            color={obj2[2] && colorChange(obj2[2].temp)}
                            center={CSC}
                            radius={7000}
                            >
                                <Popup>
                                <div> {obj2[2] && obj2[2].name}</div>
                                <div> Temp: {obj2[2] && obj2[2].temp}</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={WRP} icon={mapMarker}>
                            <Popup>
                                <div><b>{gages[3].name}</b></div>
                                <div>Site: {gages[3].site}</div>
                                <a href={gages[3].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                        <Circle
                            color={obj2[3] && colorChange(obj2[3].temp)}
                            center={WRPT}
                            radius={7000}
                            >
                                <Popup>
                                <div> {obj2[3] && obj2[3].name}</div>
                                <div> Temp: {obj2[3] && obj2[3].temp}</div>
                                </Popup>
                            </Circle>
                        </Marker>
                        <Marker position={BCB} icon={mapMarker}>
                        <Popup>
                                <div><b>{ obj2[4] && obj2[4].name}</b></div>
                                <div>Site: {obj2[4] && obj2[4].site}</div>
                                <a href={tempSiteURLS[4].website}>https://waterdata.usgs.gov</a>
                            </Popup>
                        <Circle
                            color={obj2[4] && colorChange(obj2[4].temp)}
                            center={BCB}
                            radius={7000}
                            >
                                <Popup>
                                <div> {obj2[4] && obj2[4].name}</div>
                                <div> Temp: {obj2[4] && obj2[4].temp}</div>
                                </Popup>
                            </Circle>
                        </Marker>
                    </LayerGroup>
                </LayersControl.BaseLayer>
            </LayersControl>
        </>
    )
}