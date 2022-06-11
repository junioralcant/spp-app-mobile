import styled from 'styled-components/native';

export const HeaderContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #005f98;
  height: 150px;
`;

export const ButtonExit = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  left: 20px;
`;

export const TextHeader = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export const ContentHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-top: 30px;
`;

export const BoxTotal = styled.View`
  margin-top: 10px;
`;

export const BoxTotalGegister = styled.View`
  position: relative;
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
  color: #38e372;
`;

export const TotalGerister = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #ed657d;
`;

export const ResumeTotal = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #e3db59;
`;

export const BoxResumoGegister = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
`;

export const BoxUserName = styled.View`
  position: absolute;

  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  width: 60px;
  margin-bottom: 5px;

  top: -35px;
  right: 5px;
`;
