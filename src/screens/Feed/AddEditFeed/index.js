import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { ms, vs, s } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import { StatusBar, Header, StyledComponents, Input, Switch, Button } from '../../../components';

import { goBack, navigate } from '../../../lib/navigation';
import { showFlashMessage } from '../../../helpers/flashMessage';
import { addFeed, deleteFeed, updateFeed } from '../../../actions/feed';

const messages = defineMessages({
  appTitleAdd: {
    id: 'addEditFeed.header.add.title',
    defaultMessage: 'Add grocery'
  },
  appTitleEdit: {
    id: 'addEditFeed.header.edit.title',
    defaultMessage: 'Edit grocery'
  },
  createdSuccessfully: {
    id: 'addEditFeed.feed.create.success',
    defaultMessage: 'Your grocery was added successfully'
  },
  deletedSuccessfully: {
    id: 'addEditFeed.feed.deleted.success',
    defaultMessage: 'Your grocery was deleted successfully'
  },
  updatedSuccessfully: {
    id: 'addEditFeed.feed.update.success',
    defaultMessage: 'Your grocery was updated successfully'
  },
  name: {
    id: 'addEditFeed.input.name.label',
    defaultMessage: 'Name'
  },
  description: {
    id: 'addEditFeed.input.description.label',
    defaultMessage: 'Description'
  },
  priority: {
    id: 'addEditFeed.input.priority.label',
    defaultMessage: 'Priority'
  },
  status: {
    id: 'addEditFeed.input.status.label',
    defaultMessage: 'Need to buy'
  },
  addSubmit: {
    id: 'addEditFeed.addSubmit',
    defaultMessage: 'Add'
  },
  editSubmit: {
    id: 'addEditFeed.editSubmit',
    defaultMessage: 'Update'
  },
  deleteSubmit: {
    id: 'addEditFeed.deleteSubmit',
    defaultMessage: 'Delete'
  }
});

const PRIORITY_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

export const AddEditFeed = (props) => {
  const dispatch = useDispatch();
  const item = props.route?.params?.item || {};
  const [changed, setChanged] = useState(false);
  const [data, setData] = useState({
    id: Date.now(),
    name: '',
    status: true,
    priority: '1',
    description: '',
    ...item
  });
  const { formatMessage } = useIntl();
  const disabled = !data.name || !changed;
  const handleSubmit = () => {
    if (item.id) {
      dispatch(updateFeed(data, () => {
        showFlashMessage({
          type: 'success',
          message: formatMessage(messages.updatedSuccessfully)
        });
        goBack();
      }));
    } else {
      dispatch(addFeed(data, () => {
        showFlashMessage({
          type: 'success',
          message: formatMessage(messages.createdSuccessfully)
        });
        goBack();
      }));
    }
  };
  const handleDelete = () => {
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
          goBack();
        }));
      }
    });
  };
  const handleDataChange = (value, key) => {
    setData({ ...data, [key]: value });
    setChanged(true);
  };
  const handleToggleChange = () => handleDataChange(!data.status, 'status');
  const openPriorityPicker = () => {
    Keyboard.dismiss();
    navigate(
     'WheelPicker',
     {
       value: data.priority,
       dataKey: 'priority',
       options: PRIORITY_OPTIONS,
       onSubmit: handleDataChange,
       fetchData: {}
     }
    );
  };

  return (
   <StyledComponents.Container>
     <StatusBar />
     <Header
      showBack
      center={{
        title: formatMessage(messages[item.id ? 'appTitleEdit' : 'appTitleAdd'])
      }}
      forward={!disabled && {
        title: formatMessage(messages[item.id ? 'editSubmit' : 'addSubmit']),
        onPress: handleSubmit,
        tintColor: 'yellow'
      }}
     />
     <StyledComponents.ContentBetweenAutoDismiss>
       <ContentHolder>
         <Input
          size="lg"
          value={data.name}
          bgColor="grey"
          dataKey="name"
          onChange={handleDataChange}
          placeholder={formatMessage(messages.name)}
         />
         <Input
          multiline
          size="lg"
          style={{
            height: vs(100),
            paddingTop: vs(15),
            paddingRight: vs(15),
            paddingBottom: vs(15)
          }}
          value={data.description}
          bgColor="grey"
          dataKey="description"
          onChange={handleDataChange}
          placeholder={formatMessage(messages.description)}
          numberOfLines={4}
         />
         <Input
          size="lg"
          value={data.priority}
          bgColor="grey"
          onPress={openPriorityPicker}
          placeholder={formatMessage(messages.priority)}
          pointerEvents="none"
         />
         <ToggleHolder>
           <ToggleTitle>
             {formatMessage(messages.status)}
           </ToggleTitle>
           <Switch
            active={data.status}
            onPress={handleToggleChange}
           />
         </ToggleHolder>
         {!!item.id && (
          <Button
           size="lg"
           title={formatMessage(messages.deleteSubmit)}
           onPress={handleDelete}
           bgColor="yellow"
          />
         )}
       </ContentHolder>
     </StyledComponents.ContentBetweenAutoDismiss>
   </StyledComponents.Container>
  );
};

export default AddEditFeed;

const ToggleHolder = styled.View`
  margin-top: ${vs(10)}px;
  margin-bottom: ${vs(50)}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const ToggleTitle = styled.Text`
  color: ${props => props.theme.colors.text.yellow};
  font-size: ${ms(16)}px;
  margin-top: ${vs(5)}px;
  font-family: ${props => props.theme.fonts.default};
`;

const ContentHolder = styled.View`
  width: 100%;
  paddingHorizontal: ${s(16)}px;
`;
