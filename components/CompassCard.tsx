import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'lucide-react-native';

interface CompassCardProps {
  heading: number;
}

export function CompassCard({ heading }: CompassCardProps) {
  const getDirection = (heading: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  const getDirectionName = (heading: number): string => {
    const directions = [
      'North', 'Northeast', 'East', 'Southeast',
      'South', 'Southwest', 'West', 'Northwest'
    ];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Navigation size={28} color="#4CAF50" />
        <Text style={styles.cardTitle}>Travel Direction</Text>
      </View>

      <View style={styles.compassContainer}>
        <View style={styles.compass}>
          <View style={[styles.needle, { transform: [{ rotate: `${heading}deg` }] }]}>
            <Navigation size={32} color="#4CAF50" />
          </View>
          <Text style={styles.directionText}>{getDirection(heading)}</Text>
        </View>
      </View>

      <View style={styles.directionInfo}>
        <Text style={styles.directionName}>{getDirectionName(heading)}</Text>
        <Text style={styles.headingValue}>{Math.round(heading)}°</Text>
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
  compassContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  compass: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E8',
    borderWidth: 3,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  needle: {
    position: 'absolute',
  },
  directionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 40,
  },
  directionInfo: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
  },
  directionName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 4,
  },
  headingValue: {
    fontSize: 16,
    color: '#666',
  },
});