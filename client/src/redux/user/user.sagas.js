import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  changeUserProfile,
} from "../../firebase/firebase.utils";

import {
  signInFailure,
  signInSuccess,
  signUpSuccess,
  signUpFailure,
  signOutFailure,
  signOutSuccess,
  changeProfileFailure,
  changeProfileSuccess,
} from "./user.actions";

import { cartMergeStart } from "../cart/cart.actions";

function* putUserSnapshotViaAction(action, snapshot) {
  yield put(action.call(null, { id: snapshot.id, ...snapshot.data() }));
}

function* getSnapshotFromUserAuth(userAuth, otherParams) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      otherParams
    );
    const snapshot = yield userRef.get();
    return snapshot;
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const snapshot = yield getSnapshotFromUserAuth(user);
    yield putUserSnapshotViaAction(signInSuccess, snapshot);
    yield put(cartMergeStart());
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    if (!user.emailVerified) {
      throw new Error("Email is not verified!");
    }
    const snapshot = yield getSnapshotFromUserAuth(user);
    yield putUserSnapshotViaAction(signInSuccess, snapshot);
    yield put(cartMergeStart());
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;

    const snapshot = yield getSnapshotFromUserAuth(userAuth);
    yield putUserSnapshotViaAction(signInSuccess, snapshot);
  } catch (error) {
    put(signInFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* createNewUser(userAuth, otherParams) {
  try {
    yield call(createUserProfileDocument, userAuth, otherParams);

    yield put(signUpSuccess(userAuth));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signOut);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* signUpWithEmailAndPassword({ payload }) {
  try {
    const { email, password, ...otherParams } = payload;
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield user.sendEmailVerification();

    yield createNewUser(user, otherParams);
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpWithEmailAndPassword);
}

function* changeProfile({ payload }) {
  try {
    const { id, ...newUserData } = payload;

    const userRef = yield changeUserProfile(id, newUserData);
    const snapshot = yield userRef.get();
    yield putUserSnapshotViaAction(changeProfileSuccess, snapshot);
  } catch (error) {
    yield put(changeProfileFailure(error.message));
  }
}

export function* onChangeProfileStart() {
  yield takeLatest(UserActionTypes.CHANGE_PROFILE_START, changeProfile);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onChangeProfileStart),
  ]);
}
