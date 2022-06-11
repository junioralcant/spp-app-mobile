import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import {SafeAreaView} from 'react-native';
import HeaderName from '../../components/HeaderName';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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

interface IUserType {
  name: string;
  role: string;
}

export default function PageListOrAdd({navigation, route}: iNavigationProps) {
  const {page, pageName} = route.params.params;
  const [user, setUser] = useState<IUserType>();

  useEffect(() => {
    async function loadUser() {
      const response = await AsyncStorage.getItem('user');

      setUser(JSON.parse(response!));
    }

    loadUser();
  }, []);

  return (
    <SafeAreaView>
      <HeaderName namePage={pageName} />
      <Container>
        {pageName !== 'Todas Despesas' && user?.role !== 'ROLE_ADMIN' && (
          <Button onPress={() => navigation.navigate(page)}>
            <TextButton>Cadastar</TextButton>
          </Button>
        )}

        <Button onPress={() => navigation.navigate(`${page}List`)}>
          <TextButton>Listar</TextButton>
        </Button>
      </Container>
    </SafeAreaView>
  );
}
