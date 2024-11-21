import React, { useState } from 'react';
import '../Component/Weather.css';

const Weather = () => {
  // State variables to store weather data
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);

  const search = async (city) => {
    if (city === "") {
      setError("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === 200) {
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setDescription(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setError(null);
      } else {
        setError("City not found.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ height: '100vh' }} className='w-full background flex justify-center items-center'>
      <div className='w-4/12 text-white font-bold subBack text-center p-4 rounded-2xl'>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder='Search'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-2/4 rounded-lg text-black p-2 font-semibold mx-1 my-3'
          />
          <button
            className='bg-yellow-600 ms-2 p-2 px-3 rounded-lg text-white'
            onClick={() => search(city)} // Trigger search on button click
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <hr />

        {city=="" && (
          <div>
              <div className="text-white flex justify-center mt-5">
                <img width={'200px'} src="https://cdn-icons-png.flaticon.com/512/1486/1486733.png" alt="" />
              </div>
              <h1 className='text-xl'>Search by City</h1>
          </div>
        )}

        {temperature !== null && !error && city && (
          <>
            <i className={`text-9xl m-7 mt-20 text-yellow-600 fa-solid fa-temperature-low`}></i>
            <h1 className='text-center m-5 text-7xl'>{temperature}°C</h1>
            <h3 className='text-center mb-28 text-5xl'>{city}</h3>

            <div className='flex justify-between m-3'>
              <div>
                <i className="fa-solid text-4xl fa-cloud"></i>
                <h1>{humidity}%</h1>
                <h1>Humidity</h1>
              </div>
              <div>
                <i className="fa-solid text-4xl fa-wind"></i>
                <h1>{windSpeed} m/s</h1>
                <h1>Wind Speed</h1>
              </div>
            </div>
            <div className="text-center mt-3">
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
                className="mx-auto"
              />
              <h4>{description}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
