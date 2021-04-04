import React, {useState, useEffect} from "react";
import {TextField} from "@material-ui/core";
import WeatherCard from "./WeatherCard";
import _ from "lodash";
import "./App.css";


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState({
    "weather": [
        {
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "humidity": 0
    },
    "wind": {
        "speed": 0,
        "deg": 0
    },
    "sys": {
        "sunrise": 0,
        "sunset": 0
    },
    "name": ""
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState({state: false, error_message: ""});
  
  // Update page when typing
  useEffect(() => {
    getWeather();
  }, [search]);
  
  // Get weather and set weatherData useState variable
  const getWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`)
    .then((res) => {
      const result = res.json();
      result.then(data => {
        // Successfully retrieved data
        if (data.cod === 200) {
          setError({state: false, error_message: ""});
          setWeatherData(data);
        }
        // Handle error
        else {
          handleError(data.message);
        }
      });
    });
  }

  function handleError(error) {
    setError({
      state: true,
      error_message: _.capitalize(error)
    });
  }

  function updateSearch(event) {
    const fieldValue = event.target.value;
    setSearch(fieldValue);
  }

  return (
    <div className="container">
      <div className="App">
        <form className="search-form">          
          {error.state ?
            <TextField 
              className="search-bar"
              id="standard-basic"
              onChange={updateSearch}
              label={search.length === 0 ? "Enter a location..." : "Location"}
              value={search}
              variant="outlined"
              helperText={search.length > 0 && error.error_message}
              error
            />
            :
            <TextField 
              className="search-bar"
              id="standard-basic"
              onChange={updateSearch}
              label="Location"
              value={search}
              variant="outlined"
            />
          }
        </form>

        <WeatherCard
          weatherData={weatherData}
        />

        
      </div>
    </div>
  );
}

export default App;