import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Routes from './routes';

export default function App() {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#005f98'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#eff3f6'}}>
        <StatusBar barStyle="light-content" backgroundColor="#005f98" />
        <Routes />
      </SafeAreaView>
    </>
  );
}
