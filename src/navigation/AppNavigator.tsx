import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/HomScreen';
import AidPointScreen from 'screens/AidPointScreen';
import DangerZoneScreen from 'screens/DangerZoneScreen';
import VerificationHistoryScreen from 'screens/VerificationHistoryScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { useTranslation } from 'react-i18next';

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