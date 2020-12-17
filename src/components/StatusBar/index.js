import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StatusBar as RNStatusBar, Platform } from 'react-native';

export let StatusBar = ({ themeMode, ...passedProps }) => {
  const platformProps = {};

  if (Platform.OS === 'android') {
    platformProps.translucent = true;
    platformProps.backgroundColor = 'transparent';
  }

  if (!passedProps.barStyle) {
    passedProps.barStyle = `${themeMode === 'white' ? 'dark' : 'light'}-content`;
  }

  return (
   <RNStatusBar
    {...platformProps}
    {...passedProps}
   />
  );
};

const mapStateToProps = state => ({ themeMode: state.root.themeMode });

export default StatusBar = connect(mapStateToProps)(StatusBar);

StatusBar.propTypes = {
  barStyle: PropTypes.string,
  themeMode: PropTypes.string
};
