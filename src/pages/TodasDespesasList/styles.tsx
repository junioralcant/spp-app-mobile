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

export const BoxList = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 95px;
`;
export const Card = styled.View`
  width: 90%;
  background-color: #005f98;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

export const BoxCardContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BoxDataContent = styled.View`
  /* background-color: #ae3d0c; */
  width: 60%;
`;
export const TextDataContent = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 7px;
`;

export const TextDataContentFoco = styled.Text`
  color: #c4c4c4;
`;

export const ImageContent = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 5px;
`;

export const BoxDescriptionContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextDescriptionContent = styled.Text`
  color: #fff;
  font-size: 18px;
  /* margin-bottom: 7px; */
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

export const StatusBar = styled.StatusBar`
  height: 20px;
  /* margin-bottom: 7px; */
`;

export const Loading = styled.View`
  margin-top: 20px;
  width: 60px;
  height: 60px;
`;
