const express = require('express');
const mongoose = require('mongoose')
const workoutRoute = require('./routes/workoutRoute')
const  userRoutes= require('./routes/user')

require('dotenv').config();
const app = express();
const PORT = process.env.PORT 
const MONGODBURL = process.env.MONGODB_URL;


app.use(express.json())

mongoose.connect(MONGODBURL)
.then(()=>{
    console.log('Connected to mongodb');
})
.catch(err=>console.log(err.message))

app.get('/', (req,res)=>{
    res.send('Hello backend');
})

app.use('/api/workouts', workoutRoute)
app.use('/api/user', userRoutes)


app.listen(PORT, ()=>{
    console.log(`Server listening on port  ${PORT}`)
})