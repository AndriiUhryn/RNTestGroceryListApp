import { NativeModules, Platform } from 'react-native';

import * as TYPES from '../constants/actionTypes';
import { DEFAULT_THEME, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/general';

const deviceLang = ((Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier) || 'en').slice(0, 2);
const locale = (SUPPORTED_LANGUAGES.includes(deviceLang) ? deviceLang : DEFAULT_LANGUAGE);

const initialState = {
  loading: false,
  themeMode: DEFAULT_THEME,
  currentScreen: '',
  currentLanguage: locale,
  hideBottomNavigation: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.HIDE_BOTTOM_NAVIGATION:
      return {
        ...state,
        hideBottomNavigation: payload,
      };

    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case TYPES.SET_THEME:
      return {
        ...state,
        themeMode: payload,
      };

    case TYPES.SET_CURRENT_SCREEN:
      return {
        ...state,
        currentScreen: payload,
      };

    case TYPES.CLEAR_STORE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
