import React from 'react';
import {Alert} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';

import {ButtonExit, HeaderContent, TextHeader} from './styels';
import {CommonActions} from '@react-navigation/native';

interface INamePageType {
  namePage: string;
  navigation?: StackNavigationProp<any, any>;
}

export default function HeaderName({namePage, navigation}: INamePageType) {
  function exit() {
    Alert.alert('Sair', 'Tem certeza que deseja sair da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Sim',
        onPress: async () => {
          await AsyncStorage.removeItem('@SPP:token');
          await AsyncStorage.removeItem('userId');
          navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'SignIn',
                },
              ],
            }),
          );
        },
      },
    ]);
  }

  return (
    <HeaderContent>
      {namePage === 'Home' && (
        <ButtonExit onPress={() => exit()}>
          <Icons name="exit-outline" size={38} color="#e64717" />
        </ButtonExit>
      )}

      <TextHeader>{namePage}</TextHeader>
    </HeaderContent>
  );
}
