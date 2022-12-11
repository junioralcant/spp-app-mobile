import React, {useEffect, useState} from 'react';
import {ScrollView, Modal, ActivityIndicator} from 'react-native';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import Icons from 'react-native-vector-icons/AntDesign';
import ImageViewer from 'react-native-image-zoom-viewer';

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
  Loading,
  TextButtonSearch,
  TextDataContent,
  TextDataContentFoco,
  TextDescriptionContent,
} from './styles';
import api from '../../services/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderTodasDespesas from '../../components/HeaderTodasDespesas';

interface IAdiantamentoType {
  _id: string;
  nomeLinha: string;
  title: string;
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

interface ITotalType {
  total: number;
}

export default function TodasDespesasList({
  route,
  navigation,
}: iNavigationProps) {
  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [allDatas, setAllDatas] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');

  const [search, setSearch] = useState(false);

  const [todasDespesas, setTodasDespesas] = useState<IAdiantamentoType[]>([]);
  const [totals, setTotals] = useState<ITotalType[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageShow, setImageShow] = useState('');

  const [loading, setLoading] = useState(false);

  const images = [
    {
      url: imageShow,
    },
  ];

  useEffect(() => {
    async function loadAdiantamento() {
      setLoading(true);
      const response = await api.get(
        `/todasdespesas?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&tipoPagamento=${tipoPagamento}`,
      );
      setTodasDespesas(response.data);
      setLoading(false);
    }

    loadAdiantamento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, route, tipoPagamento]);

  useEffect(() => {
    async function loadTotal() {
      const response = await api.get(
        `/saldo?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&allDatas=${allDatas}`,
      );

      setTotals(response.data);
    }

    loadTotal();
  }, [route, dataFimChecks, dataInicioChecks, allDatas]);

  function checksDates() {
    if (dataIncio.length !== 10 || dataFim.length !== 10) {
      return;
    }
    let initialDate = String(
      moment(dataIncio, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    );

    let finalDate = String(moment(dataFim, 'DD-MM-YYYY').format('YYYY-MM-DD'));

    setAllDatas('todas');
    setDataInicioChecks(initialDate);
    setDataFimChecks(finalDate);

    setSearch(true);
  }

  function coloseSearch() {
    setDataFim('');
    setDataFimChecks('');
    setDataInicio('');
    setDataInicioChecks('');
    setAllDatas('');
    setNomeLinha('');
    setSearch(false);
  }

  let totalSaidas = 0;
  let totalSaldo = 0;

  todasDespesas.filter(item => {
    if (item.total) {
      totalSaidas += item.total;
    }
  });

  totals.filter(item => {
    if (item.total) {
      totalSaldo += item.total;
    }
  });

  let resumo = totalSaldo - totalSaidas;

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
      <HeaderTodasDespesas
        namePage="Todas as Despesas"
        navigation={navigation}
        totalSaidas={totalSaidas}
        totalSaldo={totalSaldo}
        resumo={resumo}
        registros={todasDespesas.length}
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

          {loading ? (
            <Loading>
              <ActivityIndicator size="large" color="#208eeb" />
            </Loading>
          ) : (
            <BoxList>
              {todasDespesas.map(despesa => (
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
                        <TextDataContentFoco>Pagamento:</TextDataContentFoco>{' '}
                        {despesa.tipoPagamento}
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

                    {despesa.imagem !== null && (
                      <TouchableOpacity
                        onPress={() => showModal(despesa.imagem.url)}>
                        <ImageContent
                          source={{
                            uri: despesa.imagem.url,
                          }}
                        />
                      </TouchableOpacity>
                    )}
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
          )}
        </Container>
      </ScrollView>
    </>
  );
}
