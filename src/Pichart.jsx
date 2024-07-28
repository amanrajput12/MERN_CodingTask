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
        const resp = await fetch(`https://mern-codingtask.onrender.com/v1/data/pichart?month=${month}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        const categories = data.response.map((item) => item.category)
        const values = data.response.map((item) => item.value)
        setData(values)
        setLabel(categories)
        setloading("hidden")
    }

    useEffect(()=>{
        getdata(0)
       },[])
  return (
    <div className='flex flex-col items-center' >
         <ReactLoading  className={`${loading} h-[100px] m-auto `}   /> 
        <div className='flex justify-center items-center m-2 gap-11'>
      <h2>Pi chart</h2>
      <select  className='text-gray-900 w-1/3 h-10 lg:w-1/2'  onChange={(e)=>{
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
      <Chart  className="w-[90vw]  lg:w-[50vw] h-auto"
      type="pie"
      
    
series={data}
      options={{
        title:{
            text:`Pi chart stats - ${month[monthvalue]}`,
            style: { color: "#f20001", fontSize: 18 },
        },
        noData:{text:"Empty Data"},
     labels:label
      }}
      />
    </div>
  )
}

export default Pichart
