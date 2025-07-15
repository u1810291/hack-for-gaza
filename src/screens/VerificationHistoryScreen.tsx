import { theme } from 'theme';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { VerificationRecord } from 'models/VerificationRecord';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { VerificationService } from 'services/ai/Verification.service';

interface Props {
  route: { params: { entityId: string } };
}

const VerificationHistoryScreen: React.FC<Props> = ({ route }) => {
  const { entityId } = route.params;
  const { t } = useTranslation();
  const [records, setRecords] = useState<VerificationRecord[]>([]);

  useEffect(() => {
    const verificationService = new VerificationService();
    verificationService.getVerificationHistory(entityId).then(setRecords);
  }, [entityId]);

  const renderItem = ({ item }: { item: VerificationRecord }) => (
    <View style={styles.record}>
      <Text style={styles.text}>
        {t('status')}: {item.factCheckResult.isValid ? t('verified') : t('unverified')}
      </Text>
      <Text style={styles.text}>
        {t('confidence')}: {item.factCheckResult.confidence.toFixed(2)}%
      </Text>
      <Text style={styles.text}>
        {t('details')}: {item.factCheckResult.details}
      </Text>
      <Text style={styles.text}>
        {t('timestamp')}: {new Date(item.timestamp).toLocaleString('ar')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('verification_history')}</Text>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.text}>{t('no_records')}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  header: { fontSize: theme.font.size.large, fontFamily: theme.font.family, marginBottom: 16 },
  record: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: theme.font.size.medium, fontFamily: theme.font.family },
});

export default VerificationHistoryScreen;