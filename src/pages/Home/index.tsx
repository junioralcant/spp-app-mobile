import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Container, Button, TextButton} from './styles';
import {RouteProp} from '@react-navigation/native';
import HeaderHome from '../../components/HeaderHome';

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
}

interface IItemType {
  item: {
    title: string;
    page: string;
  };
}

export default function Home({navigation, route}: iNavigationProps) {
  const DATA = [
    {
      title: 'Adiantamento/Pagamento',
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
    {
      title: 'Serviço',
      page: 'Servico',
    },
    {
      title: 'Transferência',
      page: 'Transferencia',
    },
    {
      title: 'Todas Despesas',
      page: 'TodasDespesas',
    },
    {
      title: 'Alterar Saldo',
      page: 'AlterarSaldo',
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
      <HeaderHome namePage="Home" navigation={navigation} route={route} />
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
