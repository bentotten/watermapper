import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';
import {ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './styles/chart.css'
import gauges from './data/temp2.json'



export default function Chart2(props) {
  
  const [water, setData] = useState(null);
  useEffect(() => {

    function getUrl(){
      var url = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites='
      for(let i = 0; i < gauges.length; i++){
        if(i === 0)
          url += gauges[i].site
        else
          url += ",%20" + gauges[i].site
      }
      return url
    }

    async function getData() {
      try {
        const response = await axios.get(getUrl());
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
    
  }, [])
  
  var data = []
  var riverData = []
  var creekData = []
  var riverDataSmall = []
  var creekDataSmall = []
  var options = []
  if (water) {
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
    }
    var gaugeNames = [];
    var gaugeTemp = [];
    var riverNames = [];
    var creekNames = [];
    var riverTemp = [];
    var creekTemp = [];
    var riverNumbers = [];
    var creekNumbers = [];
    var riverLabels = [];
    var creekLabels = [];
    var riverCount = 1;
    var creekCount = 1;

    for (let i = 0; i < Gauges.length; i++) {
      Gauges[i].name = Gauges[i].name.replace(', OREG', '')
      Gauges[i].name = Gauges[i].name.replace(', OR', '')
      if(Gauges[i].name.includes('RIVER') || Gauges[i].name.includes('SLOUGH')){
        riverNames.push(Gauges[i].name)
        riverTemp.push(Gauges[i].temp)
        riverLabels.push(<li>{Gauges[i].name}</li>)
        riverNumbers.push(riverCount++)
      }
      else{
        creekNames.push(Gauges[i].name)
        creekTemp.push(Gauges[i].temp)
        creekLabels.push(<li>{Gauges[i].name}</li>)
        creekNumbers.push(creekCount++)
      }
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
    riverData = {
      labels: riverNames,
      datasets: [{
        label: 'Gauge Temperatures (Degrees Celsius)',
        data: riverTemp,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    }
    creekData = {
      labels: creekNames,
      datasets: [{
        label: 'Gauge Temperatures (Degrees Celsius)',
        data: creekTemp,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    }
    riverDataSmall = {
      labels: riverNumbers,
      datasets: [{
        label: 'Gauge Temperatures (Degrees Celsius)',
        data: riverTemp,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    }
    creekDataSmall = {
      labels: creekNumbers,
      datasets: [{
        label: 'Gauge Temperatures (Degrees Celsius)',
        data: creekTemp,
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
  const [displayRiver, setRiver] = useState(true);
  const [displayCreek, setCreek] = useState(false);
  return(
    
    <div>
      <div className="temperatureRadio">
        <ToggleButtonGroup className="temperature" type="radio" name="options2" defaultValue={1}>
            <ToggleButton className="chartSelect" value={1} onClick={() => {setRiver(true); setCreek(false);}}>Rivers</ToggleButton>
            <ToggleButton className="chartSelect" value={2} onClick={() => {setRiver(false); setCreek(true);}}>Creeks</ToggleButton>
        </ToggleButtonGroup>
        <div className="river" style={{display: displayRiver ? 'block': 'none'}}>
          <article className="canvas-container" id="onlyRiverTemp">
            <Bar data={riverData} options={options} />
          </article>
          <article className="canvas-container" id="onlyRiverTempSmall">
            <Bar data={riverDataSmall} options={options} />
            <div className="labels">
              <ol> 
                {riverLabels}
              </ol>
            </div>
          </article>
        </div>
        <div className="creek" style={{display: displayCreek ? 'block': 'none'}}>
          <article className="canvas-container" id="onlyCreekTemp">
            <Bar data={creekData} options={options} />
          </article>
          <article className="canvas-container" id="onlyCreekTempSmall">
            <Bar data={creekDataSmall} options={options} />
            <div className='labels'>
              <ol>
                {creekLabels}
              </ol>
            </div>
          </article>
        </div>
      </div>
      <div className="combined">
        <article className="canvas-container" id="combinedTemp">
          <Bar data={data} options={options} />
        </article>
      </div>
    </div>
  );
}