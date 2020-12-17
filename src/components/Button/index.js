import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { vs, s, ms } from 'react-native-size-matters';
import styled, { withTheme } from 'styled-components/native';

export let Button = class extends Component {
  render() {
    const {
      size,
      title,
      onPress,
      bgColor,
      disabled,
      fontSize,
      upperCase,
      withBorder,
      fontFamily,
      titleColor,
      withShadow,
      borderColor,
      borderRadius
    } = this.props;
    const customStyles = {};

    if (withShadow) {
      customStyles.elevation = 5;
    }

    return (
     <Container
      size={size}
      style={customStyles}
      onPress={onPress}
      bgColor={bgColor}
      disabled={disabled}
      withBorder={withBorder}
      withShadow={withShadow}
      borderColor={borderColor}
      borderRadius={borderRadius}
     >
       <Text
        fontSize={fontSize}
        disabled={disabled}
        fontFamily={fontFamily}
        titleColor={titleColor}
       >
         {
           upperCase ? title.toUpperCase() : title
         }
       </Text>
     </Container>
    );
  }
};

export default Button = withTheme(Button);

Button.defaultProps = {
  size: '',
  title: '',
  bgColor: 'default',
  disabled: false,
  fontSize: 14,
  withBorder: false,
  titleColor: 'default',
  withShadow: false,
  fontFamily: 'semiBold',
  borderColor: 'default',
  borderRadius: 0
};

Button.propTypes = {
  size: PropTypes.oneOf(['xsm', 'sm', 'md', 'lg', 'xl', 'xxl']),
  title: PropTypes.string,
  onPress: PropTypes.func,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.number,
  withBorder: PropTypes.bool,
  titleColor: PropTypes.string,
  withShadow: PropTypes.bool,
  fontFamily: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${props => vs(props.theme.getItemSize(props.size))}px;
  align-items: center;
  border-radius: ${props => props.borderRadius ? s(props.borderRadius) : 0}px;
  flex-direction: row;
  justify-content: center;
  background-color: ${props => props.bgColor === 'transparent'
          ? 'transparent' :
          props.theme.colors.button[props.disabled ?
                  'disabled' :
                  props.bgColor]};
  ${props => !!props.withBorder ? `
		borderWidth: 1px;
		borderColor: ${props.theme.colors.border[props.disabled ? 'disabled' : props.borderColor]};
	` : ''} ${props => props.withShadow ? `
		shadowColor: ${props.theme.colors.black};
	    shadowOffset: 1px 5px;
	    shadowRadius: 5px;
	    shadowOpacity: 0.3;
	` : ''}
`;

const Text = styled.Text`
  color: ${props => props.theme.colors.text[props.disabled ? 'disabled' : (props.titleColor)]};
  font-size: ${props => ms(props.fontSize)}px;
  text-align: center;
  font-family: ${props => props.theme.fonts[props.fontFamily || 'default']};
  letter-spacing: 0.8px;
`;
