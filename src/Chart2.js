import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';
import './styles/chart.css'
import gauges from './data/sites.json'



export default function Chart2(props) {
    
  var url = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites='
  for(let i = 0; i < gauges.length; i++){
    if(i === 0)
      url += gauges[i].site
    else
      url += ",%20" + gauges[i].site
  }
  const [water, setData] = useState(null);
  useEffect(() => {
    getData();

  }, [])
  async function getData() {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  var data = []
  var options = []
  if (water) {
    console.log('hello world');
    defaults.color = 'white';
    defaults.maintainAspectRatio = false;
    let backgroundColors = [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)',
      'rgba(83, 102, 255, 0.8)',
      'rgba(40, 159, 64, 0.8)',
      'rgba(210, 199, 199, 0.8)',
    ];

    let borderColors = [
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(159, 159, 159, 1)',
      'rgba(83, 102, 255, 1)',
      'rgba(40, 159, 64, 1)',
      'rgba(210, 199, 199, 1)',
    ];

    var Gauges = [{}]
    for (let i = 0; i < water.value.timeSeries.length; i++) {
      Gauges[i] = {
        name: water.value.timeSeries[i].sourceInfo.siteName,
        temp: water.value.timeSeries[i].values[0].value[0].value
      }
      console.log(Gauges[i].temp);
    }
    var gaugeNames = [];
    var gaugeTemp = [];

    for (let i = 0; i < Gauges.length; i++) {
      Gauges[i].name = Gauges[i].name.replace(', OREG', '')
      Gauges[i].name = Gauges[i].name.replace(', OR', '')
      gaugeNames.push(Gauges[i].name);
      gaugeTemp.push(Gauges[i].temp);
    }
    data = {
      labels: gaugeNames,
      datasets: [{
        label: 'Gauge Temperatures (Degrees Celsius)',
        data: gaugeTemp,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,

      }],

    }
    options = {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgb(255,255,255)',
            lineWidth: 2,
            display: true
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgb(255,255,255)',
            display: true,
            lineWidth: 2
          }
        }]
      }

    }

  }
  return (

    <div>
      <article className="canvas-container" id="temperature">
        <Bar data={data} options={options} />
      </article>
    </div>
  );
}