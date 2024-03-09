let weatherUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
let timeUrl = 'https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=';
let submit = document.getElementById("submit");
let input = document.getElementById("city");
let cityTemp = document.getElementById("cityTemp");
let cityName = document.getElementById("cityName");
let cityTime = document.getElementById("cityTime");
let detailsOf = document.getElementById("detailsOf");
const weatherOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1f45f357c0msh1d34da40c45f9d9p172a1cjsnb1513fe362c0',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
const timeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1f45f357c0msh1d34da40c45f9d9p172a1cjsnb1513fe362c0',
		'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
	}
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function main(city){
    try {
        let weatherResponse = await fetch(weatherUrl+city, weatherOptions);
        let weatherResult = await weatherResponse.json();
        let timeResponse = await fetch(timeUrl+city, timeOptions);
        let timeResult = await timeResponse.json();
        cityName.innerText = capitalizeFirstLetter(city);
        detailsOf.innerText = capitalizeFirstLetter(city);
        cityTemp.innerText = weatherResult.temp + "°";
        cityTime.innerText = timeResult.date + "," + " " + timeResult.hour + ":" + timeResult.minute;
        document.getElementById("feelsLike").innerText = weatherResult.feels_like + "°";
        document.getElementById("humidity").innerText = weatherResult.humidity + "%";
        document.getElementById("wind").innerText = weatherResult.wind_speed + "km/h";
        document.getElementById("maxTemp").innerText = weatherResult.max_temp + "°";
        document.getElementById("minTemp").innerText = weatherResult.min_temp + "°";
        if (weatherResult.temp > 26) {
            document.getElementById("backgroundImage").src = "assets/hot.jpg";
        }
        else if (weatherResult.temp < 19) {
            document.getElementById("backgroundImage").src = "assets/cold.jpg";
        }
        else{
            document.getElementById("backgroundImage").src = "assets/normal.jpg";
        }
    } 
    catch (error) {
        console.error(error);
    }
}

submit.addEventListener("click",()=>{
    main(input.value)
})

document.addEventListener("keyup",(e)=>{
    if (e.key == "Enter") {
        main(input.value)
    }
})

main("Dehli")