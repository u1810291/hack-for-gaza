import React from 'react';
import HomeScreen from 'screens/HomScreen';
import { useTranslation } from 'react-i18next';
import AidPointScreen from 'screens/AidPointScreen';
import SettingsScreen from 'screens/SettingsScreen';
import DangerZoneScreen from 'screens/DangerZoneScreen';
import { createStackNavigator } from '@react-navigation/stack';
import VerificationHistoryScreen from 'screens/VerificationHistoryScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('home') }}
      />
      <Stack.Screen
        name="AidPoint"
        component={AidPointScreen}
        options={{ title: t('aid_point') }}
      />
      <Stack.Screen
        name="DangerZone"
        component={DangerZoneScreen}
        options={{ title: t('danger_zone') }}
      />
      <Stack.Screen
        name="VerificationHistory"
        component={VerificationHistoryScreen}
        options={{ title: t('verification_history') }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('settings') }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;