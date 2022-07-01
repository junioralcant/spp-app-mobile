import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import {FlatList, SafeAreaView} from 'react-native';
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

  const DATA = [
    {
      title: 'TCAT',
      page: 'Roco',
    },
    {
      title: 'TCVC',
      page: 'Roco',
    },
    {
      title: 'TCMB',
      page: 'Roco',
    },
    {
      title: 'TMRU',
      page: 'Roco',
    },
    {
      title: 'ATTM',
      page: 'Roco',
    },
  ];

  const buttonItem = ({item}: IItemType) => (
    <Button
      onPress={() =>
        navigation.navigate('PageListOrAdd', {
          params: {page: item.page, pageName: item.title},
        })
      }>
      <TextButton>{item.title}</TextButton>
    </Button>
  );

  return (
    <SafeAreaView>
      <HeaderName namePage={pageName} />

      {pageName === 'Roço' ? (
        <Container>
          <FlatList
            data={DATA}
            renderItem={buttonItem}
            keyExtractor={item => item.title}
            style={{width: '100%', paddingHorizontal: 20}}
          />
        </Container>
      ) : (
        <Container>
          {pageName !== 'Todas Despesas' && user?.role !== 'ROLE_ADMIN' && (
            <Button
              onPress={() =>
                // parametro pageName é usado apenas na listagem do Roço para saber o nome da linha
                navigation.navigate(page, {
                  params: {pageName},
                })
              }>
              <TextButton>Cadastar</TextButton>
            </Button>
          )}

          <Button
            onPress={() =>
              // parametro pageName é usado apenas na listagem do Roço para saber o nome da linha
              navigation.navigate(`${page}List`, {
                params: {pageName},
              })
            }>
            <TextButton>Listar</TextButton>
          </Button>
        </Container>
      )}
    </SafeAreaView>
  );
}
