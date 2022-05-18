import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Adiantamento from './pages/Adiantamento';
import AdiantamentoList from './pages/AdiantamentoList';

import PageListOrAdd from './pages/PageListOrAdd';

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Adiantamento"
          component={Adiantamento}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PageListOrAdd"
          component={PageListOrAdd}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdiantamentoList"
          component={AdiantamentoList}
          options={{headerShown: false}}
        />

        {/*
        <Stack.Screen
          name="DangerRegister"
          component={DangerRegister}
          options={{headerTransparent: true, headerTitle: false}}
        />

        <Stack.Screen
          name="DangerList"
          component={DangerList}
          options={{headerTransparent: true, headerTitle: false}}
        />

        <Stack.Screen
          name="About"
          component={About}
          options={{headerTransparent: true, headerTitle: false}}
        />

        <Stack.Screen
          name="Draws"
          component={Draws}
          options={{headerTransparent: true, headerTitle: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
