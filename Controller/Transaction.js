import { Transcation } from "../Models/TransactionSchema.js";

export const CreateTransaction = async function(req,res){
 try {
     const {id,title,price,description,category,image,sold,dateOfSale} = req.body
     if(!(id,title,price,description,category,image,sold,dateOfSale)){
        return res.status(400).json({
            sucess:false,
            message:"All field are required"
        })
     }

const response = await Transcation.create({
    _id:id,
    title,
    price,
    description,
    category,
    image,
    sold,
    dateOfSale
})
if(response){
    res.status(201).json({
        sucess:true,
        message:"Date create sucessfully",
        data:response
    })
}
 } catch (error) {
    console.log("error on create data",error.message);
 }

}

export const GetTransaction = async function(req,res){
    try {
       const  response = await Transcation.find()
        // console.log(response);
        if(response){
            return res.status(200).json({
                sucess:true,
                message:"Data get sucessfully",
                data:response
            })
        }
    } catch (error) {
        console.log("error on getting data",error.message);
    }
}

export const GetMonthTransaction = async function(req,res){
    try {
        const {value} = req.query
        console.log(value);
        if(!value){
            return res.status(400).json({
                sucess:false,
                message:"Month value required"
            })
        }

        let response  = await Transcation.find()
        
         const data = response?.filter((data)=>new Date(data.dateOfSale).getMonth()==value)
         console.log(data);
        if(data){
            res.status(200).json({
                sucess:true,
                message:"Data get sucessfully",
                data:data

            })
        }
    } catch (error) {
        console.log("error on getting month transaction",error.message);
    }
}

export const queryData = async function(req,res){
    try {
        const {query} = req.query
        if(!query){
            return res.status(400).json({
                sucess:false,
                message:"query parmeter is required"
            })
        }
        const response  = await Transcation.find()
        const resp = response.filter((myvalue)=>{
            return  myvalue.title.includes(query) || myvalue.description.includes(query) ||  myvalue.price.toString().includes(query)
        })
        console.log("resp",resp);
        if(resp){
            return res.status(200).json({
                sucess:false,
                message:"data get sucessfully",
                data: resp
            })
        }
    } catch (error) {
        console.log("error on getting data",error.message);
    }
}