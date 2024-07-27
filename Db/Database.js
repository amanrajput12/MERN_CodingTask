import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        console.log("mongodb uri",process.env.MONGODB_URI);
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Datbase connection sucessfully");
    } catch (error) {
        console.log("database not connect",error.message);
    }
}

export default connectDb