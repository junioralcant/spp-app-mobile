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

interface IhospegemType {
  _id: string;
  nomeLinha: string;
  valorUnitario: number;
  veiculo: string;
  quantidade: string;
  nomePeca: string;
  imagem: {
    url: string;
  };
  descricao: string;
  desconto: number;
  total: number;
  createdAt: Date;
}

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: StackNavigationProp<any, any>;
}

export default function PecasList({navigation, route}: iNavigationProps) {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [nomeVeiculo, setNomeVeiculo] = useState('');

  const [search, setSearch] = useState(false);

  const [hospedagens, setHospedagens] = useState<IhospegemType[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageShow, setImageShow] = useState('');

  const images = [
    {
      url: imageShow,
    },
  ];

  useEffect(() => {
    async function loadhospegem() {
      const response = await api.get(
        `/peca?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&veiculo=${nomeVeiculo}`,
      );
      setHospedagens(response.data);
    }

    loadhospegem();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, route, nomeVeiculo]);

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

  hospedagens.filter(item => {
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
            await api.delete(`/peca/${id}`);
            const response = await api.get('/peca');
            setHospedagens(response.data);
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
    navigation.navigate('Pecas', {
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
        namePage="Listagem Peça"
        total={total}
        register={hospedagens.length}
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

          <BoxInput>
            <Input
              onChangeText={setNomeVeiculo}
              value={nomeVeiculo}
              placeholder="Buscar por nome do veiculo"
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
            {hospedagens.map(peca => (
              <Card key={peca._id}>
                <HeaderCard>
                  <ButtonHeaderDelete onPress={() => deleteGegister(peca._id)}>
                    <Icons name="delete" size={30} color="#FFF" />
                  </ButtonHeaderDelete>
                  <ButtonHeaderEdite onPress={() => editRegister(peca._id)}>
                    <Icons name="edit" size={30} color="#FFF" />
                  </ButtonHeaderEdite>
                </HeaderCard>

                <BoxCardContent>
                  <BoxDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Data:</TextDataContentFoco>{' '}
                      {moment(peca.createdAt).format('DD-MM-YYYY')}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Linha:</TextDataContentFoco>{' '}
                      {peca.nomeLinha}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Veiculo:</TextDataContentFoco>{' '}
                      {peca.veiculo}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Peça:</TextDataContentFoco>{' '}
                      {peca.nomePeca}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Valor Unitário:</TextDataContentFoco>{' '}
                      {peca.valorUnitario &&
                        peca.valorUnitario.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Quantidade:</TextDataContentFoco>{' '}
                      {peca.quantidade}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Desconto:</TextDataContentFoco>{' '}
                      {peca.desconto &&
                        peca.desconto.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Total:</TextDataContentFoco>{' '}
                      {peca.total &&
                        peca.total.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                  </BoxDataContent>

                  <TouchableOpacity onPress={() => showModal(peca.imagem.url)}>
                    <ImageContent
                      source={{
                        uri: peca.imagem.url,
                      }}
                    />
                  </TouchableOpacity>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <TextDataContent>Descrição</TextDataContent>
                  <TextDescriptionContent>
                    {peca.descricao}
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
