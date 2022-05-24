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
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

interface INavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{params: {params: {registerId: string}}}, 'params'>;
}

export default function Roco({navigation, route}: INavigationProps) {
  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [uriAntes, setUriAntes] = useState('');
  const [uriDepois, setUriDepois] = useState('');

  const [buttonAnexarAntes, setButtonAnexarAntes] = useState(false);
  const [buttonAnexarDepois, setButtonAnexarDepois] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [registerId, setRegisterId] = useState('');

  const [pickerResponseAntes, setPickerResponseAntes] =
    useState<ImagePickerResponse | null>();

  const [pickerResponseDepois, setPickerResponseDepois] =
    useState<ImagePickerResponse | null>();

  function openComera(antes: boolean, depois: boolean) {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        // includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
      },
      response => {
        console.log(response);

        if (antes) {
          setPickerResponseAntes(response);
          setUriAntes('');
        }

        if (depois) {
          setPickerResponseDepois(response);
          setUriDepois('');
        }
      },
    );
  }

  function openGallery(antes: boolean, depois: boolean) {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 800,
        maxWidth: 800,
      },
      response => {
        console.log(response);

        if (antes) {
          setPickerResponseAntes(response);
          setUriAntes('');
        }

        if (depois) {
          setPickerResponseDepois(response);
          setUriDepois('');
        }
      },
    );
  }

  async function register() {
    if (!pickerResponseAntes) {
      setError('Tire ou selecione uma foto de antes para continuar');
    } else {
      try {
        setError('');

        setLoading(true);
        const data = new FormData();

        data.append('fotoAntes', {
          name: !pickerResponseAntes?.fileName
            ? String(Date.now())
            : pickerResponseAntes?.fileName,
          uri: pickerResponseAntes?.uri,
          type: pickerResponseAntes?.type,
        });

        pickerResponseDepois &&
          data.append('fotoDepois', {
            name: !pickerResponseDepois?.fileName
              ? String(Date.now())
              : pickerResponseDepois?.fileName,
            uri: pickerResponseDepois?.uri,
            type: pickerResponseDepois?.type,
          });

        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);

        await api.post('/roco', data);
        setLoading(false);

        Alert.alert('Registro cadastrado');
        setNomeLinha('');
        setDescricao('');
        setPickerResponseAntes(null);
        setPickerResponseDepois(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/roco/${registerId}`);

      // setRegisterRecovered(response.data);
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);
      response.data.fotoAntes.url && setUriAntes(response.data.fotoAntes.url);
      response.data.fotoDepois.url &&
        setUriDepois(response.data.fotoDepois.url);
      setButtonAnexarAntes(true);
      setButtonAnexarDepois(true);
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

      pickerResponseAntes &&
        data.append('fotoAntes', {
          name: !pickerResponseAntes?.fileName
            ? String(Date.now())
            : pickerResponseAntes?.fileName,
          uri: pickerResponseAntes?.uri,
          type: pickerResponseAntes?.type,
        });

      pickerResponseDepois &&
        data.append('fotoDepois', {
          name: !pickerResponseDepois?.fileName
            ? String(Date.now())
            : pickerResponseDepois?.fileName,
          uri: pickerResponseDepois?.uri,
          type: pickerResponseDepois?.type,
        });

      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);

      await api.put(`/roco/${registerId}`, data);
      Alert.alert('Registro alterado!');
      navigation.navigate('RocoList', {
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
      <HeaderName namePage={!registerId ? 'Cadastrar Roço' : 'Alterar Roço'} />
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
              onChangeText={e => setDescricao(e)}
              value={descricao}
              placeholder="Descrição"
            />
          </BoxInput>

          <ButtonAnexar onPress={() => setButtonAnexarAntes(true)}>
            <ButtonAnexarText>Anexar foto antes</ButtonAnexarText>
            <Icons name="paperclip" size={20} color="#c4c4c4" />
          </ButtonAnexar>

          {buttonAnexarAntes && (
            <BoxButtonsSelectPhoto>
              <ButtonSelectPhoto
                onPress={() => {
                  openComera(true, false);
                }}>
                <Icons name="camera" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>

              <ButtonSelectPhoto
                onPress={() => {
                  // setAntes(true);
                  // setDepois(false);
                  openGallery(true, false);
                }}>
                <Icons name="folderopen" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>
            </BoxButtonsSelectPhoto>
          )}

          {pickerResponseAntes && (
            <Preview source={{uri: pickerResponseAntes.uri}} />
          )}

          {!!uriAntes && <Preview source={{uri: uriAntes}} />}

          <ButtonAnexar onPress={() => setButtonAnexarDepois(true)}>
            <ButtonAnexarText>Anexar foto depois</ButtonAnexarText>
            <Icons name="paperclip" size={20} color="#c4c4c4" />
          </ButtonAnexar>

          {buttonAnexarDepois && (
            <BoxButtonsSelectPhoto>
              <ButtonSelectPhoto
                onPress={() => {
                  openComera(false, true);
                }}>
                <Icons name="camera" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>

              <ButtonSelectPhoto
                onPress={() => {
                  openGallery(false, true);
                }}>
                <Icons name="folderopen" size={30} color="#61a1c8" />
              </ButtonSelectPhoto>
            </BoxButtonsSelectPhoto>
          )}

          {pickerResponseDepois && (
            <Preview source={{uri: pickerResponseDepois.uri}} />
          )}

          {!!uriDepois && <Preview source={{uri: uriDepois}} />}

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
