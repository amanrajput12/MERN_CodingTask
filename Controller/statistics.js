import { Transcation } from "../Models/TransactionSchema.js";
import axios from "axios"

export const GetSaleData = async function(req,res){
    try {
        const {month} = req.query
        if(!month){
            return res.status(400).json({
                sucess:false,
                message:"Month is required"
            })
        }
        const response = await Transcation.find()
         let totalsale =0;
         let totalSoldItem =0;
         let totalNotSoldItme =0;
        const data = response?.filter((data)=>new Date(data.dateOfSale).getMonth()==month).map((sale)=>{
             totalsale = totalsale + sale.price 
           
            if(sale.sold){
                totalSoldItem =  totalSoldItem +1
            }
            else if(!sale.sold){
                totalNotSoldItme = totalNotSoldItme +1
            }
            console.log("totalsale",totalsale,totalNotSoldItme,totalSoldItem);
        })
    res.status(200).json({
        sucess:true,
        message:"Sale data get sucessfully",
        data:{
            totalsale,
            totalSoldItem,
            totalNotSoldItme
        }
    })
        
    } catch (error) {
       console.log("error on getting data",error.message); 
    }
}

export const BarchartData = async function(req,res){
    try {
        const {month} = req.query
        console.log("month");
      let data =[0,0,0,0,0,0,0,0,0];
      const response = await Transcation.find()
      console.log("response",response);
      const resp =  response?.filter((data)=>new Date(data.dateOfSale).getMonth()==month)
      console.log("filter",resp);
    resp.map((value)=>{
        console.log(value.price);
        if (value.price >=0 && value.price<=100){
            data[0] =data[0]+1
        }
        else if(value.price >=101 && value.price<=200){
             data[1] = data[1]+1
        }
        else if(value.price >=201 && value.price<=300){
            data[2] = data[2]+1
       }
       else if(value.price >=301 && value.price<=400){
        data[3] = data[3]+1
   }    
   else if(value.price >=401 && value.price<=500){
    data[4] = data[4]+1
  }
  else if(value.price >=501 && value.price<=600){
    data[5] = data[5]+1
  }
  else if(value.price >=601 && value.price<=700){
    data[6] = data[6]+1
}
else if(value.price >=801 && value.price<=900){
    data[7] = data[7]+1
}
else if(value.price >=901){
    data[8] = data[8]+1
}
      })
      console.log("data",data);

      res.status(200).json({
        sucess:true,
        message:"Data get sucessfully",
        data:data
      })
    } catch (error) {
        console.log("error on getting data",error.message);
    }
}

export const PichartData = async function(req,res){
    try {
       const {month} = req.query 
       let data = []
       console.log("month",month);
       const response = await Transcation.find()
       const resp =  response?.filter((data)=>new Date(data.dateOfSale).getMonth()==month)
       console.log("filter",resp);
       resp.map((transaction)=>{
        console.log(transaction.category,data);
        const existingCategory = data.find(item => item.category === transaction.category);
        console.log("check",existingCategory);

        if (existingCategory) {
          
            existingCategory.value += transaction.price;
        }
        else {
        data.push({
            category: transaction.category,
            value: transaction.price 
        });
    }
       })
       
       if(data){
        res.status(200).json({
            sucess:true,
            message:"Data get sucessfully",
            response:data
        })
       }
    } catch (error) {
        console.log("error on getting data",error.message);
    }
}
export const combineData = async function(req,res){
    try {
        const {month} = req.query
        const barcharturl = `http://localhost:4000/v1/data/barchart?month=${month}`;
        const picharturl =`http://localhost:4000/v1/data/pichart?month=${month}`;
        const saleDataurl = `http://localhost:4000/v1/data/sale?month=${month}`;

        
        const pichartResponse = await axios.get(picharturl)
        const barrchartResponse = await axios.get(barcharturl)
        const saleDataResponse = await axios.get(saleDataurl)
        //  console.log("on combine",pichartResponse.data);
        const combineResponse = { 
            pichart:pichartResponse.data,
            barchart:barrchartResponse.data,
            saleData:saleDataResponse.data
        }
        console.log("combine data are ",combineResponse);
        if(combineResponse){
             res.status(200).json({
                sucess:true,
                message:"Get data sucess",
                data:combineResponse
             }) 
        }
    } catch (error) {
        console.log("error on getting data",error.message);
    }
}