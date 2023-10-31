
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const connectDB= require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found')




//middleware

// for staticfiles

app.use(express.static('./public'))
app.use(express.json())

//routes


app.use('/api/v1/tasks',tasks)

app.use(notFound)

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}`)
        })
    }
    catch{

    }
}

start()