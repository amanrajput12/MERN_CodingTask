import { useEffect, useState } from 'react'
import './App.css'
import ReactLoading from 'react-loading';
import Statistics from './Statistics.jsx';
import Barchart from './Barchart.jsx';
import Pichart from './Pichart.jsx';
function App() {
  const [Table, setTable] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [loading,setLoading] = useState("none")
  useEffect(() => {
    
    getData()
  }, [])

  async function getData() {
    setLoading("flex")
    const data = await fetch("http://localhost:4000/v1/data/get",{
      method:"GET"
    })
    const value = await data.json()
    console.log("data ", value)
    setTable(value.data)
    setLoading("none")
  }
  const itemperpage = 10
  const indexlast = currentPage * itemperpage
  const indexStart = indexlast- itemperpage
let currentItem = Table.slice(indexStart,indexlast)

 async function MonthTransaction(value) {
 
  setCurrentPage(1)
 
  console.log("value",value);
  if(value == "Select Months"){
     getData()
     console.log("select nothing");
     return 
  }
  else {
    setLoading("flex")
    const data = await fetch(`http://localhost:4000/v1/data/getMonth?value=${value}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
     })
     const  resp = await data.json() 
     console.log("on month data",resp);
     setTable(resp.data)
     setLoading("none")
  }
 }
 let interval 
 async function handleQuery(value){

  setCurrentPage(1)
 if(value==""){
  getData()
  return
 }

  if (interval) {
    clearTimeout(interval);
  }
  console.log(value);
  setLoading("flex")
   interval = setTimeout(async() => {
    const data = await fetch(`http://localhost:4000/v1/data/query?query=${value}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const resp = await data.json()
    setTable(resp.data)
    if(resp){
      setLoading("none")
    }
    console.log("on interval",resp);
  }, 1000);
 
 }

  return (
    <>
       <ReactLoading style={{display:`${loading}`,height:"100px", justifyContent:"center" }} type="balls" color={"#ffffff"}   />
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <input onChange={(e)=>handleQuery(e.target.value)} type="search"  placeholder='Search transaction'  />
      <select onChange={(e)=>MonthTransaction(e.target.value)} name="months" id="months">
        <option value="Select Months">Select Months</option>
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
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{position:"sticky" , top:"0px" , opacity:"0.9", backgroundColor:"burlywood"}}>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', width: '50px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '200px' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '300px' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '100px' }}>Price</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '150px' }}>Category</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '100px' }}>Sold</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '150px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {Table && currentItem.map((data) => (
            <tr key={data._id}>
              <td style={{ border: '1px solid black', padding: '8px', width: '50px' }}>{data._id}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '200px' }}>{data.title}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '300px' }}>{data.description}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '100px' }}>{data.price}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '150px' }}>{data.category}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '100px' }}>{String(data.sold)}</td>
              <td style={{ border: '1px solid black', padding: '8px', width: '150px' }}><img width="100px" src={data.image} alt="image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:"flex" , alignItems:"center" , justifyContent:"space-between"}}>
        <h4>Page No: {currentPage}</h4>
        <h4>
          <button onClick={()=>{
            if(currentPage>=1 && indexlast<=Table.length-1){
              setCurrentPage(currentPage+1)
            }
          }}>Next</button>
          <button onClick={()=>{
           if(currentPage>1){
           setCurrentPage(currentPage-1)
           }
          }} >Prev</button>
        </h4>
        <h4>Per page: {itemperpage}</h4>
      </div>
      <Statistics/>
      <Barchart/>
      <Pichart/>
    </>
  )
}

export default App
