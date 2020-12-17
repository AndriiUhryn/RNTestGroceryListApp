import React from 'react';
import { s } from 'react-native-size-matters';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import plusIcon from '../../../assets/images/add_icon.png'

export const AddItem = (props) => {
  const { onPress } = props;

  return (
   <TouchableOpacity onPress={onPress}>
     <Icon source={plusIcon}/>
   </TouchableOpacity>
  );
};

export default AddItem;

AddItem.propTypes = {
  onPress: PropTypes.func.isRequired
};

const Icon = styled.Image`
  width: ${s(50)}px;
  height: ${s(50)}px;
  resizeMode: contain;
`;
