require('dotenv').config({ path: './mong.env' });
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productRoutes = require("./routes/productRoutes")
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', productRoutes)
app.use('/api/v1',userRoutes)
const port = 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Database Not Connected",err)
})

app.listen(port,()=>{
    console.log("Server is Running")
})