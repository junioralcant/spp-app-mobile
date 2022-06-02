import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {
  BoxResumoGegister,
  BoxTotal,
  BoxTotalRegister,
  ContentHeader,
  HeaderContent,
  ResumeTotal,
  Total,
  TotalRegister,
  TotalRegisterNew,
  TotalText,
} from './styels';
import {View} from 'react-native';

interface INamePageType {
  namePage: string;
  navigation?: StackNavigationProp<any, any>;
  route?: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
  totalSaidas: number;
  totalSaldo: number;
  resumo: number;
  registros: number;
}

export default function HeaderTodasDespesas({
  namePage,
  totalSaidas,
  totalSaldo,
  resumo,
  registros,
}: INamePageType) {
  return (
    <HeaderContent>
      <>
        <ContentHeader>
          <BoxTotal>
            {namePage !== 'Listagem Roço' && (
              <>
                <View>
                  <TotalText>Caixa</TotalText>
                  <Total>
                    {String(
                      totalSaldo?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      }),
                    )}
                  </Total>
                </View>

                <View>
                  <TotalText>Registros</TotalText>
                  <TotalRegisterNew>{registros}</TotalRegisterNew>
                </View>
              </>
            )}
          </BoxTotal>

          <BoxTotalRegister>
            <BoxResumoGegister>
              <TotalText>Saídas</TotalText>
              <TotalRegister>
                {String(
                  totalSaidas.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  }),
                )}
              </TotalRegister>
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
          </BoxTotalRegister>
        </ContentHeader>
      </>
    </HeaderContent>
  );
}
