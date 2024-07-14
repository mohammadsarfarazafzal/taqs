let weatherUrl = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
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
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function main(city){
    try {
        let weatherResponse = await fetch(weatherUrl+city, weatherOptions);
        let weatherResult = await weatherResponse.json();
        console.log(weatherResult);
        cityName.innerText = capitalizeFirstLetter(city);
        detailsOf.innerText = capitalizeFirstLetter(city);
        cityTemp.innerText = Math.round(weatherResult.current.temp_c) + "°";
        cityTime.innerText = weatherResult.location.localtime;
        document.getElementById("feelsLike").innerText = weatherResult.current.feelslike_c + "°c";
        document.getElementById("humidity").innerText = weatherResult.current.humidity + "%";
        document.getElementById("wind").innerText = weatherResult.current.wind_kph + "kph";
        document.getElementById("condition").innerText = weatherResult.current.condition.text;
        document.getElementById("update").innerText = weatherResult.current.last_updated;
        if (weatherResult.current.temp_c > 26) {
            document.getElementById("backgroundImage").src = "assets/hot.jpg";
        }
        else if (weatherResult.current.temp_c < 19) {
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
});

document.addEventListener("keyup",(e)=>{
    if (e.key == "Enter") {
        main(input.value)
    }
});

main("Kolkata");