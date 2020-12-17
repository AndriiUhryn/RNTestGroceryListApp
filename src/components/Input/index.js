import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { ms, s, vs } from 'react-native-size-matters';
import Animated, { Easing } from 'react-native-reanimated';
import styled, { withTheme } from 'styled-components/native';
import { TouchableOpacity, Keyboard } from 'react-native';

@withTheme
export class Input extends Component {
  state = {
    focused: false
  };

  inputRef = createRef();
  animatedValue = new Animated.Value(this.props.value ? 1 : 0);

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && !this.state.focused) {
      this.animatePlaceholder(!!this.props.value);
    }
  }

  handleClickOutside = () => Keyboard.dismiss();

  onBlur = () => {
    if (!this.props.value) {
      this.animatePlaceholder(false);
    }
    typeof this.props.onBlur === 'function' && this.props.onBlur(this.props.dataKey);
    this.setState({ focused: false });
  };

  onFocus = () => {
    this.animatePlaceholder(true);
    typeof this.props.onFocus === 'function' && this.props.onFocus(this.props.dataKey);
    this.setState({ focused: true });
  };

  animatePlaceholder = (top) => {
    Animated.timing(this.animatedValue, {
      toValue: top ? 1 : 0,
      duration: 200,
      easing: Easing.linear
    }).start();
  };

  onChange = value => typeof this.props.onChange === 'function' && this.props.onChange(value, this.props.dataKey);

  leftIconPress = () => {
    typeof this.props.leftIconPress === 'function' && this.props.leftIconPress(this.props.dataKey);

    if (this.props.leftIcon.name && this.props.leftIcon.name === 'close') {
      this.inputRef.current.clear();
    }
  };

  rightIconPress = () => {
    typeof this.props.rightIconPress === 'function' && this.props.rightIconPress(this.props.dataKey);

    if (this.props.rightIcon.name && this.props.rightIcon.name === 'close') {
      this.inputRef.current.clear();
    }
  };

  getIcon = position => {
    if (!this.props[`${position}Icon`]) {
      return false;
    }

    return (
     <IconHolder>
       <TouchableOpacity onPress={this[`${position}IconPress`]}>
         <Icon source={this.props[`${position}Icon`]} />
       </TouchableOpacity>
     </IconHolder>
    );
  };

  render() {
    const {
      size,
      theme,
      color,
      error,
      value,
      style,
      bgColor,
      onPress,
      inputRef,
      editable,
      fontSize,
      showIcon,
      leftIcon,
      onChange,
      noPadding,
      withShadow,
      borderColor,
      placeholder,
      paddingLeft,
      noBorderTop,
      noBorderLeft,
      borderRadius,
      pointerEvents,
      noBorderRight,
      withBorderTop,
      borderDisabled,
      withBorderRadius,
      withBorderBottom,
      preventLabelFloat,
      withBorderBottomStyle,
      ...customProps
    } = this.props;
    const { focused } = this.state;
    const inputStyle = { ...style };

    if (withShadow) {
      inputStyle.elevation = 3;
    }

    const topAnimated = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [s(13), -s(24)]
    });
    const leftAnimated = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [s(20), 0]
    });
    const fontSizeAnimated = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [ms(15), ms(13)]
    });

    return (
     <Container as={TouchableOpacity} onPress={onPress} activeOpacity={0.7}>
       <InputHolder
        size={size}
        style={inputStyle}
        bgColor={bgColor}
        withShadow={withShadow}
        borderColor={borderColor}
        noBorderTop={noBorderTop}
        borderRadius={borderRadius}
        noBorderLeft={noBorderLeft}
        noBorderRight={noBorderRight}
        pointerEvents={pointerEvents}
        withBorderTop={withBorderTop}
        borderDisabled={borderDisabled}
        withBorderBottom={withBorderBottom}
        withBorderRadius={withBorderRadius}
        withBorderBottomStyle={withBorderBottomStyle}
       >
         {
           ((preventLabelFloat && !value && !focused) || !preventLabelFloat) && (
            <Animated.Text
             style={{
               top: topAnimated,
               left: leftAnimated,
               color: theme.colors.text.grey1,
               position: 'absolute',
               fontSize: fontSizeAnimated,
               fontFamily: theme.fonts.default
             }}
            >
              {placeholder}
            </Animated.Text>
           )
         }
         {
           this.getIcon('left')
         }
         <TextInput
          {...customProps}
          ref={inputRef || this.inputRef}
          style={{
            color: theme.colors.text[(typeof editable !== 'undefined' && !editable) ? 'disabled' : color],
            fontSize: ms(fontSize),
            paddingTop: 0,
            fontFamily: theme.fonts.default,
            paddingBottom: 0
          }}
          value={value}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          fontSize={fontSize}
          leftIcon={!!leftIcon}
          noPadding={noPadding}
          paddingLeft={paddingLeft}
          onChangeText={this.onChange}
          selectionColor={theme.colors.text.white}
         />
         {
           showIcon && this.getIcon('right')
         }
       </InputHolder>
       {
         !!error && <ErrorHolder
         >
           {
             error
           }
         </ErrorHolder>
       }
     </Container>
    );
  }
}

