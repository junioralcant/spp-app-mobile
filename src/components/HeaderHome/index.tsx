import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  BoxResumoGegister,
  BoxTotal,
  BoxTotalGegister,
  ButtonExit,
  ContentHeader,
  HeaderContent,
  ResumeTotal,
  TextHeader,
  Total,
  TotalGerister,
  TotalText,
} from './styels';
import {CommonActions, RouteProp} from '@react-navigation/native';
import api from '../../services/api';

interface INamePageType {
  namePage: string;
  navigation?: StackNavigationProp<any, any>;
  route?: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
}

interface ISaidasType {
  total: number;
}

export default function HeaderHome({
  namePage,
  navigation,
  route,
}: INamePageType) {
  const [total, setTotal] = useState();
  const [saidas, setSaidas] = useState<ISaidasType[]>([]);

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

  useEffect(() => {
    async function loadTotal() {
      const response = await api.get('/saldo');

      setTotal(response.data.total);
    }

    loadTotal();
  }, [route]);

  useEffect(() => {
    async function loadSaidas() {
      const response = await api.get('/todasdespesas');

      setSaidas(response.data);
    }

    loadSaidas();
  }, [route]);

  let totalSaidas = 0;

  saidas.filter(item => {
    if (item.total) {
      totalSaidas += item.total;
    }
  });

  let resumo = total - totalSaidas;

  return (
    <HeaderContent>
      {namePage === 'Home' ? (
        <>
          <ButtonExit onPress={() => exit()}>
            <Icons name="exit-outline" size={38} color="#ed657d" />
          </ButtonExit>

          <ContentHeader>
            <BoxTotal>
              {namePage !== 'Listagem Roço' && (
                <>
                  <TotalText>Caixa</TotalText>
                  <Total>
                    {String(
                      total?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      }),
                    )}
                  </Total>
                </>
              )}
            </BoxTotal>

            <BoxTotalGegister>
              <BoxResumoGegister>
                <TotalText>Saídas</TotalText>
                <TotalGerister>
                  {String(
                    totalSaidas.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    }),
                  )}
                </TotalGerister>
              </BoxResumoGegister>

              {!!resumo && (
                <BoxResumoGegister style={{marginTop: 5}}>
                  <TotalText>Resumo</TotalText>
                  <ResumeTotal>
                    {String(
                      resumo.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      }),
                    )}
                  </ResumeTotal>
                </BoxResumoGegister>
              )}
            </BoxTotalGegister>
          </ContentHeader>
        </>
      ) : (
        <TextHeader>{namePage}</TextHeader>
      )}
    </HeaderContent>
  );
}
