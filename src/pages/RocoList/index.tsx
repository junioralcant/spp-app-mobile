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
  BoxImagens,
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
  ViewImagem,
} from './styles';
import api from '../../services/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

interface IAdiantamentoType {
  _id: string;
  nomeLinha: string;
  nomeColaborador: string;
  fotoAntes: {
    url: string;
  };
  fotoDepois: {
    url: string;
  };
  descricao: string;
  total: number;
  createdAt: Date;
}

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{params: {params: {pageName: string}}}, 'params'>;
}

export default function RocoList({navigation, route}: iNavigationProps) {
  const {pageName} = route.params.params;

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');

  const [search, setSearch] = useState(false);

  const [rocos, setRocos] = useState<IAdiantamentoType[]>([]);

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
        `/roco?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${pageName}&descricao=${descricao}`,
      );
      setRocos(response.data);
    }

    loadAdiantamento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, route, descricao, pageName]);

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
    setDescricao('');
    setSearch(false);
  }

  let total = 0;

  rocos.filter(item => {
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
            await api.delete(`/roco/${id}`);
            const response = await api.get(
              `/roco?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${pageName}&descricao=${descricao}`,
            );
            setRocos(response.data);
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
    navigation.navigate('Roco', {
      params: {registerId: id, pageName},
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
        namePage={`Listagem Roço ${pageName}`}
        total={total}
        register={rocos.length}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Container>
          {/* <BoxInput>
            <Input
              onChangeText={setNomeLinha}
              value={nomeLinha}
              placeholder="Buscar por nome da linha"
            />
          </BoxInput> */}

          <BoxInput>
            <Input
              onChangeText={setDescricao}
              value={descricao}
              placeholder="Buscar por descrição"
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

          <BoxList>
            {rocos.map(roco => (
              <Card key={roco._id}>
                <HeaderCard>
                  <ButtonHeaderDelete onPress={() => deleteGegister(roco._id)}>
                    <Icons name="delete" size={30} color="#FFF" />
                  </ButtonHeaderDelete>
                  <ButtonHeaderEdite onPress={() => editRegister(roco._id)}>
                    <Icons name="edit" size={30} color="#FFF" />
                  </ButtonHeaderEdite>
                </HeaderCard>

                <BoxCardContent>
                  <BoxDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Data:</TextDataContentFoco>{' '}
                      {moment(roco.createdAt).format('DD-MM-YYYY')}
                    </TextDataContent>

                    <TextDataContent>
                      <TextDataContentFoco>Linha:</TextDataContentFoco>{' '}
                      {roco.nomeLinha}
                    </TextDataContent>
                  </BoxDataContent>

                  <BoxImagens>
                    {roco.fotoAntes && (
                      <ViewImagem onPress={() => showModal(roco.fotoAntes.url)}>
                        <TextDataContent>Antes</TextDataContent>

                        <ImageContent
                          source={{
                            uri: roco.fotoAntes.url,
                          }}
                        />
                      </ViewImagem>
                    )}

                    {roco.fotoDepois && (
                      <ViewImagem
                        onPress={() => showModal(roco.fotoDepois.url)}>
                        <TextDataContent>Depois</TextDataContent>

                        <ImageContent
                          source={{
                            uri: roco.fotoDepois.url,
                          }}
                        />
                      </ViewImagem>
                    )}
                  </BoxImagens>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <TextDataContent>Descrição</TextDataContent>
                  <TextDescriptionContent>
                    {roco.descricao}
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
