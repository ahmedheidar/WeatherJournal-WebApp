/* Global Variables */
const apiKey = '&appid=794608b32a376c12e5335b8f80175a2e&units=metric';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Getting the weather data using APIs
const getData = async function (url) {
    const res = await fetch(url);
    try {
        const result = await res.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Sending the weather data to the server side
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Retrieving the data from the server side
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = "Current temprature: " + Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = "How do you feel: " + allData.feel;
        document.getElementById("date").innerHTML = "Date: " + allData.date;
    }
    catch (error) {
        console.log("error", error);
    }
}

// EventListener methods
const showData = function(e){
    const zipCode =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    const url  = baseUrl+zipCode+apiKey;
    getData(url)
    .then(function(data){
        console.log(data);        
        console.log(newDate);
        postData('/add',{"temp":data.main.temp,"feel":feelings,"date":newDate})
        .then(retrieveData())
    })
}

//EventListeners
document.getElementById('generate').addEventListener('click',showData);
