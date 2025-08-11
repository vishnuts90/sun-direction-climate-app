import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Sun, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { SunPosition, SunSide } from '@/hooks/useSunPosition';



interface SunPositionCardProps {
  sunPosition: SunPosition;
  sunSide: SunSide;
  heading: number;
}

export function SunPositionCard({ sunPosition, sunSide, heading }: SunPositionCardProps) {
  const getSunSideText = (side: SunSide): string => {
    switch (side) {
      case 'left': return 'Left side of vehicle';
      case 'right': return 'Right side of vehicle';
      case 'front': return 'Front of vehicle';
      case 'back': return 'Behind vehicle';
      case 'above': return 'Directly above';
    }
  };

  const getSunSideIcon = (side: SunSide) => {
    const iconProps = { size: 24, color: '#FF8A65' };
    switch (side) {
      case 'left': return <ArrowLeft {...iconProps} />;
      case 'right': return <ArrowRight {...iconProps} />;
      case 'front': return <ArrowUp {...iconProps} />;
      case 'back': return <ArrowDown {...iconProps} />;
      case 'above': return <Sun {...iconProps} />;
    }
  };

  const getSunIntensity = (elevation: number): string => {
    if (elevation < 0) return 'Sun has set';
    if (elevation < 10) return 'Low intensity';
    if (elevation < 30) return 'Moderate intensity';
    if (elevation < 60) return 'High intensity';
    return 'Very high intensity';
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Sun size={28} color="#FF8A65" />
        <Text style={styles.cardTitle}>Sun Position</Text>
      </View>

      <View style={styles.sunVisualization}>
        <View style={[styles.vehicle, { transform: [{ rotate: `${heading}deg` }] }]}>
          <Text style={styles.vehicleText}>🚗</Text>
        </View>
        <View style={[
          styles.sunIndicator,
          {
            transform: [
              { rotate: `${sunPosition.azimuth - heading}deg` },
              { translateY: -80 - (sunPosition.elevation * 0.5) }
            ]
          }
        ]}>
          <Sun size={20} color="#FFD700" />
        </View>
      </View>

      <View style={styles.infoRow}>
        {getSunSideIcon(sunSide)}
        <Text style={styles.sunSideText}>{getSunSideText(sunSide)}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Elevation</Text>
          <Text style={styles.detailValue}>{Math.round(sunPosition.elevation)}°</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Azimuth</Text>
          <Text style={styles.detailValue}>{Math.round(sunPosition.azimuth)}°</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Intensity</Text>
          <Text style={styles.detailValue}>{getSunIntensity(sunPosition.elevation)}</Text>
        </View>
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
  sunVisualization: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  vehicle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  vehicleText: {
    fontSize: 24,
  },
  sunIndicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
  },
  sunSideText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8A65',
    marginLeft: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});