import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationInfo {
  city?: string;
  region?: string;
  country?: string;
  formattedAddress?: string;
}

export function useLocationName(location: Location.LocationObject | null) {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (!location) {
      setLocationInfo(null);
      return;
    }

    const getLocationName = async () => {
      setIsLoadingLocation(true);
      try {
        const { latitude, longitude } = location.coords;
        
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          
          const locationInfo: LocationInfo = {
            city: address.city || address.subregion || address.district || undefined,
            region: address.region || undefined,
            country: address.country || undefined,
            formattedAddress: formatAddress(address),
          };
          
          setLocationInfo(locationInfo);
        }
      } catch (error) {
        console.error('Error getting location name:', error);
        setLocationInfo(null);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocationName();
  }, [location]);

  return { locationInfo, isLoadingLocation };
}

function formatAddress(address: Location.LocationGeocodedAddress): string {
  const parts = [];
  
  if (address.city) {
    parts.push(address.city);
  } else if (address.subregion) {
    parts.push(address.subregion);
  } else if (address.district) {
    parts.push(address.district);
  }
  
  if (address.region && address.region !== parts[0]) {
    parts.push(address.region);
  }
  
  if (address.country && parts.length < 2) {
    parts.push(address.country);
  }
  
  return parts.join(', ') || 'Unknown Location';
}