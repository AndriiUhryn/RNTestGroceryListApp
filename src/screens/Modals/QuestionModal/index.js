import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { s, ms, vs } from 'react-native-size-matters';
import { defineMessages, useIntl } from 'react-intl';

import { Button, BlurView } from '../../../components';

import { goBack } from '../../../lib/navigation';

const messages = defineMessages({
  submit: {
    id: 'question.submit',
    defaultMessage: 'Change'
  },
  close: {
    id: 'explanation.close',
    defaultMessage: 'Close'
  }
});

export const QuestionModal = props => {
  const { formatMessage } = useIntl();
  const { title, subTitle, submitTitle, onSubmit } = props.route.params;

  const handleSubmit = () => {
    goBack();

    typeof onSubmit === 'function' && onSubmit();
  };

  return (
   <BlurView
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: s(16)
    }}
    blurType="dark"
   >
     <ContentWrapper>
       <Content>
         <TopBlock>
           <Title bold>
             {title}
           </Title>
           <Title>
             {subTitle}
           </Title>
         </TopBlock>
         <Button
          size="lg"
          title={submitTitle || formatMessage(messages.submit)}
          onPress={handleSubmit}
          bgColor="yellow"
         />
       </Content>
       <CloseButton onPress={goBack}>
         <CloseTitle>
           {formatMessage(messages.close)}
         </CloseTitle>
       </CloseButton>
     </ContentWrapper>
   </BlurView>
  );
};

export default QuestionModal;

QuestionModal.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  subTitle: PropTypes.string,
  submitTitle: PropTypes.string
};

QuestionModal.defaultProps = {
  title: '',
  subTitle: '',
  submitTitle: '',
  onSubmit: () => {
  }
};

const Content = styled.View`
  width: 100%;
  display: flex;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border.yellow};
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background.black};
`;

const ContentWrapper = styled.View`
  width: 100%;
`;

const TopBlock = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text.yellow};
  font-size: ${ms(18)}px;
  text-align: center;
  font-family: ${props => props.theme.fonts[props.bold ? 'bold' : 'default']};
  padding-top: ${vs(20)}px;
  paddingHorizontal: ${s(20)}px;
`;

const CloseButton = styled.TouchableOpacity`
  top: -${vs(30)}px;
  right: 0;
  position: absolute;
`;

const CloseTitle = styled.Text`
  color: ${props => props.theme.colors.text.white};
  font-size: ${ms(15)}px;
  font-family: ${props => props.theme.fonts.default};
`;
