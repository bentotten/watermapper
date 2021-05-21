import { useEffect, useState } from "react";
import axios from 'axios';
import { Bar, defaults } from 'react-chartjs-2';



export default function Charts(props) {
    
        const url = 'https://thronesapi.com/api/v2/Characters';
        const [characters, setCharacters] = useState(null);
        useEffect(() => {
          getCharacters();
          
        }, [])
        async function getCharacters(){
          try {
            const response = await axios.get(url);
            setCharacters(response.data);
          } catch (err) {
            console.error(err);
          }
        }
        var data = []
        var options = []
        if(characters){
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
          
          var houses = [[]]
          houses.push(["none",0])
          
          
          for(let i = 0; i < characters.length; i++){
            var found = false
            for(let j = 1; j < houses.length; j++){
              if(characters[i].family === "None" || characters[i].family === '' || characters[i].family === 'Unknown' || characters[i].family === 'Free Folk'){
                houses[j][1]++
                found = true
                break
              }
              else if(i !== 0){
                if(houses[j][0].substring(houses[j][0].length - 5)===characters[i].family.substring(characters[i].family.length - 5)){
                  houses[j][1]++
                  if(houses[j][0].length < characters[i].family.length){
                    houses[j][0] = characters[i].family
                  }
                  found = true
                  break
                }
              }
            }
            if(found===false){
              houses.push([characters[i].family,1])
              if(houses[houses.length-1][0].substring(0,5) !== "House"){
                houses[houses.length-1][0] = "House " + houses[houses.length-1][0]
              }
            }
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

