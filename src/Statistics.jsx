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
setloading("none")
    }
  return (
    <div>
        <ReactLoading style={{display:`${loading}`,height:"100px", justifyContent:"center" }} type="balls" color={"#ffffff"}   /> 
      <div style={{display:"flex",gap:"100px", justifyContent:"center"}}>
        <h2>Statistcs - {month[monthvalue]}</h2>
        <select onChange={(e)=>{
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
      <div style={{display:"flex", justifyContent:"center"}}>
        <table style={{borderCollapse:"collapse" ,border:'1px solid white',padding:'10px'}}>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Sale</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{data?.totalsale}</td>
            </tr>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Sold Item</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{data?.totalSoldItem}</td>
            </tr>
            <tr>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>Total Not Sold Item</td>
                <td style={{border:"1px solid white",padding:"20px",width:"100px"}}>{data?.totalNotSoldItme}</td>
            </tr>
        </table>
      </div>
    </div>
  )
}

export default Statistics
