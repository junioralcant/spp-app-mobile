import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff3f6;
`;

export const ButtonSelectPhoto = styled.TouchableOpacity`
  /* background-color: #3b9fec; */
`;

export const BoxButtonsSelectPhoto = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 80px;
  margin-bottom: 10px;
`;

export const Preview = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  align-self: center;
  border-radius: 4px;
`;

export const BoxInput = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
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

export const ButtonAnexar = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 20px 20px 0 20px;
  border-radius: 10px;
  height: 55px;
  background-color: #fff;
  margin-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

export const ButtonAnexarText = styled.Text`
  color: #c4c4c4;
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

export const Erro = styled.Text`
  align-self: center;
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const ButtonCloseModal = styled.TouchableOpacity`
  /* background-color: #ae3d0c; */
  position: absolute;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
  top: 50px;
  right: 20px;
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
  width: 150px;
`;
