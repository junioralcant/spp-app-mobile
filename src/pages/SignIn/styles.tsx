import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
`;

export const Image = styled.Image`
  border-radius: 10px;
`;

export const BookBox = styled.Image`
  max-height: 300px;
  max-width: 40%;
  position: absolute;
  margin-top: -10px;
  left: -115px;
`;

export const BannerLogo = styled.Image`
  margin-top: 20px;
  max-height: 40px;
  max-width: 30%;
`;

export const TextBanner = styled.Text`
  position: absolute;
  top: 36%;
  left: 31%;
  padding: 4px;
  border-radius: 5px;
  align-self: center;
  font-size: 19px;
  color: #208eeb;
  font-weight: bold;
`;

export const BoxInput = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 20px 0 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin: 0 0 0px 0;
  border-radius: 10px;
  padding-left: 15px;
  border: 1px #c4c4c4;
`;

export const ForgotPassword = styled.Text`
  color: #208eeb;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 35px;
`;

export const Erro = styled.Text`
  align-self: center;
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005f98;
  width: 90%;
  height: 65px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const TextButton = styled.Text`
  color: #fff;
`;

export const Loading = styled.View`
  width: 60px;
  height: 60px;
`;
