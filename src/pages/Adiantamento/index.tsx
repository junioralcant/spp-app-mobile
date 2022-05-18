import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderName from '../../components/HeaderName';
import inputValueMask from '../../components/inputValueMask';

export default function Adiantamento() {
  const [nome, setNome] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [valor, setValor] = useState('');
  const [buttonAnexar, setButtonAnexar] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      },
    );
  }

  async function register() {
    if (pickerResponse === null) {
      setError('Tire uma foto para continuar');
    } else {
      try {
        setLoading(true);
        const data = new FormData();

        data.append('file', {
          name: !pickerResponse?.fileName
            ? String(Date.now())
            : pickerResponse?.fileName,
          uri: pickerResponse?.uri,
          type: pickerResponse?.type,
        });

        data.append('nomeColaborador', nome);
        data.append('nomeLinha', nomeLinha);
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.'),
        );

        console.log(data);

        await api.post('/adiantamento', data);
        setLoading(false);

        Alert.alert('Registro cadastrado');
        setNome('');
        setNomeLinha('');
        setValor('');
        setPickerResponse(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <SafeAreaView>
      <HeaderName namePage="Cadastrar" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
              onChangeText={setNome}
              value={nome}
              placeholder="Nome Colaborador"
            />
          </BoxInput>

          <BoxInput>
            <Input
              onChangeText={e => setValor(inputValueMask(e))}
              value={valor}
              placeholder="Valor"
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

          {!!error && <Erro>{error}</Erro>}

          {loading ? (
            <Loading>
              <ActivityIndicator size="large" color="#208eeb" />
            </Loading>
          ) : (
            <Button onPress={register}>
              <TextButton>Cadastrar</TextButton>
            </Button>
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
