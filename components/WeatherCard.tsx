import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react-native';
import { WeatherData } from '@/hooks/useWeather';
import * as Location from 'expo-location';

interface WeatherCardProps {
  weather: WeatherData | null;
  isLoading: boolean;
  location: Location.LocationObject;
}

export function WeatherCard({ weather, isLoading, location }: WeatherCardProps) {
  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4FC3F7" />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Weather data unavailable</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Thermometer size={28} color="#4FC3F7" />
        <Text style={styles.cardTitle}>Current Climate</Text>
      </View>

      <View style={styles.mainWeather}>
        <Text style={styles.temperature}>{weather.temperature}°C</Text>
        <Text style={styles.description}>{weather.description}</Text>
      </View>

      <View style={styles.weatherGrid}>
        <View style={styles.weatherItem}>
          <Droplets size={20} color="#4FC3F7" />
          <Text style={styles.weatherLabel}>Humidity</Text>
          <Text style={styles.weatherValue}>{weather.humidity}%</Text>
        </View>

        <View style={styles.weatherItem}>
          <Wind size={20} color="#4FC3F7" />
          <Text style={styles.weatherLabel}>Wind</Text>
          <Text style={styles.weatherValue}>{weather.windSpeed} km/h</Text>
        </View>

        <View style={styles.weatherItem}>
          <Eye size={20} color="#4FC3F7" />
          <Text style={styles.weatherLabel}>Visibility</Text>
          <Text style={styles.weatherValue}>{weather.visibility} km</Text>
        </View>
      </View>

      <View style={styles.locationInfo}>
        <Text style={styles.locationText}>
          📍 {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    padding: 20,
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 24,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4FC3F7',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weatherItem: {
    alignItems: 'center',
    flex: 1,
    padding: 12,
    backgroundColor: '#E1F5FE',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  weatherLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationInfo: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
});