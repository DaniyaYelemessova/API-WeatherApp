import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getWeather(city){
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if(this.status === 200){
      printElements(response, city);
    }else{
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printError(request,apiResponse, city){
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}


function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Celsius is ${apiResponse.main.temp.toFixed(0)} degrees.`;
}

function handleFormSubmission(e){
  e.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);