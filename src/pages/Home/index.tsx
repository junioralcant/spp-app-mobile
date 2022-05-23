import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import HeaderName from '../../components/HeaderName';

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
}

interface IItemType {
  item: {
    title: string;
    page: string;
  };
}

export default function Home({navigation}: iNavigationProps) {
  const DATA = [
    {
      title: 'Adiantamento',
      page: 'Adiantamento',
    },
    {
      title: 'Alimentação',
      page: 'Alimentacao',
    },
    {
      title: 'Abastecimento',
      page: 'Abastecimento',
    },
    {
      title: 'Despesa Extra',
      page: 'DespesaExtra',
    },
    {
      title: 'Hospedagem',
      page: 'Hospedagem',
    },
    {
      title: 'Peças',
      page: 'Pecas',
    },
    {
      title: 'Roço',
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
    <>
      <HeaderName namePage="Home" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <FlatList
            data={DATA}
            renderItem={buttonItem}
            keyExtractor={item => item.title}
            style={{width: '100%', paddingHorizontal: 20}}
          />
        </Container>
      </ScrollView>
    </>
  );
}
