import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker/src';
import Icons from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';

import {
  BoxButtonsSelectPhoto,
  BoxInput,
  Button,
  ButtonAnexar,
  ButtonAnexarText,
  ButtonCloseModal,
  ButtonSelectPhoto,
  Container,
  Erro,
  Input,
  InputDate,
  Loading,
  Preview,
  TextButton,
} from './styles';
import {ImagePickerResponse} from 'react-native-image-picker/src';
import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import inputDataNascimentoMask from '../../components/inputDataNascimentoMask';

interface INavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
}

export default function Pecas({navigation, route}: INavigationProps) {
  const [nomePeca, setNomePeca] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [desconto, setDesconto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataNota, setDataNota] = useState('');

  const [uri, setUri] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');

  const [valor, setValor] = useState('');
  const [buttonAnexar, setButtonAnexar] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [registerId, setRegisterId] = useState('');

  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>();

  function openComera() {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        // includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
      },
      response => {
        console.log(response);

        setPickerResponse(response);
        setUri('');
      },
    );
  }

  function openGallery() {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 800,
        maxWidth: 800,
      },
      response => {
        console.log(response);

        setPickerResponse(response);
        setUri('');
      },
    );
  }

  async function register() {
    if (!pickerResponse || !dataNota) {
      setError('Tire uma foto para continuar ou informe uma data');
    } else {
      try {
        setError('');

        setLoading(true);
        const data = new FormData();

        data.append('file', {
          name: !pickerResponse?.fileName
            ? String(Date.now())
            : pickerResponse?.fileName,
          uri: pickerResponse?.uri,
          type: pickerResponse?.type,
        });

        data.append('nomePeca', nomePeca);
        data.append(
          'dataNota',
          moment(dataNota, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        );
        data.append(
          'valorUnitario',
          valorUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
        data.append('veiculo', veiculo);
        data.append('quantidade', quantidade);
        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);
        data.append(
          'desconto',
          desconto.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

        await api.post('/peca', data);
        setLoading(false);

        Alert.alert('Registro cadastrado');
        setNomePeca('');
        setVeiculo('');
        setNomeLinha('');
        setQuantidade('');
        setValorUnitario('');
        setDescricao('');
        setValor('');
        setDesconto('');
        setPickerResponse(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/peca/${registerId}`);

      // setRegisterRecovered(response.data);
      setNomePeca(response.data.nomePeca);
      setDataNota(
        moment(response.data.createdAt, 'YYYY-MM-DD ').format('DD-MM-YYYY'),
      );
      setVeiculo(String(response.data.veiculo));
      setQuantidade(String(response.data.quantidade));
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);

      setDesconto(inputValueMask(String(response.data.desconto) + '00'));
      if (String(response.data.desconto).split('.')[1]) {
        if (String(response.data.desconto).split('.')[1].length === 2) {
          setDesconto(inputValueMask(String(response.data.desconto)));
        }
        if (String(response.data.desconto).split('.')[1].length === 1) {
          setDesconto(inputValueMask(String(response.data.desconto) + '0'));
        }
      }

      setValorUnitario(
        inputValueMask(String(response.data.valorUnitario) + '00'),
      );
      if (String(response.data.valorUnitario).split('.')[1]) {
        if (String(response.data.valorUnitario).split('.')[1].length === 2) {
          setValorUnitario(inputValueMask(String(response.data.valorUnitario)));
        }
        if (String(response.data.valorUnitario).split('.')[1].length === 1) {
          setValorUnitario(
            inputValueMask(String(response.data.valorUnitario) + '0'),
          );
        }
      }

      if (response.data.total) {
        setValor(inputValueMask(String(response.data.total) + '00'));
        if (String(response.data.total).split('.')[1].length === 2) {
          setValor(inputValueMask(String(response.data.total)));
        }
        if (String(response.data.total).split('.')[1].length === 1) {
          setValor(inputValueMask(String(response.data.total) + '0'));
        }
      }

      setUri(response.data.imagem.url);
      setButtonAnexar(true);
    }

    if (route.params) {
      const {registerId: id} = route.params.params;
      setRegisterId(id);
    }

    if (registerId) {
      loadRegister();
    }
  }, [registerId, route]);

  async function updateRegister() {
    try {
      setLoading(true);
      const data = new FormData();

      pickerResponse &&
        data.append('file', {
          name: !pickerResponse?.fileName
            ? String(Date.now())
            : pickerResponse?.fileName,
          uri: pickerResponse?.uri,
          type: pickerResponse?.type,
        });

      nomePeca && data.append('nomePeca', nomePeca);
      dataNota &&
        data.append(
          'dataNota',
          moment(dataNota, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        );
      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);
      desconto &&
        data.append(
          'desconto',
          desconto.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
      valorUnitario &&
        data.append(
          'valorUnitario',
          valorUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
      valor &&
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

      await api.put(`/peca/${registerId}`, data);
      Alert.alert('Registro alterado!');
      navigation.navigate('PecasList', {
        params: {reloadPage: true},
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const [imageShow, setImageShow] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const images = [
    {
      url: imageShow,
    },
  ];

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
      <HeaderName namePage={!registerId ? 'Cadastrar Peça' : 'Alterar Peça'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Container>
          <BoxInput>
            <Input
              onChangeText={setNomeLinha}
              value={nomeLinha}
              placeholder="Nome da linha"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={setNomePeca}
              value={nomePeca}
              placeholder="Nome peça"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={setVeiculo}
              value={veiculo}
              placeholder="Veiculo"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={setQuantidade}
              value={quantidade}
              placeholder="Quantidade"
              keyboardType="numeric"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setValorUnitario(inputValueMask(e))}
              value={valorUnitario}
              placeholder="Valor unitário"
              keyboardType="numeric"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setDesconto(inputValueMask(e))}
              value={desconto}
              placeholder="Desconto"
              keyboardType="numeric"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setValor(inputValueMask(e))}
              value={valor}
              placeholder="Total"
              keyboardType="numeric"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setDescricao(e)}
              value={descricao}
              placeholder="Descrição"
            />
          </BoxInput>

          <BoxInput>
            <InputDate
              onChangeText={e => setDataNota(inputDataNascimentoMask(e))}
              value={dataNota}
              placeholder="01/03/2020"
              maxLength={10}
              keyboardType="numeric"
            />
          </BoxInput>

          <ButtonAnexar onPress={() => setButtonAnexar(true)}>
            <ButtonAnexarText>Anexar foto</ButtonAnexarText>
            <Icons name="paperclip" size={20} color="#c4c4c4" />
          </ButtonAnexar>

          {buttonAnexar && (
            <BoxButtonsSelectPhoto>
              <ButtonSelectPhoto onPress={() => openComera()}>
                <Icons name="camera" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>

              <ButtonSelectPhoto onPress={() => openGallery()}>
                <Icons name="folderopen" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>
            </BoxButtonsSelectPhoto>
          )}

          {pickerResponse && (
            <TouchableOpacity onPress={() => showModal(pickerResponse.uri!)}>
              <Preview source={{uri: pickerResponse.uri}} />
            </TouchableOpacity>
          )}

          {!!uri && (
            <TouchableOpacity onPress={() => showModal(uri)}>
              <Preview source={{uri: uri}} />
            </TouchableOpacity>
          )}

          {!!error && <Erro>{error}</Erro>}

          {loading ? (
            <Loading>
              <ActivityIndicator size="large" color="#208eeb" />
            </Loading>
          ) : (
            <Button
              onPress={() => {
                if (!registerId) {
                  register();
                } else {
                  updateRegister();
                }
              }}>
              {!registerId ? (
                <TextButton>Cadastrar</TextButton>
              ) : (
                <TextButton>Salvar</TextButton>
              )}
            </Button>
          )}
        </Container>
      </ScrollView>
    </>
  );
}
