import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { AidPoint } from 'models/AidPoint';
import { DangerZone } from 'models/DangerZone';

MapboxGL.setAccessToken('YOUR_MAPBOX_TOKEN');

interface Props {
  aidPoints: AidPoint[];
  dangerZones: DangerZone[];
}

const MapView: React.FC<Props> = ({ aidPoints, dangerZones }) => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          centerCoordinate={[34.25, 31.5]} // Gaza coordinates
          zoomLevel={10}
        />
        {aidPoints.map((point) => (
          <MapboxGL.PointAnnotation
            key={point.id}
            id={point.id}
            coordinate={[point.longitude, point.latitude]}
            title={point.name}
          />
        ))}
        {dangerZones.map((zone) => (
          <MapboxGL.ShapeSource
            key={zone.id}
            id={`danger-source-${zone.id}`}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [zone.longitude, zone.latitude],
              },
              properties: {}, // ✅ Fix: Add properties field
            }}
          >
            <MapboxGL.CircleLayer
              id={`danger-layer-${zone.id}`}
              sourceID={`danger-source-${zone.id}`}
              style={{
                circleRadius: zone.radius,
                circleColor: 'red',
                circleOpacity: 0.5,
              }}
            />
          </MapboxGL.ShapeSource>
        ))}

      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapView;