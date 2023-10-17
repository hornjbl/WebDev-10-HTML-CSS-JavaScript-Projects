const urlKeyFile = "key.env";

fetch(urlKeyFile)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        return response.json();
    })
    .then((data) => {
        // console.log(data.apiKey);
        const weatherAPIKey = data.apiKey;

        const formElement = document.querySelector("form");
        const cityInputElement = document.getElementById("city-input");
        const weatherDataElement = document.getElementById("weather-data");

        formElement.addEventListener("submit", onSubmit);

        function onSubmit(event) {
            event.preventDefault();
            const cityValue = cityInputElement.value;
            console.log("The city that was provided was: " + cityValue);
            getWeatherData(cityValue);
        }

        async function getWeatherData(cityValue) {
            try {
                const weatherAPIResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherAPIKey}&units=metric`
                );

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
    })
    .catch((error) => {
        console.error("Fetch error: ", error);
    });
