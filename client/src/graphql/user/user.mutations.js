import {
  auth,
  changeUserProfile,
  createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import {
  currentUserVar,
  userDropdownHiddenVar,
  userErrorMessageVar,
} from "../cache";

export const setCurrentUser = (user) => {
  currentUserVar(user);
};

export const toggleUserDropdownHidden = () =>
  userDropdownHiddenVar(!userDropdownHiddenVar());

export const setUserErrorMessage = (errorMessage) =>
  userErrorMessageVar(errorMessage);

const setCurrentUserUsingUserAuth = async (userAuth) => {
  try {
    if (!userAuth) return;

    const userRef = await createUserProfileDocument(userAuth);

    const snapshot = await userRef.get();

    setCurrentUser({
      id: snapshot.id,
      ...snapshot.data(),
    });
    setUserErrorMessage("");
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};

export const checkCurrentUser = () => {
  const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
    unsubscribe();

    if (!userAuth) {
      setCurrentUser(null);
      return;
    }

    setCurrentUserUsingUserAuth(userAuth);
  });
};

export const signInWithEmail = async (email, password) => {
  try {
    const { user: userAuth } = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    if (!userAuth.emailVerified) {
      throw new Error("Email is not verified!");
    }

    setCurrentUserUsingUserAuth(userAuth);
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};

export const signOut = () => {
  try {
    auth.signOut();
    setCurrentUser(null);
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};

export const startSignInWithGoogle = async () => {
  try {
    const { user: userAuth } = await signInWithGoogle();
    setCurrentUserUsingUserAuth(userAuth);
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};

export const signUpWithEmail = async (email, password, ...otherData) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    user.sendEmailVerification();
    auth.signOut();

    const userRef = createUserProfileDocument(user, ...otherData);
    setUserErrorMessage("");
    return userRef;
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};

export const changeUserData = async (id, newData) => {
  try {
    const userRef = await changeUserProfile(id, newData);
    const snapshot = await userRef.get();
    setCurrentUser({
      id: snapshot.id,
      ...snapshot.data(),
    });
  } catch (error) {
    setUserErrorMessage(error.message);
  }
};
