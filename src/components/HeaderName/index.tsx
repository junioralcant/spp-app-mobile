import React from 'react';

import {HeaderContent, TextHeader} from './styels';

interface INamePageType {
  namePage: string;
}

export default function HeaderName({namePage}: INamePageType) {
  return (
    <HeaderContent>
      <TextHeader>{namePage}</TextHeader>
    </HeaderContent>
  );
}
