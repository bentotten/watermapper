import { useEffect, useState } from "react";
import { Chart } from 'react-chartjs-2';

// URL to Game of Thrones API to fetch all characters
let url = 'https://thronesapi.com/api/v2/Characters';
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


export default function Houses(props) {
    const [data, setData] = useState(null);
    const [chart, setChart] = useState(null);

    const getData = async function () {
        const axios = require('axios');

        try {
            let response = await axios.get(url)
            let data = response.data

            let results = {};
            results.counter = {}; // Adds new houses and keeps track of number of people in them
            results.houses = {}; // Adds peoples names to the houses
            let counter = {}
            let houses = {}

            // Parse name and make more coherent
            let name = (chara) => {
                if (chara.lastName.toLowerCase() === 'unknown' || chara.lastName.toLowerCase() === 'none') {
                    return chara.firstName
                }
                else if (chara.firstName.toLowerCase() === 'unknown' || chara.firstName.toLowerCase() === 'none') {
                    return chara.lastName
                }
                else {
                    return chara.firstName + " " + chara.lastName
                }
            };

            let house = ''
            for (const character of data) {
                house = (character.family).replace(/[^a-z]/gi, '').replace("House", '')

                // Fix spelling mistakes because its like looking at a slightly off-center painting
                if (house === '' || house.toLowerCase() === 'none' || house.toLowerCase() === 'unkown') { house = 'Unknown' }
                else if (house === 'Lanister') { house = 'Lannister' }
                else if (house === 'Lorathi') { house = 'Lorath' }
                else if (house === 'Targaryan') { house = 'Targaryen' }

                if (house !== 'Unknown') { house = 'House of ' + house }

                // Put into results object
                if (house in counter) {
                    houses[`${house}`].push(name(character))
                    counter[`${house}`] += 1
                }
                else {
                    houses[`${house}`] = [`${name(character)}`]
                    counter[`${house}`] = 1
                }
            }

            // If less than 2 people, dont include in chart
            for (const el in counter) {
                if (counter[`${el}`] >= 2) {
                    results.counter[`${el}`] = counter[`${el}`]
                    results.houses[`${el}`] = (houses[el])
                }
            }


            let makeChart = (results) => {
                let ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(results.counter),
                        datasets: [{
                            label: 'Houses',
                            data: Object.values(results.counter),
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItems, data) {
                                    let array = results.houses[`${data.labels[tooltipItems.index]}`].join(', ')
                                    return data.labels[tooltipItems.index] +
                                        " : " +
                                        array;
                                }
                            }
                        }
                    }
                });

                setChart(myChart);
            }

            makeChart(results)
            setData(results)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="m-2" >
            <h2>Houses</h2>
            <br />
            <main className="container border rounded bg-light w-75 mt-5">
                <canvas id="myChart" aria-label="donut chart" role="img"></canvas>
            </main>
        </div>
    )
}

