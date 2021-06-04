import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';
import {ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './styles/chart.css'
import gauges from './data/sites.json'



export default function Chart1(props) {
    
  var url = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00060&statCd=00003&sites='
  for(let i = 0; i < gauges.length; i++){
    if(gauges[i].site !== 14144700 && gauges[i].site !== 14211720){
      if(i === 0)
        url += gauges[i].site
      else
        url += ",%20" + gauges[i].site 
    }
  }

  const [water, setData] = useState(null);
  useEffect(() => {
    getData();
    
  },[])
  async function getData(){
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  
  var riverData = []
  var options = []
  var creekData = []
  var riverDataSmall = []
  var creekDataSmall = []
  if(water){
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
    for(let i = 0; i < water.value.timeSeries.length; i++){
      Gauges[i] = {
        name: water.value.timeSeries[i].sourceInfo.siteName,
        discharge: water.value.timeSeries[i].values[0].value[0].value
      }
      console.log(Gauges[i].temp);
    }
    var riverNames = [];
    var creekNames = [];
    var riverDischarge = [];
    var creekDischarge = [];
    var creekLabels = [];
    var riverLabels = [];
    var creekNumbers = [];
    var creekCount = 1;
    var riverNumbers = [];
    var riverCount = 1;
    
    
    for(let i = 0; i < Gauges.length; i++){
      //var longName = 0
      Gauges[i].name = Gauges[i].name.replace(', OREG', '')
      Gauges[i].name = Gauges[i].name.replace(', OR', '')
      if(Gauges[i].name.includes('RIVER') || Gauges[i].name.includes('SLOUGH')){
        //if(Gauges[i].name === 'NORTH FORK BULL RUN RIVER NEAR MULTNOMAH FALLS')
          //longName = i;
        riverNames.push(Gauges[i].name)
        riverDischarge.push(Gauges[i].discharge)
        riverLabels.push(<li>{Gauges[i].name}</li>)
        riverNumbers.push(riverCount++)
      }
      else{
        creekNames.push(Gauges[i].name)
        creekDischarge.push(Gauges[i].discharge)
        creekLabels.push(<li>{Gauges[i].name}</li>)
        creekNumbers.push(creekCount++)
      }
    }

    //riverNames.push(Gauges[longName].name)
    //riverDischarge.push(Gauges[longName].name)

    riverData =  {
      labels: riverNames,
      datasets: [{
          label: 'River Discharge Rate (cubic feet per second)',
          data: riverDischarge,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          
      }],
    }
    creekData = {
      labels: creekNames,
      datasets: [{
          label: 'Creek Discharge Rate (cubic feet per second)',
          data: creekDischarge,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          
      }],
    }
    riverDataSmall =  {
      labels: riverNumbers,
      datasets: [{
          label: 'River Discharge Rate (cubic feet per second)',
          data: riverDischarge,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          
      }],
    }
    creekDataSmall = {
      labels: creekNumbers,
      datasets: [{
          label: 'Creek Discharge Rate (cubic feet per second)',
          data: creekDischarge,
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
      <div className="dischargeRadio">
        <ToggleButtonGroup className="discharge" type="radio" name="options2" defaultValue={1}>
            <ToggleButton className="chartSelect" value={1} onClick={() => {setRiver(true); setCreek(false);}}>Rivers</ToggleButton>
            <ToggleButton className="chartSelect" value={2} onClick={() => {setRiver(false); setCreek(true);}}>Creeks</ToggleButton>
        </ToggleButtonGroup>
        <div className="river" style={{display: displayRiver ? 'block': 'none'}}>
          <article className="canvas-container" id="onlyRiverFlow">
            <Bar data={riverData} options={options} />
          </article>
          <article className="canvas-container" id="onlyRiverFlowSmall">
            <Bar data={riverDataSmall} options={options} />
            <div className="labels">
              <ol> 
                {riverLabels}
              </ol>
            </div>
          </article>
        </div>
        <div className="creek" style={{display: displayCreek ? 'block': 'none'}}>
          <article className="canvas-container" id="onlyCreekFlow">
            <Bar data={creekData} options={options} />
          </article>
          <article className="canvas-container" id="onlyCreekFlowSmall">
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
        <article className="canvas-container" id="riverFlow">
          <Bar data={riverData} options={options} />
        </article>
        <article className="canvas-container" id="creekFlow">
          <Bar data={creekData} options={options} />
        </article>
      </div>
    </div>
  );
}

