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
import RNPickerSelect from 'react-native-picker-select';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import {ImagePickerResponse} from 'react-native-image-picker/src';

import api from '../../services/api';

import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';
import inputDataNascimentoMask from '../../components/inputDataNascimentoMask';

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

interface INavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
}

export default function Abastecimento({navigation, route}: INavigationProps) {
  const [litros, setLitros] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [dataNota, setDataNota] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');

  const [uri, setUri] = useState('');

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
        setPickerResponse(response);
        setUri('');
      },
    );
  }

  async function register() {
    if (!pickerResponse || !dataNota || !tipoPagamento) {
      setError(
        `${!pickerResponse ? 'Tire uma foto, ' : ' '}${
          !dataNota ? 'Informe uma data, ' : ' '
        }${
          !tipoPagamento ? 'Selecione o tipo de pagamento, ' : ' '
        }para continuar!`,
      );
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

        data.append('litros', litros);
        data.append('tipoPagamento', tipoPagamento);
        data.append(
          'dataNota',
          moment(dataNota, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        );
        data.append(
          'valorUnitario',
          valorUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);
        data.append('veiculo', veiculo);
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

        const response = await api.post('/abastecimento', data);
        console.log(response);

        setLoading(false);

        Alert.alert('Registro cadastrado');
        setLitros('');
        setTipoPagamento('');
        setNomeLinha('');
        setDescricao('');
        setValor('');
        setVeiculo('');
        setValorUnitario('');
        setDataNota('');
        setPickerResponse(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/abastecimento/${registerId}`);

      // setRegisterRecovered(response.data);
      setLitros(String(response.data.litros));
      setTipoPagamento(response.data.tipoPagamento);
      setDataNota(
        moment(response.data.createdAt, 'YYYY-MM-DD ').format('DD-MM-YYYY'),
      );
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);
      setVeiculo(response.data.veiculo);

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

      if (litros && litros !== 'undefined' && litros !== 'null') {
        data.append('litros', litros);
      }
      tipoPagamento && data.append('tipoPagamento', tipoPagamento);
      valorUnitario &&
        data.append(
          'valorUnitario',
          valorUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );
      dataNota &&
        data.append(
          'dataNota',
          moment(dataNota, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        );
      veiculo && data.append('veiculo', veiculo);
      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);
      valor &&
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

      await api.put(`/abastecimento/${registerId}`, data);
      Alert.alert('Registro alterado!');
      navigation.navigate('AbastecimentoList', {
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
      <HeaderName
        namePage={
          !registerId ? 'Cadastrar Abastecimento' : 'Alterar Abastecimento'
        }
      />
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
              onChangeText={setVeiculo}
              value={veiculo}
              placeholder="Veiculo"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={setLitros}
              value={litros}
              placeholder="Litros"
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
            <RNPickerSelect
              onValueChange={value => setTipoPagamento(value)}
              placeholder={{label: 'Selecione o tipo de pagamento', value: ''}}
              value={tipoPagamento}
              items={[
                {label: 'A vista', value: 'A vista'},
                {label: 'A prazo', value: 'A prazo'},
                {label: 'Cartão de crédito', value: 'Cartao de credito'},
              ]}
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
