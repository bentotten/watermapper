import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);

    let getData = async (url) => {
        try {
            let response = await fetch(url);
            let data = await response.json();

            //console.log(data);
            //console.log(data.value.timeSeries[0].values[0].value[0]);

            const {
                value,
                qualifiers,
                dateTime
            } = data.value.timeSeries[0].values[0].value[0];

            setData(value, qualifiers[0], dateTime)

            //console.log(value);
            //console.log(qualifiers[0]);
            //console.log(dateTime);
        } catch (error) {
            console.error(error);
        }
    };

    getData(url)

    return data
}

