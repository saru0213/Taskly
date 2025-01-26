import React, { useState, useEffect } from "react";
import { CloudIcon, SunIcon, CloudRainIcon, WifiOffIcon } from "lucide-react";

export function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          " http://api.weatherapi.com/v1/current.json?key=c308dfa679b04dbd923160917252501&q=Yavatmal&aqi=yes"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current.temp_c),
          description: data.current.condition.text,
          icon: data.current.condition.code,
        });
      } catch (err) {
        console.error("Weather Fetch Error:", err);
        setError(err);
      }
    };

    fetchWeather();
  }, []);

  const weatherIcons = {
    1000: <SunIcon className="w-12 h-12 text-yellow-500" />,
    1003: <CloudIcon className="w-12 h-12 text-gray-500" />,
    1063: <CloudRainIcon className="w-12 h-12 text-blue-500" />,
  };

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg flex items-center space-x-4">
        <WifiOffIcon className="w-12 h-12 text-red-500" />
        <div>
          <h3 className="font-semibold text-red-900">Network Error</h3>
          <p className="text-red-700">Unable to fetch weather data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-100 p-4 rounded-lg flex items-center space-x-4">
      {weather ? (
        <>
          {weatherIcons[weather.icon] || <CloudIcon />}
          <div>
            <h3 className="font-semibold text-primary-900">Current Weather</h3>
            <p className="text-primary-700">
              {weather.temperature}°C, {weather.description}
            </p>
          </div>
        </>
      ) : (
        <div className="animate-pulse">Loading weather...</div>
      )}
    </div>
  );
}
