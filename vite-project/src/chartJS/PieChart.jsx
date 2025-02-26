import React from 'react'
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(Tooltip, Legend, ArcElement)

export default function PieChart() {


    const options = {
        responsive: true,

        //optional
        plugins: {
            title: {
                display: true,
                text: 'votes for color'
            },
            legend: {
                display: true,  // Hide the legend
                position:'right',
                labels: {
                    padding: 50, // Adjust the space between legend items
                   
                    font: {
                        size: 14, // Change font size if needed
                    }
                },
                padding: 100, // Adjust space between legend and chart
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

        // can add x and y axis scale property but pie chart doesn't need those attribute
        // scales: {
        //     x: {
        //         title: {
        //             display: true,
        //             text: 'Days of the Week'
        //         }
        //     },
        //     y: {
        //         title: {
        //             display: true,
        //             text: 'Sales Count'
        //         },
        //         min: 0, // Set min value for better visualization
        //         max: 20  // Set max value for better visualization
        //     }
        // }
    };


    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',    
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            hoverOffset: 10
        }]
    }
  return (
    <div style={{ width: '80%', height: '80%' }}>
        <Pie 
        options={options} 
        data={data}
        />
    </div>
  )
}
