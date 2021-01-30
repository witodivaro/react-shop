import React, { useMemo, useState } from 'react';
import useSignUpForm from '../../hooks/useSignUpForm';
import { Link } from 'react-router-dom';

import './sign-up.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignUp = ({ history }) => {
  const [alertMessage, setAlertMessage] = useState('');

  const { inputs, handleInputChange } = useSignUpForm({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const renderedDescription = useMemo(
    () => (alertMessage ? alertMessage : 'Fill the fields to sign up'),
    [alertMessage]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm, email } = inputs;

    if (password !== passwordConfirm) {
      setAlertMessage("Passwords don't match!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      history.push('/sign/verify');

      user.sendEmailVerification();
      await createUserProfileDocument(user, {
        displayName: inputs.displayName,
      });
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <div className="sign-up">
      <h1 className="title">Sign Up</h1>
      <span className={`${alertMessage ? 'alert' : ''}`}>
        {renderedDescription}
      </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="displayName"
          name="displayName"
          type="text"
          label="Name"
          value={inputs.displayName}
          onChange={handleInputChange}
          required
        />
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
        <FormInput
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          label="Confirm password"
          value={inputs.passwordConfirm}
          onChange={handleInputChange}
          required
        />
        <Link className="link" to="/sign/signIn">
          Already have an account
        </Link>
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
