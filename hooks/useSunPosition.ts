import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface SunPosition {
  azimuth: number;
  elevation: number;
  isVisible: boolean;
}

export type SunSide = 'left' | 'right' | 'front' | 'back' | 'above';

export function useSunPosition(location: Location.LocationObject | null, heading: number) {
  const [sunPosition, setSunPosition] = useState<SunPosition>({
    azimuth: 0,
    elevation: 0,
    isVisible: false,
  });
  const [sunSide, setSunSide] = useState<SunSide>('front');

  useEffect(() => {
    if (!location) return;

    const calculateSunPosition = () => {
      const now = new Date();
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      // Calculate sun position using astronomical formulas
      const position = getSunPosition(now, lat, lon);
      setSunPosition(position);

      // Determine which side of vehicle the sun is on
      const relativeBearing = (position.azimuth - heading + 360) % 360;
      const side = getSunSide(relativeBearing, position.elevation);
      setSunSide(side);
    };

    calculateSunPosition();
    const interval = setInterval(calculateSunPosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [location, heading]);

  return { sunPosition, sunSide };
}

function getSunPosition(date: Date, lat: number, lon: number): SunPosition {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  // Julian day
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;
  const jd = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  const n = jd - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = rad * ((357.528 + 0.9856003 * n) % 360);
  const lambda = rad * (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));

  // Hour angle
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const h = rad * (15 * (hours - 12) + lon);

  // Declination
  const delta = Math.asin(Math.sin(lambda) * Math.sin(rad * 23.439));

  // Elevation
  const elevation = Math.asin(
    Math.sin(rad * lat) * Math.sin(delta) + 
    Math.cos(rad * lat) * Math.cos(delta) * Math.cos(h)
  ) * deg;

  // Azimuth
  const azimuth = (Math.atan2(
    -Math.sin(h),
    Math.tan(delta) * Math.cos(rad * lat) - Math.sin(rad * lat) * Math.cos(h)
  ) * deg + 180) % 360;

  return {
    azimuth,
    elevation,
    isVisible: elevation > 0,
  };
}

function getSunSide(relativeBearing: number, elevation: number): SunSide {
  if (elevation > 70) return 'above';
  
  if (relativeBearing >= 315 || relativeBearing < 45) return 'front';
  if (relativeBearing >= 45 && relativeBearing < 135) return 'right';
  if (relativeBearing >= 135 && relativeBearing < 225) return 'back';
  return 'left';
}