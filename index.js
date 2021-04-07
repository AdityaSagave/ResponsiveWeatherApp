let weather = {
    apikey: "3d47abbbbf8b97cb262a7926f77923c7",

    fetchWeather: function (city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apikey
            )
            .then((Response) => Response.json())
            .then((data) => this.displayWeather(data))
    },

    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = "Humidity : " + humidity + "%";
        document.querySelector('.wind').innerText = "Wind Speed : " + speed + " Km/h";
        document.querySelector('.temp').innerText = Math.round(temp) + " °C";
        document.querySelector('.impe').addEventListener('click', function () {
            document.querySelector('.temp').innerText = Math.round((temp * (9 / 5)) + 32) + " °F";
        });
        document.querySelector('.metr').addEventListener('click', function () {
            document.querySelector('.temp').innerText = Math.round(temp) + " °C";
            // document.querySelector('.temp').innerText = Math.round((temp - 32)/1.8) + " °C";
            // div.classList.toggle('metr');
        });
        document.querySelector('.weather').classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";

    },

    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});


document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});

weather.fetchWeather('London');