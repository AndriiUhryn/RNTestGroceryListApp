import React from 'react';
import styled from 'styled-components/native';
import { s, ms, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { defineMessages, useIntl } from 'react-intl';

import { Switch } from '../../index';

import { navigate } from '../../../lib/navigation';
import { showFlashMessage } from '../../../helpers/flashMessage';
import { hideBottomNavigation } from '../../../actions/root';
import { updateFeed, deleteFeed } from '../../../actions/feed';

import editIcon from '../../../assets/images/pencil_yellow.png';
import deleteIcon from '../../../assets/images/delete.png';

const messages = defineMessages({
  deletedSuccessfully: {
    id: 'addEditFeed.feed.deleted.success',
    defaultMessage: 'Your grocery was deleted successfully'
  },
  updatedSuccessfully: {
    id: 'addEditFeed.feed.update.success',
    defaultMessage: 'Your grocery was updated successfully'
  }
});

export const ListItem = props => {
  const { item } = props;
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const showBottomTab = () => dispatch(hideBottomNavigation(false));

  const handleToggleChange = () => {
    dispatch(updateFeed(
     {
       id: item.id,
       status: !item.status
     },
     () => {
       showFlashMessage({
         type: 'success',
         message: formatMessage(messages.updatedSuccessfully)
       });
     }
    ));
  };
  const deleteItem = () => {
    navigate('QuestionModal', {
      title: 'Delete item',
      subTitle: 'Are you sure you want to delete this item?',
      submitTitle: 'Delete',
      onSubmit: () => {
        dispatch(deleteFeed(item.id, () => {
          showFlashMessage({
            type: 'success',
            message: formatMessage(messages.deletedSuccessfully)
          });
        }));
      }
    });
  };
  const openEdit = () => {
    showBottomTab();
    navigate('AddEditFeed', { item });
  };

  return (
   <TouchableOpacity onPress={openEdit}>
     <ListItemHolder active={item.status}>
       <Switch
        active={item.status}
        onPress={handleToggleChange}
       />
       <CenterBlock>
         <Title numberOfLines={1}>
           {item.name}
         </Title>
         <Description>
           {item.description}
         </Description>
       </CenterBlock>
       <RightBlock>
         <TouchableOpacity onPress={openEdit}>
           <Icon source={editIcon}/>
         </TouchableOpacity>
         <TrashIconHolder onPress={deleteItem}>
           <Icon source={deleteIcon}/>
         </TrashIconHolder>
       </RightBlock>
     </ListItemHolder>
   </TouchableOpacity>
  );
};

const ListItemHolder = styled.View`
  width: 100%;
  display: flex;
  padding: ${s(16)}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background[props.active ? 'black' : 'navigation']};
`;

const CenterBlock = styled.View`
  flex: 1;
  display: flex;
  padding-left: ${s(16)}px;
  flex-direction: column;
  justify-content: center;
`;

const RightBlock = styled.View`
  paddingHorizontal: ${s(10)}px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text.white};
  font-size: ${ms(16)}px;
  font-family: ${props => props.theme.fonts.bold};
`;

const Description = styled.Text`
  color: ${props => props.theme.colors.text.grey};
  font-size: ${ms(15)}px;
  font-family: ${props => props.theme.fonts.default};
  padding-top: ${vs(16)}px;
`;

const TrashIconHolder = styled.TouchableOpacity`
  margin-top: ${vs(15)}px;
`;

const Icon = styled.Image`
  width: ${s(20)}px;
  height: ${s(20)}px;
  resizeMode: contain;
`;
