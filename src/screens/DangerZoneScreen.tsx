import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DangerZone } from 'models/DangerZone';
import { useTranslation } from 'react-i18next';
import { theme } from 'theme';

interface Props {
  route: { params: { dangerZone: DangerZone } };
}

const DangerZoneScreen: React.FC<Props> = ({ route }) => {
  const { dangerZone } = route.params;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t(dangerZone.type)}</Text>
      <Text style={styles.text}>
        {t('description')}: {dangerZone.description}
      </Text>
      <Text style={styles.text}>
        {t('location')}: {dangerZone.latitude}, {dangerZone.longitude}
      </Text>
      <Text style={styles.text}>
        {t('radius')}: {dangerZone.radius}m
      </Text>
      <Text style={styles.text}>
        {t('status')}: {t(dangerZone.verificationStatus)}
      </Text>
      <Text style={styles.text}>
        {t('timestamp')}: {new Date(dangerZone.timestamp).toLocaleString('ar')}
      </Text>
      <Button
        title={t('view_verification_history')}
        onPress={() =>
          console.log("NAVIGATION PRESSED")
          // navigation.navigate('VerificationHistory', { entityId: dangerZone.id })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  header: { fontSize: theme.font.size.large, fontFamily: theme.font.family, marginBottom: 16 },
  text: { fontSize: theme.font.size.medium, fontFamily: theme.font.family, marginBottom: 8 },
});

export default DangerZoneScreen;