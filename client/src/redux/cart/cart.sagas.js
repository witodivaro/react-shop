import { all, call, select, takeEvery } from "redux-saga/effects";
import { updateUserCart } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";
import CartActionTypes from "./cart.types";

function* updateCart() {
  const cartItems = yield select(selectCartItems);
  const currentUser = yield select(selectCurrentUser);

  if (!currentUser) return;

  yield updateUserCart(currentUser.id, cartItems);
}

function* onCartChange() {
  yield takeEvery(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.CLEAR_ITEM,
      CartActionTypes.REMOVE_ITEM,
    ],
    updateCart
  );
}

export function* cartSagas() {
  yield all([call(onCartChange)]);
}
