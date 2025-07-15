import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  ar: {
    translation: {
      aid_center: 'مركز المساعدات',
      food_distribution: 'توزيع المواد الغذائية',
      evacuation_alert: 'تنبيه الإخلاء',
      new_alert: 'تنبيه جديد',
    },
  },
  en: {
    translation: {
      aid_center: 'Aid Center',
      food_distribution: 'Food Distribution',
      evacuation_alert: 'Evacuation Alert',
      new_alert: 'New Alert',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode || 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;