import * as TYPES from '../constants/actionTypes';

import { selectCollection } from '../selectors/feed';

export const setFeeds = payload => ({ type: TYPES.SET_FEED_COLLECTION, payload });

export const addFeed = (payload, cb) => dispatch => {
  dispatch({ type: TYPES.ADD_FEED, payload });

  typeof cb === 'function' && cb();
}

export const updateFeed = (data, cb) => (dispatch, getState) => {
  const collection = selectCollection(getState());
  const newCollection = collection.map(item => {
    let newItem = { ...item };

    if (newItem.id === data.id) {
      newItem = { ...newItem, ...data };
    }

    return newItem;
  });

  dispatch(setFeeds(newCollection));

  typeof cb === 'function' && cb();
};

export const deleteFeed = (id, cb) => (dispatch, getState) => {
  const collection = selectCollection(getState());
  const newCollection = collection.filter(item => item.id !== id);

  dispatch(setFeeds(newCollection));

  typeof cb === 'function' && cb();
};
