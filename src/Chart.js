import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';



export default function Charts(props) {
    
        const url = 'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&parameterCd=00010&statCd=00003&sites=14211720,%2014211542,%2014207200,%2014202000,%20453004122510301';
        const [water, setData] = useState(null);
        useEffect(() => {
          getData();
          
        }, [])
        async function getData(){
          try {
            const response = await axios.get(url);
            setData(response.data);
          } catch (err) {
            console.error(err);
          }
        }
        var data = []
        var options = []
        if(){
            defaults.color = 'white';
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
          
          var gauges = [{}]
          if(water){
            gauges[i] = {
              name: water.value.timeSeries[i].sourceInfo.siteName,
              site: water.value.timeSeries[i].sourceInfo.siteCode[0].value,
              lat:  water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude,
              long: water.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude,
              temp: water.value.timeSeries[i].values[0].value[0].value
            }
          }
          
          
          for(let i = 0; i < characters.length; i++){
            gauges
          }
          console.log(houses)
          var houses2 = []
          for(let i = 0; i < houses.length; i++){
            if(houses[i][1] > 1)
            houses2.push(houses[i])
          }
          console.log(houses2)
            // These labels appear in the legend and in the tooltips when hovering different arcs
          var houses3 = []
          var houses4 = []
          for(let i = 0; i < houses2.length; i++){
            houses3.push(houses2[i][0])
            houses4.push(houses2[i][1])
          }
          // eslint-disable-next-line no-const-assign
          data =  {
            labels: houses3,
            datasets: [{
                label: 'House Size',
                data: houses4,
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
        return(
          
          <div>
            <Bar data={data} options={options} />
          </div>
        );
}

