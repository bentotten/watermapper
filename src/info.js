import CallApi from "./Api.js"
import gages from './data/sites.json'
import tempgages from './data/temp_gage_urls.json'

export default function Info(props) {
    let info = {}

    console.log('Discharge Gages: ' + gages)
    for (let el in gages) {
        info = CallApi(gages[el].daily_url);
        console.log(test)
    }

    console.log('Temp Gages: ' + tempgages)
    for (let el in tempgages) {
        info = CallApi(tempgages[el].daily_url);
        console.log(test)
    }

    return (
        <div> working </div>
    )
}