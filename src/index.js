import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import { Root } from './screens';

import configureStore from './lib/store';

enableScreens();

const { store, persistor } = configureStore({});


console.disableYellowBox = true;

export const App = () => {
  return (
   <Provider
    store={store}
   >
     <PersistGate
      loading={null}
      persistor={persistor}
     >
       <Root />
     </PersistGate>
   </Provider>
  );
};

export default App;
