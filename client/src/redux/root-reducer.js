import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default rootReducer;