export default Input;

Input.defaultProps = {
  size: '',
  bold: false,
  color: 'white',
  bgColor: 'white',
  fontSize: 15,
  borderRadius: 2
};

Input.propTypes = {
  size: PropTypes.oneOf(['xsm', 'sm', 'md', 'lg', 'xl', 'xxl']),
  bold: PropTypes.bool,
  color: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string,
  bgColor: PropTypes.string,
  dataKey: PropTypes.string,
  onFocus: PropTypes.func,
  editable: PropTypes.bool,
  fontSize: PropTypes.number,
  showIcon: PropTypes.bool,
  onChange: PropTypes.func,
  leftIcon: PropTypes.number,
  autoFocus: PropTypes.bool,
  noPadding: PropTypes.bool,
  multiline: PropTypes.bool,
  rightIcon: PropTypes.number,
  withShadow: PropTypes.bool,
  borderColor: PropTypes.string,
  placeholder: PropTypes.string,
  paddingLeft: PropTypes.number,
  noBorderTop: PropTypes.bool,
  noBorderLeft: PropTypes.bool,
  borderRadius: PropTypes.number,
  noBorderRight: PropTypes.bool,
  withBorderTop: PropTypes.bool,
  returnKeyType: PropTypes.string,
  leftIconPress: PropTypes.func,
  borderDisabled: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  rightIconPress: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  withBorderRadius: PropTypes.bool,
  withBorderBottom: PropTypes.bool,
  withBorderBottomStyle: PropTypes.bool
};

const Container = styled.View`
  width: 100%;
  margin-top: ${vs(32)}px;
`;

const InputHolder = styled.View`
  width: 100%;
  height: ${props => s(props.theme.getItemSize(props.size))}px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  background-color: ${props => props.theme.colors.input[props.bgColor]};
  ${props => !!props.withBorderRadius && `
		borderRadius: ${s(props.borderRadius)}px;
	`} ${props => !!props.withBorderTop && `
		borderTopLeftRadius: 5px;
		borderTopRightRadius: 5px;
	`} ${props => !!props.withBorderBottom && `
		borderBottomLeftRadius: 5px;
		borderBottomRightRadius: 5px;
	`} ${props => !!props.withBorderBottomStyle && `
		borderColor: ${props.theme.colors.border[props.borderDisabled ? 'disabled' : 'lightDark']};
		borderBottomWidth: 1px;
	`} ${props => !!props.withShadow && `
		shadowColor: ${props => props.theme.colors.background.black};
        shadowOffset: 1px 1px;
        shadowRadius: 5px;
        shadowOpacity: 0.2;
	`} ${props => !!props.borderColor && `
		borderWidth: 1px;
		borderColor: ${props.theme.colors.border[props.borderColor]};
		
		${props.noBorderTop && 'borderTopWidth: 0px;'}
		${props.noBorderLeft && 'borderLeftWidth: 0px;'}
		${props.noBorderRight && 'borderRightWidth: 0px;'}
	`}
`;

const IconHolder = styled.View`
  width: 50px;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  ${props => !props.leftIcon && !props.noPadding && `paddingLeft: ${s(props.paddingLeft || 20)}px;`}
`;

const ErrorHolder = styled.Text`
  color: ${props => props.theme.colors.text.error};
  font-size: ${ms(13)}px;
  padding-top: ${vs(8)}px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  resizeMode: contain;
`;
