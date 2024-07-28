import express from "express"
import dotenv from "dotenv"
import connectDb from "./Db/Database.js";
import {CreateRouter} from "./Router/CreateData.js"
import cors from "cors"
const app = express()
dotenv.config();
const port = process.env.PORT || 4000
connectDb()
app.use(cors({
    origin: 'https://merncodingtask.vercel.app/'
  }));
app.use(express.json());

app.use('/v1/data',CreateRouter)
app.get('/',(req,res)=>{
    res.send("Hello ")
})
 


app.listen(port,()=>{
    console.log(`App is listen at port ${port}`);
})
