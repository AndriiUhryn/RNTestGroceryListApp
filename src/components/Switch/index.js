import React, { Component } from 'react';
import { vs } from 'react-native-size-matters';
import styled, { withTheme } from 'styled-components/native';
import { Animated, TouchableOpacity } from 'react-native';

const xVal = vs(23);

export let Switch = class extends Component {
  animatedValue = new Animated.Value(this.props.active ? xVal : 0);
  animatedColor = new Animated.Value(this.props.active ? xVal : 0);

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.toggleAnimation(nextProps.active ? xVal : 0);
    }
  }

  toggleAnimation = toValue => {
    Animated.timing(
     this.animatedValue,
     {
       toValue,
       duration: 500,
       useNativeDriver: true
     }
    ).start();
    Animated.timing(
     this.animatedColor,
     {
       toValue,
       duration: 500
     }
    ).start();
  };

  render() {
    const backgroundColor = this.animatedColor.interpolate({
      inputRange: [0, xVal],
      outputRange: [this.props.theme.colors.switch.disabled, this.props.theme.colors.switch.active]
    });
    const borderColor = this.animatedColor.interpolate({
      inputRange: [0, xVal],
      outputRange: [this.props.theme.colors.switch.disabled, this.props.theme.colors.switch.yellow]
    });

    return (
     <TouchableOpacity
      onPress={this.props.onPress}
     >
       <SwitchHolder
        as={Animated.View}
        style={{ backgroundColor, borderColor }}
       >
         <SwitchButton
          as={Animated.View}
          style={{ transform: [{ translateX: this.animatedValue }] }}
         />
       </SwitchHolder>
     </TouchableOpacity>
    );
  }
};

export default Switch = withTheme(Switch);

const SwitchHolder = styled.View`
  width: ${vs(50)}px;
  height: ${vs(27)}px;
  display: flex;
  align-items: center;
  border-width: 1px;
  border-radius: ${vs(27) / 2}px;
  flex-direction: row;
  paddingHorizontal: 2.5px;
`;

const SwitchButton = styled.View`
  width: ${vs(21)}px;
  height: ${vs(21)}px;
  position: relative;
  border-radius: ${vs(21) / 2}px;
  background-color: ${props => props.theme.colors.switch.yellow};
`;
