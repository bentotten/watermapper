import { useState, useEffect } from "react";

export default function useFetch(url) {
    let filtered_data = { value: "", dateTime: "", siteName: "" }

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

        } catch (error) {
            console.error(error);
        }
    };

    getData(url)

    return filtered_data
}

