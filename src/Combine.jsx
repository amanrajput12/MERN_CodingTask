import React, { useEffect, useState } from 'react'
import ReactLoading from "react-loading"
import Chart from 'react-apexcharts'
import axios from "axios"
const Combine = () => {
    const [statisticsData,setStatisticsData] = useState()
    const [barchartData,setBarchartData] = useState()
    const [pichartData,setPiChartData] = useState([])
    const [pichartlabel,setPiChartLabel] = useState([])
    const [monthvalue,setmonthvalue]= useState(0)
    const [loading,setloading]= useState("none")
    const month =["January","February","March","April","May","June","July","August","September","October","November","December"]
    useEffect(()=>{
    getresponse(0)
    },[])
    async function getresponse(month){
        try {
            setloading("flex")
             const response = await axios.get(`https://mern-codingtask.onrender.com/v1/data/combinedata?month=${month}`)
             console.log("data of combine fetch",response.data.data);
             if(response.data.data){
                setStatisticsData(response.data.data.saleData.data)
                setBarchartData(response.data.data.barchart.data)
             const pichart = response.data.data.pichart.response
             console.log("for pi chart",pichart);
                const categories = pichart.map((item) => item.category)
                const values = pichart.map((item) => item.value)
                console.log("filter pi chart",categories,values);
                setPiChartData(values)
                setPiChartLabel(categories)
                setloading("none")
             }
        } catch (error) {
            console.log("error on geeting data",error.message);
        }
    }
  return (
    <div>
      <ReactLoading style={{display:`${loading}`,height:"100px", justifyContent:"center" }} type="balls" color={"#ffffff"}   /> 
          {/* heder */}
          <div style={{display:"flex" ,justifyContent:"center" ,padding:"10px",gap:"20px"}}>
            <h2>Combine</h2>
            <select onChange={(e)=>{
            getresponse(e.target.value)
            setmonthvalue(e.target.value)
        }
            }  name="months" id="months">
       
        <option value="0">Janurary</option>
        <option value="1">Faburary</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5" >June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>
          </div>

          {/* chart */}
          <div style={{display:"flex",justifyContent:"space-around"}}>
          <table style={{borderCollapse:"collapse" ,border:'1px solid white',padding:'10px'}}>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Sale</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{statisticsData?.totalsale}</td>
            </tr>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Sold Item</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{statisticsData?.totalSoldItem}</td>
            </tr>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Not Sold Item</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{statisticsData?.totalNotSoldItme}</td>
            </tr>
        </table>
        <Chart type='bar'  width={600} height={400} 
       series ={ [{
        name: 'series-1',
        data: barchartData
      }] }
      options={
        {
      
            title: {
                text: `BarChar stats - ${month[monthvalue]}`,
                style: { fontSize: 20 },
              },
          
              xaxis: {
                tickPlacement: "on",
                categories: ["0-100","101-200","201-300","301-400","401-500","501-600","601-700","701-800","801-900","901-Above"],
                title: {
                  text: "Transactions",
                  style: { color: "#f20001", fontSize: 30 },
                },
              },
        }
      }
      />
      {/* pi chart */}

      <Chart 
      type="pie"
      width={600}    
      height={400}
    
series={pichartData}
      options={{
        title:{
            text:`Pi chart stats - ${month[monthvalue]}`,
            style: { color: "#f20001", fontSize: 30 },
        },
        noData:{text:"Empty Data"},
     labels:[pichartlabel]
      }}
      />
          </div>
    </div>
  )
}

export default Combine
