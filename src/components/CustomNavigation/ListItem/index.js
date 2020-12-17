import React, { Component } from 'react';
import { ms, s, vs } from 'react-native-size-matters';
import styled, { withTheme } from 'styled-components/native';

import arrowIcon from '../../../assets/images/arrow-right-black.png';

@withTheme
export class ListItem extends Component {
  handlePress = () => typeof this.props.onPress === 'function' && this.props.onPress(this.props.routeName, this.props.dataKey);

  render() {
    const {
      icon,
      title,
      routeName,
      currentScreen
    } = this.props;

    return (
     <NavItem
      active={currentScreen === routeName}
      onPress={this.handlePress}
      underlayColor={this.props.theme.colors.background.transparent_black}
     >
       <ContentHolder>
         <IconHolder>
           <IconWrapper>
             <NavIconHolder
              source={icon}
             />
           </IconWrapper>
         </IconHolder>
         <NavText>
           {
             title
           }
         </NavText>
         <NavIconHolder
          small
          source={arrowIcon}
         />
       </ContentHolder>
     </NavItem>
    );
  }
}

export default ListItem;

const NavItem = styled.TouchableHighlight`
  paddingVertical: ${vs(10)}px;
  paddingHorizontal: ${s(16)}px;
  ${props => props.active && `backgroundColor: ${props.theme.colors.background.transparent_black};`}
`;

const ContentHolder = styled.View`
  align-items: center;
  flex-direction: row;
`;

const NavText = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.black};
  font-size: ${ms(16)}px;
  margin-left: ${s(15)}px;
  font-family: ${props => props.theme.fonts.default};
`;

const IconHolder = styled.View`
  width: 10%;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.View`
  position: relative;
`;

const NavIconHolder = styled.Image`
  width: ${props => props.small ? s(15) : s(20)}px;
  height: ${props => props.small ? s(15) : s(20)}px;
  resizeMode: contain;
`;
