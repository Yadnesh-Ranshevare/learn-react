import React from 'react'
import {Bar} from 'react-chartjs-2'
import { 
    Chart, 
    CategoryScale, 
    LinearScale, 
    Title, 
    Tooltip,
    Legend, 
    BarElement
} from 'chart.js'

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function BarGraph() {

    const options = {
        responsive: true,

        //optional
        plugins: {
            title: {
                display: true,
                text: 'Sales Data Over a Week'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Sales: ${tooltipItem.raw}`;
                    }
                }
            }
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
            },
            {
                label:"sales2",
                data:[10,5,7,15,2,13,8],
                backgroundColor:"rgb(115, 255, 7)",
            }

        ]
    }


  return (
    <div style={{ width: '70%', height: '400px' }}>
        <Bar options={options} data={data}/>
    </div>
  )
}
