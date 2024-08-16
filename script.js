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

async function main(lat, long = "") {
    try {
        let weatherResponse = await fetch(weatherUrl + lat + "," + long, weatherOptions);
        console.log(lat, long);
        let weatherResult = await weatherResponse.json();
        console.log(weatherResult);
        cityName.innerText = weatherResult.location.name;
        detailsOf.innerText = weatherResult.location.name;
        cityTemp.innerText = Math.round(weatherResult.current.temp_c) + "°";
        cityTime.innerText = weatherResult.location.localtime;
        document.getElementById("feelsLike").innerText = weatherResult.current.feelslike_c + "°c";
        document.getElementById("humidity").innerText = weatherResult.current.humidity + "%";
        document.getElementById("wind").innerText = weatherResult.current.wind_kph + " kph";
        document.getElementById("condition").innerText = weatherResult.current.condition.text;
        document.getElementById("update").innerText = weatherResult.current.vis_km + " km";
        let conditionArray = weatherResult.current.condition.text.split(" ");
        console.log(conditionArray);
        let rainFlag = false; let hotFlag = false;
        for (let i = 0; i < conditionArray.length; i++) {
            if (conditionArray[i] == "rain" || conditionArray[i] == "Mist") {
                rainFlag = true;
            }
            else if (conditionArray[i] == "Sunny" || conditionArray[i] == "Clear") {
                hotFlag = true;
            }
        }
        if (rainFlag) {
            document.getElementById("backgroundImage").src = "assets/rain.jpg";
        }
        else if (hotFlag) {
            document.getElementById("backgroundImage").src = "assets/hot.jpg";
        }
        else {
            if (weatherResult.current.temp_c > 19) {
                document.getElementById("backgroundImage").src = "assets/normal.jpg";
            }
            else {
                document.getElementById("backgroundImage").src = "assets/cold.jpg";
            }
        }
    }
    catch (error) {
        alert(error);
    }
}


submit.addEventListener("click", () => {
    main(input.value)
});

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        main(input.value)
    }
});

function gotPosition(position) {
    main(position.coords.latitude, position.coords.longitude)

}

function failed() {
    console.log("Location permission denied.");
    main(22.57, 88.37);
}

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(gotPosition, failed);
});