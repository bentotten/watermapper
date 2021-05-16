import React from "react"
import map from "./map.PNG"
import { useState, useEffect } from "react";
import $ from 'jquery';

export default function Home(props) {

    const [data, setData] = useState(null);
    //let url = 'http://waterservices.usgs.gov/nwis/iv/?format=waterml,2.0&sites=01646500,01638500&parameterCd=00060,00065'
    let url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500,01638500&parameterCd=00060,00065'


    const getData = async function () {

        /*
        fetch(url, { mode: 'cors' })
            //.then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(console.error);
*/
        /*
                const axios = require('axios');
                var config = {
                    headers: { 'Access-Control-Allow-Origin': '*' }
                };
        
                try {
                    let response = await axios.get(url, config)
                    console.log(response.data)
        
                    // Split First and Last name
                    //let name = search.split(" ")
                    //let found = response.data.filter(function (entry) { return entry.firstName === name[0] })
        
                    console.log(response)
                    //setCharacter(response.data[found[0].id])
                } catch (error) {
                    console.log(error)
                }
                */


        let request_type = "GET";
        // TODO Put var in here to put multiple requests on the end of url
        let data_http = '';
        let dataType = 'json';

        $.support.cors = true;
        let webRequest = $.ajax({
            method: request_type,
            url: url,
            data: data_http,
            dataType: dataType
        });

        console.log(webRequest)




    }


    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <br />
            <h2>Portland Water</h2>
            <br />

            <img src={map} alt='Map of Gage Houses in Portland'></img>
            <h3>jQuery:</h3>
            <p id="p1">This is some text in a paragraph.</p>
        </>
    )
}


