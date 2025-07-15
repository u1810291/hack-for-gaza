import { theme } from 'theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onSubmit: (text: string) => void;
}

const CommentInput: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={t('add_comment')}
        multiline
      />
      <Button title={t('submit')} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.medium,
    textAlign: 'right',
  },
});

export default CommentInput;