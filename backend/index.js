require('dotenv').config({path: './'})
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connected")
}).catch(err){
    console.log("Database Not Connected",err)
}

app.listen(port,()=>{
    console.log("Server is Running")
})