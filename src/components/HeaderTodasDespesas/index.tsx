import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {
  BoxResumoGegister,
  BoxTotal,
  BoxTotalGegister,
  ContentHeader,
  HeaderContent,
  ResumeTotal,
  Total,
  TotalGerister,
  TotalText,
} from './styels';

interface INamePageType {
  namePage: string;
  navigation?: StackNavigationProp<any, any>;
  route?: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
  totalSaidas: number;
  totalSaldo: number;
  resumo: number;
}

export default function HeaderTodasDespesas({
  namePage,
  totalSaidas,
  totalSaldo,
  resumo,
}: INamePageType) {
  return (
    <HeaderContent>
      <>
        <ContentHeader>
          <BoxTotal>
            {namePage !== 'Listagem Roço' && (
              <>
                <TotalText>Caixa</TotalText>
                <Total>
                  {String(
                    totalSaldo?.toLocaleString('pt-br', {
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
    </HeaderContent>
  );
}
