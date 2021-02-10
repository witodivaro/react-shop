import { all, call, select, takeLatest, put, delay } from "redux-saga/effects";
import { firestore, updateUserCart } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import {
  cartFailure,
  cartUpdateStart,
  cartMergeSuccess,
  cartUpdateSuccess,
} from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import CartActionTypes from "./cart.types";
import { mergeCarts } from "./cart.utils";

const UPDATE_CART_DEBOUNCE_TIME = 500;

function* updateCart() {
  yield delay(UPDATE_CART_DEBOUNCE_TIME);
  try {
    const cartItems = yield select(selectCartItems);
    const currentUser = yield select(selectCurrentUser);

    if (!currentUser) return;

    yield updateUserCart(currentUser.id, cartItems);
    yield put(cartUpdateSuccess());
  } catch (error) {
    yield put(cartFailure(error.message));
  }
}

function* mergeLocalAndRemoteCarts() {
  try {
    const currentUser = yield select(selectCurrentUser);
    if (!currentUser) return;

    const userRef = yield firestore.doc(`users/${currentUser.id}`);
    const snapshot = yield userRef.get();
    const { cartItems: remoteCartItems } = yield snapshot.data();
    const localCartItems = yield select(selectCartItems);

    const mergedCart = yield mergeCarts(localCartItems, remoteCartItems);

    yield put(cartMergeSuccess(mergedCart));
  } catch (error) {
    yield put(cartFailure(error.message));
  }
}

function* onCartMergeStart() {
  yield takeLatest(CartActionTypes.CART_MERGE_START, mergeLocalAndRemoteCarts);
}

function* onCartUpdateStart() {
  yield takeLatest(CartActionTypes.CART_UPDATE_START, updateCart);
}

function* startCartUpdate() {
  yield put(cartUpdateStart());
}

function* onCartUpdate() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.CLEAR_ITEM,
      CartActionTypes.REMOVE_ITEM,
    ],
    startCartUpdate
  );
}

export function* cartSagas() {
  yield all([
    call(onCartUpdateStart),
    call(onCartMergeStart),
    call(onCartUpdate),
  ]);
}
