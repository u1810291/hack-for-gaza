import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import MapView from 'components/MapView';
import AlertBanner from 'components/AlertBanner';
import { AidPoint } from 'models/AidPoint';
import { DangerZone } from 'models/DangerZone';
import PushNotification from 'react-native-push-notification';
import { useTranslation } from 'react-i18next';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const [aidPoints, setAidPoints] = useState<AidPoint[]>([]);
  const [dangerZones, setDangerZones] = useState<DangerZone[]>([]);

  useEffect(() => {
    // Initialize notifications
    PushNotification.configure({
      onNotification: () => {
        Vibration.vibrate([0, 500, 200, 500]);
      },
    });

    // Mock data loading
    setAidPoints([
      {
        id: 'aid1',
        type: 'aid',
        name: t('aid_center'),
        latitude: 31.5,
        longitude: 34.25,
        description: t('food_distribution'),
        lastUpdated: Date.now(),
        comments: [],
        trustworthiness: 85,
        verificationStatus: 'verified',
      },
    ]);
    setDangerZones([
      {
        id: 'dz1',
        latitude: 31.48,
        longitude: 34.27,
        radius: 500,
        type: 'evacuation',
        description: t('evacuation_alert'),
        timestamp: Date.now(),
        verificationStatus: 'verified',
      },
    ]);
  }, [t]);

  return (
    <View style={styles.container}>
      <MapView aidPoints={aidPoints} dangerZones={dangerZones} />
      <AlertBanner message={t('new_alert')} type="evacuation" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;