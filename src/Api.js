import { useState, useEffect } from "react";

export default function useFetch(url) {
    let filtered_data = { value: "", dateTime: "", siteName: "", latitude: "", longitude: "" }

    let getData = async (url) => {
        try {
            let response = await fetch(url);
            let data = await response.json();

            const {
                value,
                dateTime
            } = data.value.timeSeries[0].values[0].value[0];


            filtered_data.value = value
            filtered_data.dateTime = dateTime
            filtered_data.siteName = data.value.timeSeries[0].sourceInfo.siteName
            filtered_data.latitude = data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.latitude
            filtered_data.longitude = data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation.longitude
            //console.log("From API: ")
            //console.log(filtered_data)

        } catch (error) {
            console.error(error);
        }
    };

    getData(url)

    return filtered_data
}

