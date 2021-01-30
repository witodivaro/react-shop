import React, { useMemo, useState } from 'react';
import useSignUpForm from '../../hooks/useSignUpForm';
import { Link } from 'react-router-dom';

import './sign-in.styles.scss';

import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = () => {
  const [alertMessage, setAlertMessage] = useState('');

  const renderedDescription = useMemo(
    () =>
      alertMessage ? alertMessage : 'Sign in with your email and password',
    [alertMessage]
  );

  const { inputs, handleInputChange } = useSignUpForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inputs;

    auth.signOut();

    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (!auth.currentUser.emailVerified) {
            setAlertMessage('Email is not verified!');
          }
        })
        .catch((error) => setAlertMessage(error.message));
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();

    signInWithGoogle();
  };

  return (
    <div className="sign-in">
      <h1 className="title">Sign In</h1>
      <span className={`${alertMessage ? 'alert' : ''}`}>
        {renderedDescription}
      </span>

      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={inputs.email}
          onChange={handleInputChange}
          required
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={inputs.password}
          onChange={handleInputChange}
          required
        />
        <Link className="link" to="/sign/signUp">
          Register a new account
        </Link>

        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton onClick={handleSignInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
