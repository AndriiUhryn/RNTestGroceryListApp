import { combineReducers } from 'redux';

import root from './root';
import feed from './feed';

export default asyncReducers => combineReducers({
  root,
  feed,
  ...asyncReducers,
});
