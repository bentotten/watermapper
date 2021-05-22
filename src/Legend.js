import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

// Thank you to @kboul on Stack Overflow
// https://codesandbox.io/s/how-to-add-a-legend-to-the-map-using-react-leaflet-6yqs5?file=/src/Map.js:90-120


class Legend extends MapControl {
  //class Legend {
  createLeafletElement(props) { }

  componentDidMount() {
    // get color depending on population density value
    const legend = L.control({ position: "topright" });


    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");

      let html = `
          <fieldset>
            <label for="registration">
              <legend><b>Drop Down</b></legend>

                <select name="registration" id="registration">
                <option value="Choose an option">Choose an option</option>
                <option value="Registered">Registered</option>
                <option value="Waitlisted">Waitlisted</option>
                <option value="Not Registered">Not Registered</option>
              </select>
            </label>
          </fieldset>
`

      div.innerHTML = html
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}



export default withLeaflet(Legend);

