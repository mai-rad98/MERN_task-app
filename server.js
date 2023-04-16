const dotenv = require('dotenv').config()
const express = require('express')
const connectDB  = require('./backend/config/connectDB')
const Task = require('./backend/model/taskModel')
const app = express();


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
/* const logger = (req,res,next) => {
    console.log("middleware ran")
    console.log(req.method)
    next()
} */

//Routes
app.get("/",(req,res) => {
    res.send("Home Page")
})


//create a  task,post request

app.post('/api/tasks',async (req,res) => {
  /*   console.log(req.body)
    res.send("Task Created") */
    try{
          const task = await Task.create(req.body)
          res.status(200).json(task)

    }catch(error){
      res.status(500).json({msg: error.message})

    }

})

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    console.log('server running on port 5000 ')
})