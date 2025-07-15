import { theme } from 'theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageService } from 'services/storage/Storage.service';
import { View, Text, Switch, Button, StyleSheet, Vibration } from 'react-native';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [stealthMode, setStealthMode] = useState(false);

  const toggleStealthMode = () => {
    setStealthMode(!stealthMode);
    // In production, change app icon or disguise UI
    console.log('Stealth mode:', !stealthMode);
  };

  const handlePanicWipe = async () => {
    Vibration.vibrate([0, 500]);
    const storage = new StorageService();
    await storage.init();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings')}</Text>
      <View style={styles.setting}>
        <Text style={styles.text}>{t('stealth_mode')}</Text>
        <Switch value={stealthMode} onValueChange={toggleStealthMode} />
      </View>
      <Button
        title={t('panic_wipe')}
        color={theme.colors.danger}
        onPress={handlePanicWipe}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  header: { fontSize: theme.font.size.large, fontFamily: theme.font.family, marginBottom: 16 },
  setting: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  text: { fontSize: theme.font.size.medium, fontFamily: theme.font.family },
});

export default SettingsScreen;