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


    
    const startLocation = {
        lat: 45.5051,
        lng: -122.6750,
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
              const response = await axios.get(url);
              console.log(response);
              setDischarge(response.data)
          } catch (err){
              console.log(err);
          }
      }
      if(discharge){
          console.log(discharge);
          for(let i = 0; i < 6; ++i){
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
    const CSP = [gages[0].longitude, gages[0].latitude]; //COLUMBIA SLOUGH AT PORTLAND OR
    const CRV = [gages[1].longitude, gages[1].latitude] //COLUMBIA RIVER AT VANCOUVER WAA
    const JCW = [gages[2].longitude, gages[2].latitude]; //JOHNSON CREEK AT MILWAUKIE OR
    const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    const TCL = [gages[4].longitude, gages[4].latitude] //TRYON CREEK NEAR LAKE OSWEGO OR
    const FCP = [gages[5].longitude, gages[5].latitude]; //FANNO CREEK AT 56TH AVE, AT PORTLAND, OR
    //const WRP = [gages[3].longitude, gages[3].latitude] //WILLAMETTE RIVER AT PORTLAND OR
    //const BCB = [gages[4].longitude, gages[4].latitude] //BEAVERTON CREEK AT 170TH AVE BEAVERTON OR
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })
    //const WRPS = [obj[0].lat, obj[0].long]; //WILLAMETTE RIVER AT PORTLAND OR
    //console.log(obj);
    const test = [45.6391, -122.7619]
    const coodinates = [[gages[0].longitude, gages[0].latitude], [gages[1].longitude, gages[1].latitude], [gages[2].longitude, gages[2].latitude], [gages[3].longitude, gages[3].latitude], [gages[4].longitude, gages[4].latitude], [gages[5].longitude, gages[5].latitude]]
    return (
        <>
            <Home />
            <LayersControl position="topright">
                <LayersControl.Overlay checked name="Stream Discharge">
                    <LayerGroup>
                        <Circle
                            color={'white'}
                            center={CSP}
                            radius={obj[5] && changeRadius(obj[5].quantity)}
                        >
                            <Popup>
                                <div>{obj[5] && obj[5].name}</div>
                                <div>discharge: {obj[5] && obj[5].quantity}</div>
                            </Popup>
                        </Circle>
                        
                        <Circle
                            //color={'white'}
                            center={CRV}
                            radius={obj[0] && changeRadius(obj[0].quantity)}
                        >
                            <Popup>
                                <div>{obj[0] && obj[0].name}</div>
                                <div>discharge: {obj[0] && obj[0].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'white'}
                            center={FCP}
                            radius={obj[1] && changeRadius(obj[1].quantity)}
                        >
                              <Popup>
                                <div>{obj[1] && obj[1].name}</div>
                                <div>discharge: {obj[1] && obj[1].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'white'}
                            center={JCW}
                            radius={obj[3] && changeRadius(obj[3].quantity)}
                        >
                              <Popup>
                                <div>{obj[3] && obj[3].name}</div>
                                <div>discharge: {obj[3] && obj[3].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'white'}
                            center={TCL}
                            radius={obj[2] && changeRadius(obj[2].quantity)}
                        >
                            <Popup>
                                <div>{obj[2] && obj[2].name}</div>
                                <div>discharge: {obj[2] && obj[2].quantity}</div>
                            </Popup>
                        </Circle>
                        <Circle
                            color={'white'}
                            center={WRP}
                            radius={obj[4] && changeRadius(obj[4].quantity)}
                        >
                             <Popup>
                                <div>{obj[4] && obj[4].name}</div>
                                <div>discharge: {obj[4] && obj[4].quantity}</div>
                            </Popup>
                        </Circle>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Tempearture">
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
                </LayersControl.Overlay>
            </LayersControl>
        </>
    )
}