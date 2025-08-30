import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import router from "./routes/propertyRoutes.js"
import connectDB from "./schema/db.js"

dotenv.config()



const app=express()

const start = async()=>{

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/',router)



app.listen(process.env.PORT,console.log("Server started on port 3000"))}
start()