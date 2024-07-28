import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import ReactLoading from 'react-loading';
const Pichart = () => {
    const [data,setData]= useState([])
    const [label,setLabel] = useState([])
    const [loading,setloading]= useState("none")
    const [monthvalue,setmonthvalue] = useState(0)

    const month =["January","February","March","April","May","June","July","August","September","October","November","December"]
   
    async function getdata(month){
       setloading("flex")
        const resp = await fetch(`/v1/data/pichart?month=${month}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        console.log("data are of pi chart",data);
        const categories = data.response.map((item) => item.category)
        const values = data.response.map((item) => item.value)
        setData(values)
        setLabel(categories)
        setloading("none")
    }

    useEffect(()=>{
        getdata(0)
       },[])
    console.log("set dagta",data,label);
  return (
    <div >
         <ReactLoading style={{display:`${loading}`,height:"100px", justifyContent:"center" }} type="balls" color={"#ffffff"}   /> 
        <div style={{display:"flex" ,justifyContent:"center",gap:"20px"}}>
      <h2>Pi chart</h2>
      <select onChange={(e)=>{
        getdata(e.target.value)
        setmonthvalue(e.target.value)
        }}  name="months" id="months">
       
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
      <Chart
      type="pie"
      width={1300}    
      height={600}
    
series={data}
      options={{
        title:{
            text:`Pi chart stats - ${month[monthvalue]}`,
            style: { color: "#f20001", fontSize: 30 },
        },
        noData:{text:"Empty Data"},
     labels:label
      }}
      />
    </div>
  )
}

export default Pichart
