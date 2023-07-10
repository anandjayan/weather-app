const apikey = "b381dda21a04c7dc3ee6855835782053";
const weatherDataElement = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");
form.addEventListener("submit" , (event)=>{
   event.preventDefault();
   const cityName = cityInput.value;
   getWeatherData(cityName);
});

async function getWeatherData(cityName){
   try {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`)

     if(!response.ok){
        throw new Error("Network response was not okay")
     }
     const data = await response.json()
     
     const temperature = Math.round(data.main.temp)
     const description = data.weather[0].description
     const icon = data.weather[0].icon
     const details = [
      `feels like : ${Math.round(data.main.feels_like)}°C`,
      `humidity : ${data.main.humidity}%` ,
      `wind speed : ${data.wind.speed}m/s` ,
     ]

     weatherDataElement.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
     weatherDataElement.querySelector(
      ".temperature").textContent = `${temperature}°C`;
      weatherDataElement.querySelector(".description").textContent = description;
      weatherDataElement.querySelector('.details').innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");
     
      
     

   } catch (error) {
      weatherDataElement.querySelector(".icon").innerHTML = "";
      weatherDataElement.querySelector(
       ".temperature").textContent = "";
       weatherDataElement.querySelector(".description").textContent = "An error happened, please try again";
       weatherDataElement.querySelector('.details').innerHTML = "";
   }

}
