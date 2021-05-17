import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

// Thank you to @kboul on Stack Overflow
// https://codesandbox.io/s/how-to-add-a-legend-to-the-map-using-react-leaflet-6yqs5?file=/src/Map.js:90-120


class Legend extends MapControl {
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
  
          <fieldset>
            <legend id="class section"><b>Bubble</b></legend>
            <label for="cs410p">
              <input
                type="radio"
                name="class section"
                value="CS410P"
                id="cs410p"
              />
              CS410P
            </label>
            <label for="cs510">
              <input type="radio" name="class section" value="CS510" id="cs510" />
              CS510
            </label>
          </fieldset>
  
          <fieldset>
            <legend><b>Checkbox</b></legend>
            <label for="programming_languages">
              <input
                type="checkbox"
                name="Prior Courses"
                value="Programming Languages"
                id="programming_languages"
              />
              Programming Languages
            </label>
            <br />
            <label for="operating_systems">
              <input
                type="checkbox"
                name="Prior Courses"
                value="Operating Systems"
                id="operating_systems"
              />
              Operating Systems
            </label>
            <br />
            <label for="full_stack">
              <input
                type="checkbox"
                name="Prior Courses"
                value="Full Stack"
                id="full_stack"
              />
              Full Stack Web Development
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

