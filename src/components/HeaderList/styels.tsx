import styled from 'styled-components/native';

export const HeaderContent = styled.View`
  display: flex;
  /* flex-direction: ; */
  justify-content: center;
  align-items: center;
  background-color: #005f98;
  height: 100px;
`;

export const TextHeader = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  text-align: center;
`;

export const ContentHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

export const BoxTotal = styled.View`
  margin-top: 10px;
`;

export const BoxTotalGegister = styled.View`
  align-items: flex-end;
  margin-top: 10px;
`;

export const TotalText = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const Total = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #e3db59;
`;

export const TotalGerister = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #fff;
`;

export const ButtonExit = styled.TouchableOpacity`
  background-color: #ae3d0c;
`;
