import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { vs, s, ms } from 'react-native-size-matters';
import { hideMessage } from 'react-native-flash-message';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  errorMessage: {
    id: 'flash.default.error.message',
    defaultMessage: 'Error'
  },
  successMessage: {
    id: 'flash.default.success.message',
    defaultMessage: 'Success'
  }
});

export const FlashMessageCustom = props => {
  const {
    message: {
      type,
      message
    }
  } = props;
  const { formatMessage } = useIntl();

  return (
   <ContentHolder type={type}>
     <Content onPress={hideMessage}>
       <TitleHolder type={type}>
         {
           message || (messages[`${type}Message`] && formatMessage(messages[`${type}Message`])) || ''
         }
       </TitleHolder>
     </Content>
   </ContentHolder>
  );
};

export default FlashMessageCustom;

const ContentHolder = styled.SafeAreaView`
  top: 0;
  flex: 1;
  left: 0;
  width: 100%;
  z-index: 999;
  position: absolute;
  background-color: ${props => props.theme.colors.background.flash[props.type]};
`;

const Content = styled.TouchableOpacity`
  flex: 1;
  padding-top: ${vs(5) + (Platform.OS === 'android' ? getStatusBarHeight() : 0)}px;
  padding-bottom: ${vs(20)}px;
  paddingHorizontal: ${s(20)}px;
`;

const TitleHolder = styled.Text`
  color: ${props => props.theme.colors.text.flash[props.type]};
  font-size: ${ms(15)}px;
  margin-bottom: ${vs(5)}px;
`;
