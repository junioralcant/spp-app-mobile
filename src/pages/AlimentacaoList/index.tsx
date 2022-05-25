import React, {useEffect, useState} from 'react';
import {ScrollView, Alert, Modal} from 'react-native';
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
  ButtonHeaderDelete,
  ButtonHeaderEdite,
  ButtonSearch,
  Card,
  Container,
  HeaderCard,
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
  quantidade: string;
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

export default function AlimentacaoList({navigation, route}: iNavigationProps) {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');

  const [search, setSearch] = useState(false);

  const [alimentacoes, setAlimentacoes] = useState<IAdiantamentoType[]>([]);

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
        `/alimentacoes?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}`,
      );
      setAlimentacoes(response.data);
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

  alimentacoes.filter(item => {
    if (item.total) {
      total += item.total;
    }
  });

  function deleteGegister(id: string) {
    Alert.alert('Deletar', 'Deseja realmente deletar esse registro?', [
      {
        text: 'Cancelar',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await api.delete(`/alimentacao/${id}`);
            const response = await api.get('/alimentacoes');
            setAlimentacoes(response.data);
            Alert.alert('Registro deletado com sucesso!');
          } catch (error) {
            console.log(error);
            Alert.alert('Problema ao deletar registro');
          }
        },
      },
    ]);
  }

  function editRegister(id: string) {
    navigation.navigate('Alimentacao', {
      params: {registerId: id},
    });
  }

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
        namePage="Listagem Alimentação"
        total={total}
        register={alimentacoes.length}
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
            {alimentacoes.map(adiantamento => (
              <Card key={adiantamento._id}>
                <HeaderCard>
                  <ButtonHeaderDelete
                    onPress={() => deleteGegister(adiantamento._id)}>
                    <Icons name="delete" size={30} color="#FFF" />
                  </ButtonHeaderDelete>
                  <ButtonHeaderEdite
                    onPress={() => editRegister(adiantamento._id)}>
                    <Icons name="edit" size={30} color="#FFF" />
                  </ButtonHeaderEdite>
                </HeaderCard>

                <BoxCardContent>
                  <BoxDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Data:</TextDataContentFoco>{' '}
                      {moment(adiantamento.createdAt).format('DD-MM-YYYY')}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Linha:</TextDataContentFoco>{' '}
                      {adiantamento.nomeLinha}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Quantidade:</TextDataContentFoco>{' '}
                      {adiantamento.quantidade}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Total:</TextDataContentFoco>{' '}
                      {adiantamento.total &&
                        adiantamento.total.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                  </BoxDataContent>

                  <TouchableOpacity
                    onPress={() => showModal(adiantamento.imagem.url)}>
                    <ImageContent
                      source={{
                        uri: adiantamento.imagem.url,
                      }}
                    />
                  </TouchableOpacity>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <TextDataContent>Descrição</TextDataContent>
                  <TextDescriptionContent>
                    {adiantamento.descricao}
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
