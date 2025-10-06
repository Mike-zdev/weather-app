const weatherForm=document.querySelector(".weatherForm");
const card=document.querySelector(".card");
const cityName=document.querySelector(".cityName");
const apiKey="1991a3bcae0e14b2360cf042f4af2088";
weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityName.value;
    if(city){
        try{
const weatherData=await getWeatherData(city);
displayWeatherInfo(weatherData);

        }
        catch(error){
            errorDisplay(error);
        }

    }
    else errorDisplay("please,enter a city");
})
async function getWeatherData(city){
const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const response=await fetch(apiUrl);

if(!response.ok){
    throw new Error("resource can't be fetched!");
}

return await response.json();
}
function errorDisplay(message){
    card.textContent="";
    const msg=document.createElement("p");
    msg.textContent=message;
    card.appendChild(msg);
    card.style.display="flex";
    msg.classList.add("errorDisplay");
}
function displayWeatherInfo(data){
    console.log(data);
    let {name:city,sys:{country},main:{temp,humidity},weather:[{id,description}]}=data;
    card.textContent="";
    const cityDisplay=document.createElement("p");
    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");
    cityDisplay.textContent=`${city},${country}`;
    cityDisplay.classList.add("cityDisplay");
    const tempDisplay=document.createElement("p");
    temp=(temp-273).toFixed(1)+" ℃";
    tempDisplay.textContent=temp;
    tempDisplay.classList.add("errorDisplay");
    tempDisplay.classList.add("tempDisplay");
    const humidityDisplay=document.createElement("p");
    humidityDisplay.textContent=`Humidity:${humidity} %`;
    humidityDisplay.classList.add("humidityDisplay");
    const descDisplay=document.createElement("p");
    descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");
    const weatherEmoji=document.createElement("p");
    weatherEmoji.textContent=getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.style.display="flex";
}

function getWeatherEmoji(id){
switch(true){
    case (id>=200 && id<300):
        return "⛈";
    case (id>=300 && id<400):
        return "⛈";
    case (id>=400 && id<500):
        return "⛈";
    case (id>=500 && id<600):
        return "⛈";
    case (id>=600 && id<700):
        return "❄";
    case (id>=700 && id<800):
            return "🌫";
    case (id===800):
        return "☀";
    case (id>=801 && id<810):
            return "⛈";
    default:
        return "❓";
}
}
