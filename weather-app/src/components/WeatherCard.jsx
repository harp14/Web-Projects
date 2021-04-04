import React from "react";
import "./WeatherCard.css";
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

function WeatherCard(props) {
    // Weather data
    const weatherData = props.weatherData;
    
    // Location
    const location = weatherData.name;

    // Weather description
    const weatherDescription = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;

    // Temperature
    const currentTemperature = weatherData.main.temp;
    const feelsLikeTemperature = weatherData.main.feels_like;
    const maxTemperature = weatherData.main.temp_max;
    const minTemperature = weatherData.main.temp_min;
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;

    // Wind
    const windSpeed = Math.round((weatherData.wind.speed) * 2.237);
    const windDeg = weatherData.wind.deg;

    // Sunrise/sunset
    const sunrise = convertToLocaleTime(weatherData.sys.sunrise);
    const sunset = convertToLocaleTime(weatherData.sys.sunset);

    // Convert JSON time format to LocaleTimeString
    function convertToLocaleTime(time) {
        const convertedTime = new Date(time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return convertedTime;
    }
    
    return (
        <div className="weather-card">
            <Typography variant="h3">Weather in {location}</Typography>
            <img src={"http://openweathermap.org/img/wn/" + weatherIcon + "@4x.png"} alt="test"/>
            <Typography variant="h5">Current weather: {weatherDescription}.</Typography>
            <div className="info-section">
                <div className="info-box">
                    <Typography variant="h5" gutterBottom>Temperature</Typography>
                    <Typography variant="body1">Current temperature: {currentTemperature}&deg;C</Typography>
                    <Typography variant="body1">Feels like: {feelsLikeTemperature}&deg;C</Typography>
                    <Typography variant="body1">Max. temperature: {maxTemperature}&deg;C</Typography>
                    <Typography variant="body1">Min. temperature: {minTemperature}&deg;C</Typography>
                    <Typography variant="body1">Pressure: {pressure} hPa</Typography>
                    <Typography variant="body1">Humidity: {humidity}%</Typography>
                </div>
                <div className="info-box">
                    <Typography variant="h5" gutterBottom>Wind</Typography>
                    <Typography variant="body1">Wind speed: {windSpeed} mph</Typography>
                    <Typography variant="body1">Deg: {windDeg} degrees</Typography>
                </div>
                <div className="info-box">
                    <Typography variant="h5" gutterBottom>Sunrise/Sunset</Typography>
                    <Typography variant="body1">Sunrise: {sunrise}</Typography>
                    <Typography variant="body1">Sunset: {sunset}</Typography>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;