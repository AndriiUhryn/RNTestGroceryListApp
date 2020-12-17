import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defineMessages, injectIntl } from 'react-intl';

import ListItem from './ListItem';

import { navigate, closeDrawer } from '../../lib/navigation';

const navList = [
  {
    icon: require('../../assets/images/navigation_settings_black.png'),
    dataKey: 'settings',
    routeName: 'Settings'
  }
];
const messages = defineMessages({
  settings: {
    id: 'navigation.settings',
    defaultMessage: 'Settings'
  }
});

const mapStateToProps = state => ({
  currentScreen: state.root.currentScreen
});

@compose(
 injectIntl,
 withTheme,
 connect(mapStateToProps)
)
export class CustomNavigation extends Component {
  handleNavPress = (routeName) => {
    navigate(routeName);
    closeDrawer();
  };

  handleProfilePress = () => {
    this.handleNavPress('Profile');
    closeDrawer();
  };

  render() {
    const {
      currentScreen,
      intl: {
        formatMessage
      }
    } = this.props;

    return (
     <Content>
       {
         navList.map((item, index) => <ListItem
          {...item}
          key={`nav-item-${index}`}
          title={formatMessage(messages[item.dataKey])}
          onPress={this.handleNavPress}
          currentScreen={currentScreen}
         />)
       }
     </Content>
    );
  }
}

export default CustomNavigation;

const Content = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${props => props.theme.colors.background.yellow};
`;
