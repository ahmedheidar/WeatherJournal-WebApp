// Setup empty JS object to act as endpoint for all routes
var projectData = {};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
app.listen(port,()=>{
    try{
        console.log(`Server running on localhost: ${port}`)
    }catch(error){
        console.log(error);
    }
})

// HTTP requests
app.get('/results',(req,res)=>{
    try{
        res.send(projectData);
    }catch(error){
        console.log(error);
    }
});

app.post('/add',(req,res)=>{
    try{
        projectData  = {"city":req.body.city,"temp":req.body.temperature,"feel":req.body.feeling,"date":req.body.todaysDate};
        console.log(projectData)
    }catch(error){
        console.log(error);
    }
});