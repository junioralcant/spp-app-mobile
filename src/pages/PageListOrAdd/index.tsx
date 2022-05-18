import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import {SafeAreaView} from 'react-native';
import HeaderName from '../../components/HeaderName';

type RootStackParamList = {
  Profile: {page: string};
};

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: StackNavigationProp<any, any>;
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
        <Button onPress={() => navigation.navigate(page)}>
          <TextButton>Cadastar</TextButton>
        </Button>
        <Button onPress={() => navigation.navigate(`${page}List`)}>
          <TextButton>Listar</TextButton>
        </Button>
      </Container>
    </SafeAreaView>
  );
}
