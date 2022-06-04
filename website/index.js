var form1 = document.getElementById('form1');
var form2 = document.getElementById('form2');

let weather = {
    apiKey: '794608b32a376c12e5335b8f80175a2e',
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.apiKey + '&units=metric'
        ).then((res) =>
            res.json()
            ).then((data) => 
                this.weatherData(data)
            )
    },
    weatherData: (data) => {
        console.log(data)
        let date = new Date();
        const temprature = data.main.temp;
        const todaysDate = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();
        const city = data.name;
        const feeling = document.getElementById('feeling').value;
        postData('/add',{city,"temperature":temprature,todaysDate,feeling})
        .then(retrieveData())
    }
}

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

const retrieveData = async () => {
    const request = await fetch('/results');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        form2.querySelector("#city").innerHTML = allData.city;
        form2.querySelector("#temperature").innerHTML =  allData.temp + ' degrees';
        form2.querySelector("#feelingResult") .innerHTML = allData.feel;
        form2.querySelector("#date").innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
    }
}


form1.addEventListener('submit',(event)=>{
    event.preventDefault();
    var city = document.getElementById('zipCode').value;
    weather.fetchWeather(city);
})