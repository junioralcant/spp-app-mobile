import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  margin-top: 10%;
  padding-right: 20px;
  padding-left: 20px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005f98;
  width: 100%;
  height: 65px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;
