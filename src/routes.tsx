import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import Home from './pages/Home';

import Adiantamento from './pages/Adiantamento';
import AdiantamentoList from './pages/AdiantamentoList';

import Alimentacao from './pages/Alimentacao';
import AlimentacaoList from './pages/AlimentacaoList';

import PageListOrAdd from './pages/PageListOrAdd';

import Abastecimento from './pages/Abastecimento';
import AbastecimentoList from './pages/AbastecimentoList';

import DespesasExtras from './pages/DespesasExtras';
import DespesasExtrasList from './pages/DespesasExtrasList';

import Hospedagem from './pages/Hospedagem';
import HospedagemList from './pages/HospedagemList';

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
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Alimentacao"
          component={Alimentacao}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AlimentacaoList"
          component={AlimentacaoList}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Abastecimento"
          component={Abastecimento}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AbastecimentoList"
          component={AbastecimentoList}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DespesaExtra"
          component={DespesasExtras}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DespesaExtraList"
          component={DespesasExtrasList}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Hospedagem"
          component={Hospedagem}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="HospedagemList"
          component={HospedagemList}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
