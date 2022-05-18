import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import moment from 'moment';

import Icons from 'react-native-vector-icons/AntDesign';

import HeaderList from '../../components/HeaderList';
import inputDataNascimentoMask from '../../components/inputDataNascimentoMask';

import {
  BoxInpuDate,
  BoxInput,
  BoxInputsDate,
  ButtonClose,
  ButtonSearch,
  Container,
  Input,
  InputDate,
  TextButtonSearch,
} from './styles';
import api from '../../services/api';

interface IAdiantamentoType {
  _id: string;
  nomeLinha: string;
  nomeColaborador: string;
  imagem: {
    url: string;
  };
  total: number;
}

export default function AdiantamentoList() {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [colaborador, setColaborador] = useState('');

  const [search, setSearch] = useState(false);

  const [adiantamentos, setAdiantamentos] = useState<IAdiantamentoType[]>([]);

  useEffect(() => {
    async function loadAdiantamento() {
      const response = await api.get(
        `/adiantamento?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&colaborador=${colaborador}`,
      );
      console.log(response.data.length);
      // let teste = response.data.filter(item => {
      //   let total = 0;
      //   // console.log(item.total);

      //   if (item.total !== null) {
      //     total = total + item.total;
      //   }

      //   console.log(total);

      //   return total;
      // });

      // console.log(teste);

      setAdiantamentos(response.data);
    }

    loadAdiantamento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, colaborador]);

  function checksDates() {
    if (dataIncio.length !== 10 || dataFim.length !== 10) {
      return;
    }
    let initialDate = String(
      moment(dataIncio, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    );

    let finalDate = String(moment(dataFim, 'DD-MM-YYYY').format('YYYY-MM-DD'));

    setDataInicioChecks(initialDate);
    setDataFimChecks(finalDate);

    setSearch(true);
  }

  function coloseSearch() {
    setDataFim('');
    setDataFimChecks('');
    setDataInicio('');
    setDataInicioChecks('');
    setNomeLinha('');
    setSearch(false);
  }

  // console.log(adiantamentos);
  let total = 0;

  adiantamentos.filter(item => {
    if (item.total) {
      total += item.total;
    }
  });

  console.log(total);

  return (
    <SafeAreaView>
      <HeaderList
        namePage="Listagem Adiantamento"
        total={total}
        register={adiantamentos.length}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <BoxInput>
            <Input
              onChangeText={setNomeLinha}
              value={nomeLinha}
              placeholder="Buscar por nome da linha"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={setColaborador}
              value={colaborador}
              placeholder="Buscar por colaborador"
            />
          </BoxInput>

          <BoxInputsDate>
            <BoxInpuDate>
              <InputDate
                onChangeText={e => setDataInicio(inputDataNascimentoMask(e))}
                value={dataIncio}
                placeholder="01/03/2020"
                maxLength={10}
              />
            </BoxInpuDate>

            <BoxInpuDate>
              <InputDate
                onChangeText={e => setDataFim(inputDataNascimentoMask(e))}
                value={dataFim}
                placeholder="01/03/2023"
                maxLength={10}
              />
            </BoxInpuDate>

            <ButtonSearch
              onPress={() => {
                checksDates();
              }}>
              <TextButtonSearch>
                <Icons name="search1" size={30} color="#FFF" />
              </TextButtonSearch>
            </ButtonSearch>

            {search && (
              <ButtonClose onPress={coloseSearch}>
                <Icons name="closecircleo" size={30} color="#FFF" />
              </ButtonClose>
            )}
          </BoxInputsDate>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
