import React from 'react';

import {
  HeaderContent,
  TextHeader,
  BoxTotal,
  TotalText,
  Total,
  ContentHeader,
  TotalGerister,
  BoxTotalGegister,
} from './styels';

interface INamePageType {
  namePage: string;
  total: number;
  register: number;
}

export default function HeaderList({namePage, total, register}: INamePageType) {
  return (
    <HeaderContent>
      <TextHeader>{namePage}</TextHeader>

      <ContentHeader>
        <BoxTotal>
          {namePage !== 'Listagem Roço' && (
            <>
              <TotalText>Total gasto</TotalText>
              <Total>
                {total.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Total>
            </>
          )}
        </BoxTotal>

        <BoxTotalGegister>
          <TotalText>Registros</TotalText>
          <TotalGerister>{register}</TotalGerister>
        </BoxTotalGegister>
      </ContentHeader>
    </HeaderContent>
  );
}
