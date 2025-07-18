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
      home: 'الرئيسية',
      aid_point: 'نقطة المساعدة',
      danger_zone: 'منطقة الخطر',
      verification_history: 'سجل التحقق',
      settings: 'الإعدادات',
      add_comment: 'إضافة تعليق',
      submit: 'إرسال',
      type: 'النوع',
      description: 'الوصف',
      location: 'الموقع',
      radius: 'النطاق',
      status: 'الحالة',
      timestamp: 'الوقت',
      trustworthiness: 'الجدارة بالثقة',
      comments: 'التعليقات',
      agrees: 'الموافقات',
      stealth_mode: 'وضع التخفي',
      panic_wipe: 'مسح الطوارئ',
      verified: 'تم التحقق',
      unverified: 'غير متحقق',
      confidence: 'الثقة',
      details: 'التفاصيل',
      no_records: 'لا توجد سجلات',
      aid: 'مساعدة',
      water: 'ماء',
      clinic: 'عيادة',
      evacuation: 'إخلاء',
      bombing: 'قصف',
      drone: 'طائرة بدون طيار',
      airstrike: 'غارة جوية',
    },
  },
  en: {
    translation: {
      aid_center: 'Aid Center',
      food_distribution: 'Food Distribution',
      evacuation_alert: 'Evacuation Alert',
      new_alert: 'New Alert',
      home: 'Home',
      aid_point: 'Aid Point',
      danger_zone: 'Danger Zone',
      verification_history: 'Verification History',
      settings: 'Settings',
      add_comment: 'Add Comment',
      submit: 'Submit',
      type: 'Type',
      description: 'Description',
      location: 'Location',
      radius: 'Radius',
      status: 'Status',
      timestamp: 'Timestamp',
      trustworthiness: 'Trustworthiness',
      comments: 'Comments',
      agrees: 'Agrees',
      stealth_mode: 'Stealth Mode',
      panic_wipe: 'Panic Wipe',
      verified: 'Verified',
      unverified: 'Unverified',
      confidence: 'Confidence',
      details: 'Details',
      no_records: 'No Records',
      aid: 'Aid',
      water: 'Water',
      clinic: 'Clinic',
      evacuation: 'Evacuation',
      bombing: 'Bombing',
      drone: 'Drone',
      airstrike: 'Airstrike',
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