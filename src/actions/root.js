import * as TYPES from '../constants/actionTypes';

export const setTheme = payload => ({ type: TYPES.SET_THEME, payload });

export const clearStore = () => ({ type: TYPES.CLEAR_STORE });

export const setLoading = payload => ({ type: TYPES.SET_LOADING, payload });

export const setCurrentScreen = payload => ({ type: TYPES.SET_CURRENT_SCREEN, payload });

export const hideBottomNavigation = payload => ({ type: TYPES.HIDE_BOTTOM_NAVIGATION, payload });
