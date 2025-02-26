import React from 'react'
import LineChart from './LineGraph'
import BarGraph from './BarGraph'
import PieChart from './PieChart'

export default function ChartJs() {
  return (
    <>
    <h1>Line chart</h1>
     <LineChart/> 
     <hr />
     <h1>Bar chart</h1>
     <BarGraph/>
     <hr />
     <h1>Pie chart</h1>
     <PieChart/>
    </>
  )
}
