import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    /*
    data.value.forEach(element => {
        console.log(element)
    });


    console.log(data.value)
    console.log(data.value.keys())
*/

    // return data

    return (
        <div> I'm working </div>
    )
}

// TODO: check data exists before returning after making async