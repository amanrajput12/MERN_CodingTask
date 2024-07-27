import React from 'react'
import Chart from 'react-apexcharts'
const Pichart = () => {
  return (
    <div >
      <h2>Pi chart</h2>
      <Chart
      type="pie"
      width={1300}    
      height={600}
    
series={[20,20,123]}
      options={{
        title:{
            text:"student data",
            style: { color: "#f20001", fontSize: 30 },
        },
        noData:{text:"Empty Data"},
     labels:["hindi","English","Math"]
      }}
      />
    </div>
  )
}

export default Pichart
