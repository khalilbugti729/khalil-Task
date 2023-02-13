import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './navigation/Navigation';
import {store} from './redux/app/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" translucent />
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
