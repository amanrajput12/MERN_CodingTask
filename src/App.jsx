import { useEffect, useState } from 'react'

import ReactLoading from 'react-loading';
import Statistics from './Statistics.jsx';
import Barchart from './Barchart.jsx';
import Pichart from './Pichart.jsx';
import Combine from './Combine.jsx';

function App() {
  const [Table, setTable] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [loading,setLoading] = useState("none")
 

  // const hooksale =  UseGetSaleData(1)
  useEffect(() => {
 
 
    getData()
  }, [])

  async function getData() {
    setLoading("flex")
    const data = await fetch("https://mern-codingtask.onrender.com/v1/data/get",{
      method:"GET"
    })
    const value = await data.json()
   
    setTable(value.data)
    setLoading("hidden")
  }
  const itemperpage = 10
  const indexlast = currentPage * itemperpage
  const indexStart = indexlast- itemperpage
let currentItem = Table.slice(indexStart,indexlast)

 async function MonthTransaction(value) {
  setCurrentPage(1)
  if(value == "Select Months"){
     getData()
     return 
  }
  else {
    setLoading("flex")
    const data = await fetch(`https://mern-codingtask.onrender.com/v1/data/getMonth?value=${value}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
     })
     const  resp = await data.json() 
   
     setTable(resp.data)
     setLoading("hidden")
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
 
  setLoading("flex")
   interval = setTimeout(async() => {
    const data = await fetch(`https://mern-codingtask.onrender.com/v1/data/query?query=${value}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const resp = await data.json()
    setTable(resp.data)
    if(resp){
      setLoading("hidden")
    }
  }, 1000);
 
 }

  return (
    <div className='bg-[#262625] text-white font-semibold font-sans w-screen'>
       <ReactLoading  className={`${loading} h-[100px] m-auto `}  />
    <div className='flex h-14 justify-around p-3 lg:h-16'>
      <input className='text-black w-1/2 lg:w-1/6 p-2 rounded-md' onChange={(e)=>handleQuery(e.target.value)} type="search"  placeholder='Search transaction'  />
      <select className='text-gray-900 w-1/3 lg:w-1/6' onChange={(e)=>MonthTransaction(e.target.value)} name="months" id="months">
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
    <table className='border-collapse w-full'>
  <thead className='sticky top-0 bg-stone-600'>
    <tr>
      <th className='border-solid border-2 p-2 w-1/12'>ID</th>
      <th className='border-solid border-2 p-2 w-2/12'>Title</th>
      <th className='border-solid hidden lg:table-cell border-2 p-2 w-2/12'>Description</th>
      <th className='border-solid border-2 p-2 w-2/12'>Price</th>
      <th className='border-solid border-2 p-2 w-2/12'>Category</th>
      <th className='border-solid border-2 p-2 w-1/12'>Sold</th>
      <th className='border-solid hidden lg:table-cell border-2 p-2 w-2/12'>Image</th>
    </tr>
  </thead>
  <tbody>
    {Table && currentItem.map((data) => (
      <tr key={data._id}>
        <td className='border-solid border-2 p-2 w-1/12'>{data._id}</td>
        <td className='border-solid border-2 p-2 w-2/12'>{data.title}</td>
        <td className='border-solid border-2 hidden lg:table-cell p-2 w-2/12'>{data.description}</td>
        <td className='border-solid border-2 p-2 w-2/12'>{data.price}</td>
        <td className='border-solid border-2 p-2 w-2/12'>{data.category}</td>
        <td className='border-solid border-2 p-2 w-1/12'>{String(data.sold)}</td>
        <td className='border-solid hidden lg:table-cell border-2 p-2 w-2/12'>
          <img className='w-full h-auto' src={data.image} alt="image" />
        </td>
      </tr>
    ))}
  </tbody>
</table>

       <div className='flex items-center justify-around p-5' >
        <h4>Page No: {currentPage}</h4>
        <h4>
          <button className='bg-cyan-800 p-2 rounded-md hover:bg-slate-800  m-2' onClick={()=>{
            if(currentPage>=1 && indexlast<=Table.length-1){
              setCurrentPage(currentPage+1)
            }
          }}>Next</button>
          <button className='bg-cyan-800 p-2 rounded-md hover:bg-slate-800  m-2' onClick={()=>{
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
      
    <Combine/>
    </div>
  )
}

export default App
