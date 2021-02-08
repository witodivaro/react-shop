import React, { useMemo } from "react";
import useSignUpForm from "../../hooks/useSignUpForm";
import { Link } from "react-router-dom";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  signInWithEmail,
  startSignInWithGoogle,
} from "../../graphql/user/user.mutations";
import { useQuery } from "@apollo/client";
import { GET_USER_ERROR_MESSAGE } from "../../graphql/user/user.queries";

const SignIn = () => {
  const {
    data: { userErrorMessage },
  } = useQuery(GET_USER_ERROR_MESSAGE);

  const renderedDescription = useMemo(
    () => userErrorMessage || "Sign in with your email and password",
    [userErrorMessage]
  );

  const { inputs, handleInputChange } = useSignUpForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;

    signInWithEmail(email, password);
  };

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();

    startSignInWithGoogle();
  };

  return (
    <div className="sign-in">
      <h1 className="title">Sign In</h1>
      <span className={`${userErrorMessage ? "alert" : ""}`}>
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
