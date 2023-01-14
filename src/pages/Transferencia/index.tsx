import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';

import {
  BoxInput,
  Button,
  Container,
  Erro,
  Input,
  Loading,
  TextButton,
} from './styles';

interface Caixa {
  label: string;
  value: string;
}

interface User {
  _id: string;
  name: string;
  role: string;
}

export default function Transferencia() {
  const [valor, setValor] = useState('');
  const [idPara, setIdPara] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [caixas, setCaixas] = useState<Caixa[]>([]);
  const [userLogged, setUserLogged] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function register() {
    if (!idPara || !valor) {
      setError('Informe um valor ou selecione um caixa para continunar');
    } else {
      try {
        setError('');
        setLoading(true);

        await api.post('/transferencia', {
          to: idPara,
          nomeLinha: nomeLinha,
          total: valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        });
        setLoading(false);

        Alert.alert('Registro cadastrado');
        setIdPara('');
        setNomeLinha('');
        setValor('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadCaixas() {
      const response = await api.get('/users');

      const responseUser = await AsyncStorage.getItem('user');

      const userLogged = JSON.parse(responseUser!);

      console.log(userLogged._id);

      const dataFilter = response.data.filter(
        (user: User) =>
          user.role === 'ROLE_ENCARREGADO' && user._id !== userLogged._id,
      );

      setCaixas(() => {
        return dataFilter.map((user: User) => {
          return {label: user.name, value: user._id};
        });
      });
    }

    loadCaixas();
  }, []);

  return (
    <>
      <HeaderName namePage={'Cadastrar Transferência'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          {caixas.length > 0 && (
            <BoxInput>
              <RNPickerSelect
                onValueChange={value => setIdPara(value)}
                placeholder={{
                  label: 'Selecione um caixa',
                  value: '',
                }}
                value={idPara}
                items={caixas}
              />
            </BoxInput>
          )}

          <BoxInput>
            <Input
              onChangeText={setNomeLinha}
              value={nomeLinha}
              placeholder="Nome Linha"
              keyboardType="numeric"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setValor(inputValueMask(e))}
              value={valor}
              placeholder="Total"
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
