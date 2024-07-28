import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import ReactLoading from 'react-loading';

const Barchart = () => {
    const [data,setData]= useState([])
    const [monthvalue,setmonthvalue]= useState(0)
    const [loading,setloading]= useState("none")
    const month =["January","February","March","April","May","June","July","August","September","October","November","December"]

    async function getdata(value){
        setloading("flex")
        const data = await fetch(`https://mern-codingtask.onrender.com/v1/data/barchart?month=${value}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const  resp = await data.json()
         setData(resp.data)
         setloading("hidden")
    }
    useEffect(()=>{
      getdata(0)
    },[])
  return (
    <div>
        <div>
        <ReactLoading  className={`${loading} h-[100px] m-auto `}  /> 
        </div>
        <div  className='flex justify-center items-center p-3 m-3 gap-12 '>
      <h3>Bar chart</h3>
      <select className='text-gray-900 w-1/3 h-10 lg:w-1/6' onChange={(e)=>{
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
      
      <Chart type='bar' height={600}  className="w-[90vw] h-auto" 
       series ={ [{
        name: 'barchart',
        data: data
      }] }
      options={
        {
      
            title: {
                text: `BarChar stats - ${month[monthvalue]}`,
                style: { fontSize: 17 },
              },
          
              xaxis: {
                categories: ["0-100","101-200","201-300","301-400","401-500","501-600","601-700","701-800","801-900","901-Above"],
                title: {
                  text: "Transactions",
                  style: { color: "#f22000", fontSize: 20 },
                },
              },
        }
      }
      />
    </div>
  )
}

export default Barchart
