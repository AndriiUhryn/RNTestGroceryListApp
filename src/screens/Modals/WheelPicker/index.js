import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { s, ms, vs } from 'react-native-size-matters';
import { Picker } from 'react-native-wheel-pick';
import { defineMessages, injectIntl } from 'react-intl';

import { Button, BlurView } from '../../../components';

import { goBack } from '../../../lib/navigation';

const messages = defineMessages({
  submit: {
    id: 'wheelPicker.submit',
    defaultMessage: 'Select'
  },
  close: {
    id: 'wheelPicker.close',
    defaultMessage: 'Close'
  }
});

@injectIntl
export class WheelPicker extends Component {
  constructor(props) {
    super(props);

    const options = this.props.route?.params?.options;
    const selectedValue = this.props.route?.params?.value;

    this.state = {
      selectedValue: selectedValue || options[0].value
    };
  }

  handleSubmit = () => {
    const { onSubmit } = this.props.route.params;

    goBack();

    typeof onSubmit === 'function' && onSubmit(this.state.selectedValue, this.props.route?.params?.dataKey);
  };

  handleSelect = selectedValue => this.setState({ selectedValue });

  render() {
    const {
      intl: {
        formatMessage
      }
    } = this.props;
    const { options } = this.props.route.params;

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
           <Picker
            style={{
              width: '100%',
              backgroundColor: 'transparent'
            }}
            itemStyle={{
              color: '#FFFFFF',
              fontSize: ms(17),
              fontFamily: 'SF Pro Display'
            }}
            textSize={ms(16)}
            itemSpace={ms(27)}
            textColor="#FFFFFF"
            pickerData={options}
            selectedValue={this.state.selectedValue}
            onValueChange={this.handleSelect}
           />
           <Button
            upperCase
            size="lg"
            title={formatMessage(messages.submit)}
            onPress={this.handleSubmit}
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
  }
}

export default WheelPicker;

WheelPicker.propTypes = {
  value: PropTypes.string,
  dataKey: PropTypes.string,
  onSubmit: PropTypes.func,
  options: PropTypes.shape([
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ])
};

WheelPicker.defaultProps = {
  value: '0',
  dataKey: '',
  options: [{ value: '0' }],
  onSubmit: () => {},
};

const Content = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border.yellow};
  background-color: ${props => props.theme.colors.background.black};
`;

const ContentWrapper = styled.View`
  width: 100%;
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
