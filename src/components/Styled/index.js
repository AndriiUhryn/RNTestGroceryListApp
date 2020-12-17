import React from 'react';
import styled from 'styled-components/native';
import { vs } from 'react-native-size-matters';
import { Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { HEADER_HEIGHT } from '../../constants/general';

const { height } = Dimensions.get('window');

const dismissKeyBoard = () => Keyboard.dismiss();

const ContentBetween = styled.SafeAreaView`
  width: 100%;
  height: ${height - vs(HEADER_HEIGHT) + 1};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentBetweenAutoDismiss = (props) => (
 <TouchableWithoutFeedback onPress={dismissKeyBoard}>
   <ContentBetween {...props} />
 </TouchableWithoutFeedback>
);

export const StyledComponents = {
  ContentBetween,
  ContentBetweenAutoDismiss,
  Container: styled.View`
    flex: 1;
    position: relative;
    background-color: ${props => props.theme.colors.background.content};
  `,
  Content: styled.SafeAreaView`
    width: 100%;
    height: ${height - vs(HEADER_HEIGHT) + 1};
  `,
  ContentCenter: styled.SafeAreaView`
    width: 100%;
    height: ${height - vs(HEADER_HEIGHT) + 1};
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

export default StyledComponents;
