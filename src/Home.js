import React from "react"
import map from "./map.PNG"
import useFetch from "./Api.js"
import { useState, useEffect } from "react";
import $ from 'jquery';

export default function Home(props) {

    let url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500,01638500&parameterCd=00060,00065'

    const data = useFetch(url);
    console.log(`Testing ${JSON.stringify(data)}`)
    console.log(data)

    const test = JSON.stringify(data)


    return (
        <>
            <br />
            <h2>Portland Water</h2>
            <br />

            <img src={map} alt='Map of Gage Houses in Portland'></img>
            <div>{test}</div>


        </>
    )
}
