import React, { useMemo } from "react";
import useSignUpForm from "../../hooks/useSignUpForm";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectUserError } from "../../redux/user/user.selectors";

const SignIn = ({ userError, googleSignInStart, emailSignInStart }) => {
  const renderedDescription = useMemo(
    () => userError || "Sign in with your email and password",
    [userError]
  );

  const { inputs, handleInputChange } = useSignUpForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;

    emailSignInStart(email, password);
  };

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();

    googleSignInStart();
  };

  return (
    <div className="sign-in">
      <h1 className="title">Sign In</h1>
      <span className={`${userError ? "alert" : ""}`}>
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

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
