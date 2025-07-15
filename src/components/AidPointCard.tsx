import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AidPoint } from 'models/AidPoint';
import { useTranslation } from 'react-i18next';
import { theme } from 'theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  aidPoint: AidPoint;
}

const AidPointCard: React.FC<Props> = ({ aidPoint }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        console.log("AidPoint")
        // navigation.navigate('AidPoint', { aidPoint })
      }
    >
      <Text style={styles.header}>{aidPoint.name}</Text>
      <Text style={styles.text}>
        {t('type')}: {t(aidPoint.type)}
      </Text>
      <Text style={styles.text}>
        {t('trustworthiness')}: {aidPoint.trustworthiness}%
      </Text>
      <Text style={styles.text}>
        {t('status')}: {t(aidPoint.verificationStatus)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    fontSize: theme.font.size.large,
    fontFamily: theme.font.family,
    marginBottom: 8,
  },
  text: {
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    marginBottom: 4,
  },
});

export default AidPointCard;