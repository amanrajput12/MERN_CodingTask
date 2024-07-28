import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
const Statistics = () => {
    const [data,setdata]= useState("")
    const [loading,setloading]= useState("none")
    const [monthvalue,setmonthvalue]= useState(0)
    const month =["January","February","March","April","May","June","July","August","September","October","November","December"]
    useEffect(()=>{
saleStatistics(0)
    },[])
    async function saleStatistics(value){
        setloading("flex")
      const data = await fetch(`https://mern-codingtask.onrender.com/v1/data/sale?month=${value}`,{
        method:"GET",
        headers:{
        "Content-Type":"application/json"
        }
        
      }) 
      const resp =  await data.json()
      console.log("sale data are",resp);
setdata(resp.data)
setloading("hidden")
    }
  return (
    <div >
        <ReactLoading   className={`${loading} h-[100px] m-auto `}   /> 
      <div  className='flex h-14 justify-around p-3 lg:h-16'>
        <h2>Statistcs - {month[monthvalue]}</h2>
        <select className='text-gray-900 w-1/3 lg:w-1/6'  onChange={(e)=>{
            saleStatistics(e.target.value)
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
      <div className='flex justify-center'>
        <table  className='border-collapse w-full m-5 lg:w-1/2 lg:mx-auto'>
            <tr>
                <td  className='border-solid border-2 p-2 w-1/4 '>Total Sale</td>
                <td className='border-solid border-2 p-2 w-1/4'>{data?.totalsale}</td>
            </tr>
            <tr>
                <td className='border-solid border-2 p-2 w-1/4 '>Total Sold Item</td>
                <td className='border-solid border-2 p-2 w-1/4 '>{data?.totalSoldItem}</td>
            </tr>
            <tr>
                <td className='border-solid border-2 p-2 w-1/4 '>Total Not Sold Item</td>
                <td className='border-solid border-2 p-2 w-1/4 '>{data?.totalNotSoldItme}</td>
            </tr>
        </table>
      </div>
    </div>
  )
}

export default Statistics
