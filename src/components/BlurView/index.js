import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { BlurView as RNBlurView } from '@react-native-community/blur';

export const BlurView = props => {
  return Platform.OS === 'ios' ? <RNBlurView {...props} /> : <AndroidBG {...props} />;
};

export default BlurView;

const AndroidBG = styled.View`
  background-color: ${props => props.theme.colors.background.modal};
`;
