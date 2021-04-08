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
  const [gotLocation, setGotLocation] = useState(false);

  // Update page when typing
  useEffect(() => {
    getWeather();
  }, [search]);
  
  // Return client's current coordinates
  const getLocation = new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition((data, err) => { 
        if (!err) {
          const locationData = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
          }
          resolve(locationData);
        } else {
          reject(new Error(err));
        }
      });
    }
  });
  
  // Get weather and set weatherData useState variable
  const getWeather = async () => {  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`)
    .then(res => {
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
    })
    .catch(error => {
      console.log(error);
    });
  }


  // If not got current location get coordinates and pass to getLocality
  if (!gotLocation) {
    getLocation
    .then((data) => {
      getLocality(data);
    })
    .catch((error) => {
        console.log(error);
      }
    );
  }

  // Get locality and set as current search value
  const getLocality = async (coordinates) => {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((res) => {
      const response = res.json();
      response.then(data => {
        setSearch(data.locality);
        setGotLocation(true);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Show error within location bar
  function handleError(error) {
    setError({
      state: true,
      error_message: _.capitalize(error)
    });
  }

  // Handle search field value change which in turn causes useEffect to run
  function updateSearch(event) {
    const fieldValue = event.target.value;
    setSearch(fieldValue);
  }

  return (
    <div className="container">
      <div className="App">
        <div className="search-form">          
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
        </div>
        <WeatherCard
          weatherData={weatherData}
        />
      </div>
    </div>
  );
}

export default App;