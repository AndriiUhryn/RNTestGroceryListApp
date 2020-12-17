import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { ms, s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Animated, { Easing } from 'react-native-reanimated';

import { BlurView } from '../';

import { selectHideBottomNavigation } from '../../selectors/root';
import { goBack, navigate, openDrawer } from '../../lib/navigation';

import { HEADER_HEIGHT } from '../../constants/general';

import menuIcon from '../../assets/images/menu.png';
import settingsIcon from '../../assets/images/settings.png';
import arrowBackIcon from '../../assets/images/arrow_back_white.png';

const statusBarHeight = getStatusBarHeight();
const animatedValue = new Animated.Value(1);

export const Header = props => {
  const {
    back = {},
    center = {},
    forward = {},
    showBack,
    tintColor,
    showDrawer,
    transparent,
    showSettings
  } = props;
  const animate = (top) => {
    Animated.timing(animatedValue, {
      toValue: top ? 0 : 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  };
  const hideNavigation = useSelector(selectHideBottomNavigation);

  const getBackPart = () => {
    const customProps = {
      onPress: goBack
    };

    if (back.activeOpacity) {
      customProps.activeOpacity = back.activeOpacity;
    }

    if (back.onPress) {
      customProps.onPress = back.onPress;
    }

    if (!back.component && (showBack || showDrawer)) {
      back.component = (
       <Icon
        size={s(20)}
        source={showBack ? arrowBackIcon : menuIcon}
       />
      );

      if (showDrawer) {
        customProps.onPress = openDrawer;
      }
    }

    return (
     <ContainerLeftPart {...customProps}>
       {
         !!back.component && back.component
       }
     </ContainerLeftPart>
    );
  };
  const getCenterPart = () => {
    const customProps = {
      activeOpacity: center.onPress ? 0 : 1
    };

    if (center.activeOpacity) {
      customProps.activeOpacity = center.activeOpacity;
    }

    if (center.onPress) {
      customProps.onPress = center.onPress;
    }

    return (
     <ContainerCenterPart {...customProps}>
       {
         center.component ?
          center.component : (
           <>
             <Title
              bold={center.bold}
              color={tintColor || 'white'}
              fontSize={center.fontSize || 14}
             >
               {
                 center.title
               }
             </Title>
             {
               !!center.icon && (
                <Icon
                 withMarginLeft
                 size={center.iconSize}
                 source={center.icon}
                />
               )
             }
           </>
          )
       }
     </ContainerCenterPart>
    );
  };
  const getForwardPart = () => {
    const customProps = {
      onPress: () => navigate('WorkInProgress')
    };

    if (forward.activeOpacity) {
      customProps.activeOpacity = forward.activeOpacity;
    }

    if (forward.onPress) {
      customProps.onPress = forward.onPress;
    }

    if (!forward.component) {
      if (showSettings) {
        customProps.onPress = () => navigate('Settings');
        forward.component = (
         <Icon
          size={s(20)}
          source={settingsIcon}
         />
        );
      } else if (forward.icon) {
        forward.component = (
         <Icon
          size={s(20)}
          source={forward.icon}
         />
        );
      } else if (forward.title) {
        forward.component = (
         <Title
          color={forward.tintColor || 'white'}
          fontSize={forward.fontSize || 12}
         >
           {
             forward.title
           }
         </Title>
        );
      }
    }

    return (
     <ContainerRightPart {...customProps}>
       {
         !!forward.component && forward.component
       }
     </ContainerRightPart>
    );
  };

  const content = (
   <ContentHolder>
     {
       getBackPart()
     }
     {
       getCenterPart()
     }
     {
       getForwardPart()
     }
   </ContentHolder>
  );

  useEffect(() => {
    animate(hideNavigation);
  }, [hideNavigation]);

  const height = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, statusBarHeight + vs(HEADER_HEIGHT)]
  });

  return transparent ? (
   <BlurView
    style={{
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      position: 'absolute'
    }}
   >
     <Container
      transparent
      as={Animated.View}
      style={{ height }}
     >
       {content}
     </Container>
   </BlurView>
  ) : (
   <Container>
     {content}
   </Container>
  );
};

export default Header;

Header.propTypes = {
  back: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  center: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  forward: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bgColor: PropTypes.string,
  tintColor: PropTypes.string
};

const Container = styled.View`
  width: 100%;
  height: ${statusBarHeight + vs(HEADER_HEIGHT)}px;
  overflow: hidden;
  background-color: ${props => props.transparent ? 'transparent' : props.theme.colors.background.defaultHeader};
`;

const ContentHolder = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  margin-top: ${statusBarHeight}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ContainerLeftPart = styled.TouchableOpacity`
  height: 100%;
  display: flex;
  min-width: 20%;
  align-items: center;
  padding-left: ${s(20)}px;
  padding-right: ${s(10)}px;
  flex-direction: row;
  justify-content: flex-start;
`;

const ContainerCenterPart = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ContainerRightPart = styled.TouchableOpacity`
  height: 100%;
  display: flex;
  min-width: 20%;
  align-items: center;
  padding-left: ${s(10)}px;
  padding-right: ${s(20)}px;
  flex-direction: row;
  justify-content: flex-end;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text[props.color]};
  font-size: ${props => ms(props.fontSize || 14)}px;
  text-align: center;
  font-family: ${props => props.theme.fonts.bold};
`;

const Icon = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  resizeMode: contain;
  ${props => props.withMarginLeft ? `margin-left: ${s(5)}` : ''}
`;
