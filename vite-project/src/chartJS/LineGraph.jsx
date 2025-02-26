import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import { 
    Chart, 
    CategoryScale, 
    LinearScale, 
    PointElement,   // to display point on the chart
    LineElement, // to make the lines onto the chart
    Title, 
    Tooltip,
    Legend 
} from 'chart.js'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


// line chart component 
export default function LineChart() {

    const [thirdDataSet, setThirdDataset] = useState([].fill(null))
    const options = {
        responsive: true,

        //optional
        plugins: {
            title: {
                display: true,
                text: 'Sales Data Over a Week'
            },
            // tooltip: {
            //     callbacks: {
            //         label: function(tooltipItem) {
            //             return `Sales: ${tooltipItem.raw}`;
            //         }
            //     }
            // }
        },

        // to control the x and y axis in the chart(graph)
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Count'
                },
                min: 0, // Set min value for better visualization
                max: 20  // Set max value for better visualization
            }
        }
    };


    // data to show on chart
    const data = {
        labels:[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ],
        datasets:[
            {
                label:"sales",
                data:[12,19,3,5,8,3,10],
                backgroundColor:"rgb(255, 99, 133)",
                // tension: 0.4, // This will make the line curvy
            },
            {
                label:"sales2",
                data:[10,5,7,15,2],
                backgroundColor:"rgb(115, 255, 7)",
                // tension: 0.4, // This will make the line curvy
            },
            {
                label:"sales2",
                data:thirdDataSet,
                backgroundColor:"rgb(7, 57, 255)",
                // tension: 0.4, // This will make the line curvy
            }

        ]
    }

    
    // useEffect(() => {
    //     const newDataset = [...thirdDataSet];
    //     for (let i = 0; i < data?.labels?.length; i++) {
    //         const value = prompt(`Enter a value for ${data.labels[i]}`);
    //         newDataset[i] = Number(value); // Update the state with the new value
    //     }
    //     setThirdDataset(newDataset); // Update state
    // },[])


    return (
        <div style={{ width: '70%', height: '400px' }}>
            <Line options={options} data={data} />
        </div>
    )
}

