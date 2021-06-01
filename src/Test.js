import CallApi from "./Api.js"
import gages from './data/sites.json'
import tempgages from './data/temp_gage_urls.json'

export default function Test(props) {
    let test = {}

    console.log('Discharge Gages: ' + gages)
    for (let el in gages) {
        test = CallApi(gages[el].daily_url);
        console.log(test)
    }

    console.log('Temp Gages: ' + tempgages)
    for (let el in tempgages) {
        test = CallApi(tempgages[el].daily_url);
        console.log(test)
    }

    return (
        <div> working </div>
    )
}