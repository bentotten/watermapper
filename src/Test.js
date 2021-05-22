import CallApi from "./Api.js"
import gages from './data/sites.json'

export default function Test(props) {
    let test = {}

    console.log(gages)
    for (let el in gages) {
        test = CallApi(gages[el].daily_url);
        console.log(test)
    }

    return (
        <div> working </div>
    )
}