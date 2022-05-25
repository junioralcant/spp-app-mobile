import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

import api from '../../services/api';

import SPP from '../../assets/img/SPP.png';

import {
  BoxInput,
  Button,
  Container,
  Erro,
  Image,
  Input,
  Loading,
  TextButton,
} from './styles';
import {StackNavigationProp} from '@react-navigation/stack';

interface iNavigationProps {
  navigation: StackNavigationProp<any, any>;
}

export default function SignIn({navigation}: iNavigationProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(userId => {
      if (userId) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          }),
        );
      }
    });
  }, [navigation]);

  async function handleSignInPress() {
    if (email.length === 0) {
      setError('Preencha email para continuar!');
    } else {
      try {
        setLoading(true);

        const response = await api.post('/sessions', {
          email,
          password,
        });

        console.log(response);

        await AsyncStorage.setItem('@SPP:token', response.data.token);
        await AsyncStorage.setItem('userId', response.data.user._id);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          }),
        );

        setLoading(false);
      } catch (_err) {
        console.log(_err);
        setError('Houve um problema com o login, verifique seu email!');
        setLoading(false);
      }
    }
  }

  console.log(email.length);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Image source={SPP} />
        <BoxInput>
          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Informe seu email"
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType="email-address"
          />
        </BoxInput>

        <BoxInput>
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Informe sua Senha"
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry
          />
        </BoxInput>

        {!!error && <Erro>{error}</Erro>}
        {loading ? (
          <Loading>
            <ActivityIndicator size="large" color="#208eeb" />
          </Loading>
        ) : (
          <Button onPress={handleSignInPress}>
            <TextButton>LOGIN</TextButton>
          </Button>
        )}

        {/* <BannerLogo source={Logo} /> */}
      </Container>
    </ScrollView>
  );
}
