import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartDropdownReducer from "./cart-dropdown/cart-dropdown.reducer";

export default combineReducers({
  user: userReducer,
  cartDropdown: cartDropdownReducer,
});
