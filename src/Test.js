import useFetch from "./Api.js"

export default function Test(props) {

    let url = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites=14211820'
    let test = useFetch(url);
    console.log(test)

    return (
        <div> {test} </div>
    );
}