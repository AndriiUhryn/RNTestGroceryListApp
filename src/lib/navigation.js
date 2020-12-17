import { DrawerActions, CommonActions, StackActions } from '@react-navigation/native';

let navigator;

export const setTopLevelNavigator = navigatorRef => (navigator = navigatorRef);

export const navigate = (name, params) => navigator.dispatch(CommonActions.navigate({ name, params }));

export const navigateAndReset = () => navigator.dispatch(StackActions.popToTop());

export const goBack = () => navigator.dispatch(CommonActions.goBack());

export const openDrawer = () => navigator.dispatch(DrawerActions.openDrawer());

export const closeDrawer = () => navigator.dispatch(DrawerActions.closeDrawer());

export const getActiveRouteName = state => {
    const route = state.routes[state.index];

    if (route.state) {
        return getActiveRouteName(route.state);
    }

    return route.name;
};
