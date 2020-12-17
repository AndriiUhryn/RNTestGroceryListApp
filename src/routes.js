import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Feed,
  AddEditFeed,
  WorkInProgress,

  WheelPicker,
  QuestionModal
} from './screens';

import { CustomNavigation } from './components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get('window');

export const Main = () => {
  return (
   <Drawer.Navigator
    {...{
      drawerWidth: width / 1.3,
      overlayColor: 'rgba(0, 0, 0, 0.62)',
      drawerContent: CustomNavigation,
      initialRouteName: 'Feed'
    }}
   >
     <Drawer.Screen name="Feed" component={Feed} />
   </Drawer.Navigator>
  );
};

export const AppNavigator = () => {
  return (
   <Stack.Navigator
    {...{
      headerMode: 'none',
      initialRouteName: 'Main'
    }}
   >
     <Stack.Screen name="Main" component={Main} options={{ gestureEnabled: false }} />
     <Drawer.Screen name="AddEditFeed" component={AddEditFeed} />

     <Drawer.Screen name="Settings" component={WorkInProgress} />
     <Drawer.Screen name="WorkInProgress" component={WorkInProgress} />
   </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
   <Stack.Navigator
    {...{
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'AppNavigator',
      screenOptions: {
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true
      }
    }}
   >
     <Stack.Screen name="AppNavigator" component={AppNavigator} />
     <Stack.Screen name="WheelPicker" component={WheelPicker} />
     <Stack.Screen name="QuestionModal" component={QuestionModal} />
   </Stack.Navigator>
  );
};
