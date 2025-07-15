import { theme } from 'theme';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommentInput from 'components/CommentInput';
import { AidPoint, Comment } from 'models/AidPoint';
import { useRoute, RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { BlockchainService } from 'services/blockchain/BlockChain.service';
import { TransactionService } from 'services/blockchain/Transaction.service';

interface RouteI {
  aidPoint: AidPoint
}

const AidPointScreen: React.FC = () => {
  const route: RouteProp<{ params: RouteI }> = useRoute()
  const { aidPoint }: RouteI = route.params;
  const { t } = useTranslation();
  // const navigation = useNavigation();
  const [comments, setComments] = useState<Comment[]>(aidPoint.comments);

  const handleAddComment = async (text: string) => {
    const comment: Comment = {
      id: uuidv4(),
      userId: 'user-' + uuidv4(),
      text,
      timestamp: Date.now(),
      agrees: 0,
    };
    const transactionService = new TransactionService(new BlockchainService());
    await transactionService.addCommentTransaction(comment, aidPoint.id);
    setComments([...comments, comment]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{aidPoint.name}</Text>
      <Text style={styles.text}>
        {t('type')}: {t(aidPoint.type)}
      </Text>
      <Text style={styles.text}>
        {t('description')}: {aidPoint.description}
      </Text>
      <Text style={styles.text}>
        {t('location')}: {aidPoint.latitude}, {aidPoint.longitude}
      </Text>
      <Text style={styles.text}>
        {t('trustworthiness')}: {aidPoint.trustworthiness}%
      </Text>
      <Text style={styles.text}>
        {t('status')}: {t(aidPoint.verificationStatus)}
      </Text>
      <Button
        title={t('view_verification_history')}
        onPress={() =>
          console.log("VerificationHistory")
          // navigation.navigate('VerificationHistory', { entityId: aidPoint.id })
        }
      />
      <Text style={styles.subHeader}>{t('comments')}</Text>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.text}>
              {t('agrees')}: {item.agrees}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <CommentInput onSubmit={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  header: { fontSize: theme.font.size.large, fontFamily: theme.font.family, marginBottom: 16 },
  subHeader: { fontSize: theme.font.size.medium, fontFamily: theme.font.family, marginVertical: 8 },
  text: { fontSize: theme.font.size.medium, fontFamily: theme.font.family, marginBottom: 8 },
  comment: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default AidPointScreen;