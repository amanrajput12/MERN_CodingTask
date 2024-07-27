import mongoose from "mongoose";

const TransacationSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    dateOfSale:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sold:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Transcation = mongoose.model("Transaction",TransacationSchema)

export {Transcation}