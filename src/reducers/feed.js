import * as TYPES from '../constants/actionTypes';

const initialState = {
  collection: [
    {
      id: Date.now(),
      name: 'Bread',
      status: true,
      priority: '1',
      description: 'Buy some bread in shop 1',
    },
    {
      id: Date.now() + 1,
      name: 'Water',
      status: true,
      priority: '1',
      description: 'Buy some bread in shop 2',
    },
    {
      id: Date.now() + 2,
      name: 'Wine',
      status: true,
      priority: '2',
      description: 'Buy some bread in shop 2',
    },
    {
      id: Date.now() + 3,
      name: 'Cola',
      status: true,
      priority: '5',
      description: 'Buy some bread in shop 1',
    },
    {
      id: Date.now() + 4,
      name: 'Tomato',
      status: true,
      priority: '3',
      description: 'Buy some bread in shop 5',
    }
  ]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_FEED_COLLECTION:
      return {
        ...state,
        collection: [...payload]
      };

    case TYPES.ADD_FEED:
      return {
        ...state,
        collection: [...state.collection, payload]
      };

    case TYPES.CLEAR_STORE:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
