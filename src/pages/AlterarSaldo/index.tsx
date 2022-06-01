import React, {useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';

import api from '../../services/api';

import {
  BoxInput,
  Button,
  Container,
  Erro,
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function register() {
    if (!valor) {
      setError('Informe um valor para continuar');
    } else {
      try {
        setLoading(true);
        const data = new FormData();

        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

        await api.post('/saldo', {
          total: valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        });
        setLoading(false);

        Alert.alert('Saldo cadastrado');

        setValor('');
        navigation.navigate('Home', {
          params: {reloadPage: true},
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <HeaderName namePage={'Cadastrar Saldo'} />
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

          {!!error && <Erro>{error}</Erro>}

          {loading ? (
            <Loading>
              <ActivityIndicator size="large" color="#208eeb" />
            </Loading>
          ) : (
            <Button
              onPress={() => {
                register();
              }}>
              <TextButton>Cadastrar</TextButton>
            </Button>
          )}
        </Container>
      </ScrollView>
    </>
  );
}
