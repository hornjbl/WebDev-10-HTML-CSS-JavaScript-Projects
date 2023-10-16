let weatherAPIKey = "";

function readFile() {
    const fileInput = document.getElementById("api-file");

    // Check if a file has been selected
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const reader = new FileReader();

        // Define the action to take when the file is loaded
        reader.onload = function (event) {
            const fileContent = event.target.result;
            weatherAPIKey = JSON.parse(fileContent).apiKey;
            // console.log(`Weather API Key: ${weatherAPIKey}`);
        };

        console.log(`Weather API Key: ${weatherAPIKey}`);
        // Read the file as text
        // reader.readAsText(selectedFile).json();
        // console.log(reader.readAsText(selectedFile));
    } else {
        console.log("No file selected");
    }
}

console.log(`Weather API Key: ${weatherAPIKey}`);

const apiFileInput = document.getElementById("api-file");
apiFileInput.addEventListener("change", readFile);

const formElement = document.querySelector("form");
const cityInputElement = document.getElementById("city-input");
const weatherDataElement = document.getElementById("weather-data");

function onSubmit(event) {
    event.preventDefault();
    const cityValue = cityInputElement.value;
    console.log("The city that was provided was: " + cityValue);
    getWeatherData(cityValue);

    // weatherDataElement.style.display = "flex";
}

formElement.addEventListener("submit", onSubmit);

async function getWeatherData(cityValue) {
    try {
        const weatherAPIResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherAPIKey}&units=metric`);

        if (!weatherAPIResponse.ok) {
            throw new Error("Network response was not OK");
        }

        const dataJSON = await weatherAPIResponse.json();

        console.log("JSON data is: ");
        console.log(dataJSON);

        const weatherTempAct = Math.round(dataJSON.main.temp);
        const weatherTempMin = Math.round(dataJSON.main.temp_min);
        const weatherTempMax = Math.round(dataJSON.main.temp_max);
        weatherDataElement.querySelector(".temp-actual").textContent = `${weatherTempAct}°C`;
        weatherDataElement.querySelector(".temp-minimum").textContent = `${weatherTempMin}°C`;
        weatherDataElement.querySelector(".temp-maximum").textContent = `${weatherTempMax}°C`;

        const weatherDescription = dataJSON.weather[0].description;
        weatherDataElement.querySelector(".description").textContent = weatherDescription;

        const weatherWindSpeed = dataJSON.wind.speed;
        weatherDataElement.querySelector("#wind-speed").innerText = `Wind speed: ${weatherWindSpeed} m/s`;

        const weatherFeelsLike = Math.round(dataJSON.main.feels_like);
        weatherDataElement.querySelector("#feels-like").innerText = `Feels like: ${weatherFeelsLike}°C`;

        const weatherHumidity = dataJSON.main.humidity;
        weatherDataElement.querySelector("#humidity").innerText = `Humidity: ${weatherHumidity}%`;

        console.log("Temp: " + weatherTemperature);
    } catch (error) {}
}
