import React, { Component } from 'react';
import styled from 'styled-components/native';
import _debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defineMessages, injectIntl } from 'react-intl';
import { compose, bindActionCreators } from 'redux';

import { ListItem, AddItem } from '../../components/Feed';
import { StatusBar, Header, StyledComponents } from '../../components';

import { navigate } from '../../lib/navigation';
import { selectCollection } from '../../selectors/feed';
import { hideBottomNavigation } from '../../actions/root';

import { HEADER_HEIGHT } from '../../constants/general';

const statusBarHeight = getStatusBarHeight();
const messages = defineMessages({
  appTitle: {
    id: 'feed.header.title',
    defaultMessage: 'Grocery List'
  },
  emptyList: {
    id: 'feed.emptyList',
    defaultMessage: 'No items yet'
  }
});

const mapStateToProps = state => ({
  collection: selectCollection(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({
  hideBottomNavigation
}, dispatch);

@compose(
 injectIntl,
 connect(mapStateToProps, mapDispatchToProps)
)
export class Feed extends Component {
  scrollStart = 0;

  updateNavigation = _debounce(this.props.hideBottomNavigation, 1);

  handleScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    this.updateNavigation(this.scrollStart < y);
  };

  handleScrollStart = ({ nativeEvent: { contentOffset: { y } } }) => {
    this.scrollStart = y;
  };

  renderGridItem = ({ item, index }) => (
   <GridItemHolder
    key={item.id}
    index={index}
   >
     <ListItem item={item} />
   </GridItemHolder>
  );

  keyExtractor = item => item._id;

  addItem = () => {
    navigate('AddEditFeed');
  };

  sortByStatusCollection = (a, b) => {
    if (a.status && !b.status) {
      return -1;
    }

    if (!a.status && b.status) {
      return 1;
    }

    return 0;
  };

  sortByPriorityCollection = (a, b) => {
    if (a.priority < b.priority) {
      return -1;
    }

    if (a.priority < b.priority) {
      return 1;
    }

    return 0;
  };

  render() {
    const {
      collection,
      intl: {
        formatMessage
      }
    } = this.props;
    const data = [...collection].sort(this.sortByPriorityCollection).sort(this.sortByStatusCollection);

    return (
     <StyledComponents.Container>
       <StatusBar />
       {
         collection.length ? (
          <FlatList
           data={data}
           onScroll={this.handleScroll}
           renderItem={this.renderGridItem}
           keyExtractor={this.keyExtractor}
           onScrollBeginDrag={this.handleScrollStart}
           scrollEventThrottle={16}
          />
         ) : (
          <StyledComponents.Container>
            <NoContentTitleHolder>
              <NoContentTitle>
                {formatMessage(messages.emptyList)}
              </NoContentTitle>
            </NoContentTitleHolder>
          </StyledComponents.Container>
         )
       }
       <AddItemHolder>
         <AddItem onPress={this.addItem} />
       </AddItemHolder>
       <Header
        showDrawer
        transparent
        tintColor="yellow"
        center={{
          title: formatMessage(messages.appTitle)
        }}
       />
     </StyledComponents.Container>
    );
  };
}

export default Feed;

const GridItemHolder = styled.View`
  width: 100%;
  margin-top: ${props => props.index === 0 ? statusBarHeight + vs(HEADER_HEIGHT) + vs(10) : vs(10)}px;
`;

const NoContentTitleHolder = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NoContentTitle = styled.Text`
  color: ${props => props.theme.colors.text.yellow};
  font-size: ${ms(24)}px;
  text-align: center;
  font-family: ${props => props.theme.fonts.bold};
`;

const AddItemHolder = styled.View`
  right: ${s(30)}px;
  bottom: ${s(30)}px;
  position: absolute;
`;
