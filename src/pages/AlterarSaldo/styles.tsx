import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff3f6;
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

export const Loading = styled.View`
  width: 60px;
  height: 60px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005f98;
  width: 90%;
  height: 65px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;
