
import { I18nManager } from 'react-native';
import * as Localization from 'react-native-localize';
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 








export const translationGetters = {
  'en-US': () => require('../assets/translations/en.json'),
  // 'es-US': () => require('../assets/translations/en.json'),
  'it-IT': () => require('../assets/translations/it.json'),
  'fr-FR': () => require('../assets/translations/en.json'),
};

export const localize = memoize(
  (key, config) => i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const initLocalization = () => {
  const fallback = { languageTag: 'en', isRTL: false };

  const { locale: languageTag, isRTL } = Localization;

  // const { languageTag, isRTL } = Localization.findBestAvailableLanguage(
  //   Object.keys(translationGetters) || fallback
  // );

  

  localize.cache.clear();

  I18nManager.forceRTL(isRTL);

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
}

// export const init = () => {
    
//   let localeLanguageTag = Localization.locale;
//   let isRTL = Localization.isRTL;

//   translate.cache.clear();
//   // update layout direction
//   I18nManager.forceRTL(isRTL);
//   // set i18n-js config
//   i18n.translations = {
//     [localeLanguageTag]: translationGetters[localeLanguageTag](),
//   };
//   i18n.locale = localeLanguageTag;
// };