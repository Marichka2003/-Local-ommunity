import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Додати файли перекладів для кожної мови
import translationEN from './en.json';
import translationUK from './uk.json';

i18n
  .use(initReactI18next) // Додаємо initReactI18next до ланцюжка викликів методу use
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      uk: {
        translation: translationUK,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
