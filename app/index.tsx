import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { Sun, MapPin } from 'lucide-react-native';
import { useSunPosition } from '@/hooks/useSunPosition';
import { useWeather } from '@/hooks/useWeather';
import { useLocationName } from '@/hooks/useLocationName';
import { SunPositionCard } from '@/components/SunPositionCard';
import { WeatherCard } from '@/components/WeatherCard';
import { CompassCard } from '@/components/CompassCard';

export default function SunPositionScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const { sunPosition, sunSide } = useSunPosition(location, heading);
  const { weather, isLoadingWeather } = useWeather(location);
  const { locationInfo, isLoadingLocation } = useLocationName(location);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show sun position');
        setIsLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);

      // Start watching heading changes
      const headingSubscription = await Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading || headingData.magHeading);
      });

      setIsLoading(false);

      return () => {
        headingSubscription?.remove();
      };
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get location');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#FFE082', '#FF8A65', '#FF7043']}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </LinearGradient>
    );
  }

  if (!location) {
    return (
      <LinearGradient
        colors={['#FFE082', '#FF8A65', '#FF7043']}
        style={styles.loadingContainer}
      >
        <Sun size={64} color="#FFF" />
        <Text style={styles.errorText}>Location access required</Text>
        <Text style={styles.errorSubtext}>Please enable location services to see sun position</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#87CEEB', '#FFE082', '#FF8A65']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Sun size={32} color="#FFF" />
          <Text style={styles.title}>Sun Position</Text>
          <Text style={styles.subtitle}>While traveling</Text>
          
          {locationInfo && (
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#FFF" />
              <Text style={styles.locationText}>
                {isLoadingLocation ? 'Getting location...' : locationInfo.formattedAddress}
              </Text>
            </View>
          )}
        </View>

        <SunPositionCard 
          sunPosition={sunPosition}
          sunSide={sunSide}
          heading={heading}
        />

        <CompassCard heading={heading} />

        <WeatherCard 
          weather={weather}
          isLoading={isLoadingWeather}
          location={location}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  errorText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    opacity: 0.9,
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    maxWidth: '90%',
  },
  locationText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    textAlign: 'center',
    opacity: 0.95,
  },
});
