import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SingupScreen';
import {RootStackNavigatorParamList} from '../types/NavigationType';
import HomeScreen from '../screens/home/HomeScreen';
import DetailDriver from '../screens/DetailDriver/DetailDriver';

import {useAppSelector} from '../redux/app/hooks';

const Navigation = () => {
  const isUserLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  console.log('navitaion', isUserLoggedIn);

  const chooseModule = () => {
    if (isUserLoggedIn) {
      return (
        <>
          <Stack.Screen
            options={{
              title: 'Home',
            }}
            name="HOMESCREEN"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: 'Detail Driver',
            }}
            name="DETAILDRIVERSCREEN"
            component={DetailDriver}
          />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            options={{
              title: 'Login',
            }}
            name="LOGINSCREEN"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              title: 'Signup',
            }}
            name="SIGNUPSCREEN"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{
              title: 'Home',
            }}
            name="HOMESCREEN"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: 'Detail Driver',
            }}
            name="DETAILDRIVERSCREEN"
            component={DetailDriver}
          />
        </>
      );
    }
  };
  const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LOGINSCREEN">
        {chooseModule()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
