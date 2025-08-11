import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  icon: string;
}

export function useWeather(location: Location.LocationObject | null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setIsLoadingWeather(true);
      try {
        // For demo purposes, we'll simulate weather data
        // In a real app, you'd make an API call to a weather service
        
        // Simulated weather data
        const mockWeather: WeatherData = {
          temperature: Math.round(20 + Math.random() * 15),
          humidity: Math.round(40 + Math.random() * 40),
          windSpeed: Math.round(Math.random() * 20),
          visibility: Math.round(8 + Math.random() * 7),
          description: 'Partly cloudy',
          icon: 'partly-cloudy',
        };

        setWeather(mockWeather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [location]);

  return { weather, isLoadingWeather };
}