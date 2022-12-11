import React, {useEffect, useState} from 'react';
import {ScrollView, Alert, Modal} from 'react-native';
import moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import HeaderList from '../../components/HeaderList';
import inputDataNascimentoMask from '../../components/inputDataNascimentoMask';
import api from '../../services/api';

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

interface IAdiantamentoType {
  _id: string;
  nomeLinha: string;
  veiculo: string;
  litros: string;
  valorUnitario: number;
  imagem: {
    url: string;
  };
  tipoPagamento: string;
  descricao: string;
  total: number;
  createdAt: Date;
}

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
  route: StackNavigationProp<any, any>;
}

export default function AdiantamentoList({
  navigation,
  route,
}: iNavigationProps) {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');

  const [search, setSearch] = useState(false);

  const [adiantamentos, setAdiantamentos] = useState<IAdiantamentoType[]>([]);

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
        `/abastecimento?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&veiculo=${veiculo}&tipoPagamento=${tipoPagamento}`,
      );
      setAdiantamentos(response.data);
    }

    loadAdiantamento();
  }, [
    dataFimChecks,
    dataInicioChecks,
    nomeLinha,
    veiculo,
    route,
    tipoPagamento,
  ]);

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
    setVeiculo('');
    setSearch(false);
  }

  let total = 0;

  adiantamentos.filter(item => {
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
            await api.delete(`/abastecimento/${id}`);
            const response = await api.get('/abastecimento');
            setAdiantamentos(response.data);
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
    navigation.navigate('Abastecimento', {
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
        namePage="Listagem Abastecimento"
        total={total}
        register={adiantamentos.length}
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
              onChangeText={setVeiculo}
              value={veiculo}
              placeholder="Buscar por veiculo"
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
            {adiantamentos.map(adiantamento => (
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
                      <TextDataContentFoco>Veiculo:</TextDataContentFoco>{' '}
                      {adiantamento.veiculo}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Litros:</TextDataContentFoco>{' '}
                      {adiantamento.litros} L
                    </TextDataContent>

                    <TextDataContent>
                      <TextDataContentFoco>Valor Unitário:</TextDataContentFoco>
                      {adiantamento.valorUnitario &&
                        adiantamento.valorUnitario.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </TextDataContent>
                    <TextDataContent>
                      <TextDataContentFoco>Pagamento:</TextDataContentFoco>{' '}
                      {adiantamento.tipoPagamento}
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
