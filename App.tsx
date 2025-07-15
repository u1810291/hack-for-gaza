import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </I18nextProvider>
  );
};

export default App;