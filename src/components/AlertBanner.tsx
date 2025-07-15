import React from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { theme } from 'theme';
import { useTranslation } from 'react-i18next';

interface Props {
  message: string;
  type: 'evacuation' | 'bombing' | 'drone' | 'airstrike';
}

const AlertBanner: React.FC<Props> = ({ message, type }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    Vibration.vibrate([0, 500, 200, 500]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.danger }]}>
      <Text style={styles.text}>
        {t(type)}: {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: '#fff',
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    textAlign: 'right',
  },
});

export default AlertBanner;