import React, {useEffect, useState} from 'react';
import {ScrollView, Modal} from 'react-native';
import moment from 'moment';

import Icons from 'react-native-vector-icons/AntDesign';

import ImageViewer from 'react-native-image-zoom-viewer';

import HeaderList from '../../components/HeaderList';
import inputDataNascimentoMask from '../../components/inputDataNascimentoMask';

import {
  BoxCardContent,
  BoxDataContent,
  BoxDescriptionContent,
  BoxInpuDate,
  BoxInput,
  BoxInputsDate,
  BoxList,
  ButtonClose,
  ButtonCloseModal,
  ButtonSearch,
  Card,
  Container,
  ImageContent,
  Input,
  InputDate,
  TextButtonSearch,
  TextDataContent,
  TextDataContentFoco,
  TextDescriptionContent,
} from './styles';
import api from '../../services/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IAdiantamentoType {
  _id: string;
  nomeLinha: string;
  title: string;
  imagem: {
    url: string;
  };
  descricao: string;
  total: number;
  createdAt: Date;
}

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: StackNavigationProp<any, any>;
}

export default function TodasDespesasList({route}: iNavigationProps) {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');

  const [search, setSearch] = useState(false);

  const [dotasDepesas, setTodasDespesas] = useState<IAdiantamentoType[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageShow, setImageShow] = useState('');

  const images = [
    {
      url: imageShow,
    },
  ];

  useEffect(() => {
    async function loadAdiantamento() {
      const response = await api.get(
        `/todasdespesas?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}`,
      );
      setTodasDespesas(response.data);
    }

    loadAdiantamento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, route]);

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

  let total = 0;

  dotasDepesas.filter(item => {
    if (item.total) {
      total += item.total;
    }
  });

  function showModal(uri: string) {
    setImageShow(uri);
    setModalVisible(true);
  }

  return (
    <>
      <Modal visible={modalVisible} transparent={true}>
        <ButtonCloseModal onPress={() => setModalVisible(false)}>
          <Icons name="closecircleo" size={38} color="#FFF" />
        </ButtonCloseModal>
        <ImageViewer imageUrls={images} />
      </Modal>
      <HeaderList
        namePage="Todas as Despesas"
        total={total}
        register={dotasDepesas.length}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Container>
          <BoxInput>
            <Input
              onChangeText={setNomeLinha}
              value={nomeLinha}
              placeholder="Buscar por nome da linha"
            />
          </BoxInput>

          <BoxInputsDate>
            <BoxInpuDate>
              <InputDate
                onChangeText={e => setDataInicio(inputDataNascimentoMask(e))}
                value={dataIncio}
                placeholder="01/03/2020"
                maxLength={10}
                keyboardType="numeric"
              />
            </BoxInpuDate>

            <BoxInpuDate>
              <InputDate
                onChangeText={e => setDataFim(inputDataNascimentoMask(e))}
                value={dataFim}
                placeholder="01/03/2023"
                maxLength={10}
                keyboardType="numeric"
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

          <BoxList>
            {dotasDepesas.map(despesa => (
              <Card key={despesa._id}>
                <BoxCardContent>
                  <BoxDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Data:</TextDataContentFoco>
                      {moment(despesa.createdAt).format('DD-MM-YYYY')}
                    </TextDataContent>

                    <TextDataContent>
                      <TextDataContentFoco>Linha:</TextDataContentFoco>
                      {despesa.nomeLinha}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Gasto com:</TextDataContentFoco>{' '}
                      {despesa.title}
                    </TextDataContent>

                    <TextDataContent>
                      <TextDataContentFoco>Total:</TextDataContentFoco>{' '}
                      {despesa.total &&
                        despesa.total.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                  </BoxDataContent>

                  <TouchableOpacity
                    onPress={() => showModal(despesa.imagem.url)}>
                    <ImageContent
                      source={{
                        uri: despesa.imagem.url,
                      }}
                    />
                  </TouchableOpacity>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <TextDataContent>Descrição</TextDataContent>
                  <TextDescriptionContent>
                    {despesa.descricao}
                  </TextDescriptionContent>
                </BoxDescriptionContent>
              </Card>
            ))}
          </BoxList>
        </Container>
      </ScrollView>
    </>
  );
}