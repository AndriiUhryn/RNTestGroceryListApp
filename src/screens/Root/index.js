import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { NavigationContainer } from '@react-navigation/native';

import { RootNavigator } from '../../routes';
import { StyledComponents, FlashMessageCustom, Spinner } from '../../components';

import { clearStore, setCurrentScreen } from '../../actions/root';
import { setTopLevelNavigator, getActiveRouteName } from '../../lib/navigation';

import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

import translations from '../../translations';
import { DEFAULT_LANGUAGE } from '../../constants/general';

const mapStateToProps = state => ({ ...state.root });
const mapDispatchToProps = dispatch => bindActionCreators({
  clearStore,
  setCurrentScreen,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export class Root extends Component {
  handleNavigationChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);

    if (prevScreen !== currentScreen) {
      this.props.setCurrentScreen(currentScreen);
    }
  };

  getItemSize = size => {
    switch (size) {
      case 'xsm':
        return 25;
      case 'sm':
        return 30;
      case 'md':
        return 35;
      case 'lg':
        return 43;
      case 'xl':
        return 45;
      case 'xxl':
        return 105;
      default:
        return 50;
    }
  };

  render() {
    const { themeMode, currentLanguage } = this.props;

    return (
     <IntlProvider
      locale={currentLanguage}
      messages={translations[currentLanguage]}
      textComponent={Text}
      defaultLocale={DEFAULT_LANGUAGE}
     >
       <ThemeProvider theme={{
         fonts: fonts[themeMode],
         colors: colors[themeMode],
         getItemSize: this.getItemSize,
       }}>
         <StyledComponents.Container>
           <NavigationContainer
            ref={setTopLevelNavigator}
            onNavigationStateChange={this.handleNavigationChange}
           >
             <RootNavigator />
           </NavigationContainer>
           <FlashMessage
            position="top"
            MessageComponent={FlashMessageCustom}
           />
           <Spinner />
         </StyledComponents.Container>
       </ThemeProvider>
     </IntlProvider>
    );
  }
}

export default Root;
