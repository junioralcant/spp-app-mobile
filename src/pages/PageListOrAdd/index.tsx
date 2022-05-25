import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import {SafeAreaView} from 'react-native';
import HeaderName from '../../components/HeaderName';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Profile: {page: string};
};

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<
    {params: {params: {page: string; pageName: string}}},
    'params'
  >;
}

interface IItemType {
  item: {
    title: string;
    page: string;
  };
}

export default function PageListOrAdd({navigation, route}: iNavigationProps) {
  const {page, pageName} = route.params.params;
  console.log(pageName);
  return (
    <SafeAreaView>
      <HeaderName namePage={pageName} />
      <Container>
        {pageName !== 'Todas Despesas' && (
          <Button onPress={() => navigation.navigate(page)}>
            {pageName === 'Alterar Saldo' ? (
              <TextButton>Alterar</TextButton>
            ) : (
              <TextButton>Cadastar</TextButton>
            )}
          </Button>
        )}

        {pageName !== 'Alterar Saldo' && (
          <Button onPress={() => navigation.navigate(`${page}List`)}>
            <TextButton>Listar</TextButton>
          </Button>
        )}
      </Container>
    </SafeAreaView>
  );
}
