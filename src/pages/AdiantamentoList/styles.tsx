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
  margin-bottom: -10px;
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

export const BoxInputsDate = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  /* background: red; */
  /* width: 80%; */
`;

export const BoxInpuDate = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  margin-top: 10px;
  /* padding: 20px 20px 0 20px; */
`;

export const InputDate = styled.TextInput`
  /* width: 100%; */
  height: 60px;
  background-color: #fff;
  margin: 0 0 0px 0;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px #c4c4c4;
  width: 120px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  background-color: #005f98;
  padding: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  height: 60px;
`;

export const ButtonClose = styled.TouchableOpacity`
  background-color: #ae3d0c;
  padding: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  height: 60px;
  margin-left: 10px;
`;

export const TextButtonSearch = styled.Text`
  color: #fff;
`;
