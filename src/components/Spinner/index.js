import React, { useEffect } from 'react';
import { s } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import LottieAnimation from 'lottie-react-native';

import { BlurView } from '../BlurView';

import spinner from '../../assets/animations/spinner';

export const Spinner = () => {
  const loading = useSelector(state => state.root.loading);
  const animation = React.createRef();

  useEffect(() => {
    if (animation.current) {
      if (loading) {
        animation.current.play();
      } else {
        animation.current.reset();
      }
    }
  }, [loading]);

  return (
   <BlurView
    style={{
      width: loading ? '100%' : 0,
      height: loading ? '100%' : 0,
      display: 'flex',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }}
   >
     <LottieAnimation
      loop
      ref={animation}
      style={{
        width: loading ? s(100) : 0,
        height: loading ? s(100) : 0
      }}
      speed={1}
      source={spinner}
     />
   </BlurView>
  );
};

export default Spinner;
