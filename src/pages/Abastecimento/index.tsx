import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import * as ImagePicker from 'react-native-image-picker/src';
import Icons from 'react-native-vector-icons/AntDesign';

import api from '../../services/api';

import {
  BoxButtonsSelectPhoto,
  BoxInput,
  Button,
  ButtonAnexar,
  ButtonAnexarText,
  ButtonSelectPhoto,
  Container,
  Erro,
  Input,
  Loading,
  Preview,
  TextButton,
} from './styles';
import {ImagePickerResponse} from 'react-native-image-picker/src';
import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

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
    if (!pickerResponse) {
      setError('Tire uma foto para continuar');
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
        setNomeLinha('');
        setDescricao('');
        setValor('');
        setVeiculo('');
        setValorUnitario('');
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
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);
      setVeiculo(response.data.veiculo);
      setValorUnitario(
        inputValueMask(String(response.data.valorUnitario) + '00'),
      );
      setValor(inputValueMask(String(response.data.total) + '00'));
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

      valorUnitario &&
        data.append(
          'valorUnitario',
          valorUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'),
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

  return (
    <>
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
              onChangeText={e => setDescricao(e)}
              value={descricao}
              placeholder="Descrição"
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

          {pickerResponse && <Preview source={{uri: pickerResponse.uri}} />}

          {!!uri && <Preview source={{uri: uri}} />}

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
