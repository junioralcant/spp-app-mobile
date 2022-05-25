import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';

import api from '../../services/api';

import {
  BoxInput,
  Button,
  Container,
  Input,
  Loading,
  TextButton,
} from './styles';
import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';
import {StackNavigationProp} from '@react-navigation/stack';

interface INavigationProps {
  navigation: StackNavigationProp<any, any>;
}

export default function AlterarSaldo({navigation}: INavigationProps) {
  const [valor, setValor] = useState('');
  const [id, setId] = useState('');

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get('/saldo');

      setValor(inputValueMask(String(response.data.total) + '00'));
      setId(response.data._id);
    }

    loadRegister();
  }, []);

  async function updateRegister() {
    try {
      setLoading(true);
      let totalFormatted = valor
        .replace('R$ ', '')
        .replace('.', '')
        .replace(',', '.');
      const response = await api.put(`/saldo/${id}`, {total: totalFormatted});
      console.log(response.data);

      Alert.alert('Saldo alterado!');
      navigation.navigate('Home', {
        params: {reloadPage: true},
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <HeaderName namePage={'Alterar Saldo'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Container>
          <BoxInput>
            <Input
              onChangeText={e => setValor(inputValueMask(e))}
              value={valor}
              placeholder="Valor"
              keyboardType="numeric"
            />
          </BoxInput>

          {loading ? (
            <Loading>
              <ActivityIndicator size="large" color="#208eeb" />
            </Loading>
          ) : (
            <Button
              onPress={() => {
                updateRegister();
              }}>
              <TextButton>Salvar</TextButton>
            </Button>
          )}
        </Container>
      </ScrollView>
    </>
  );
}
