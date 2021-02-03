import React, { useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import useSignUpForm from "../../hooks/useSignUpForm";

import "./sign-up.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  selectRedirectToVerify,
  selectUserError,
} from "../../redux/user/user.selectors";
import { signUpStart } from "../../redux/user/user.actions";

const SignUp = ({ signUpStart, userError }) => {
  const [alertMessage, setAlertMessage] = useState(userError);

  const { inputs, handleInputChange } = useSignUpForm({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const renderedDescription = useMemo(
    () => alertMessage || "Fill the fields to sign up",
    [alertMessage]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm, email } = inputs;

    if (password !== passwordConfirm) {
      setAlertMessage("Passwords don't match!");
      return;
    }

    signUpStart(email, password, { displayName: inputs.displayName });
  };

  return (
    <div className="sign-up">
      <h1 className="title">Sign Up</h1>
      <span className={`${alertMessage ? "alert" : ""}`}>
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

const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
  redirectToVerify: selectRedirectToVerify,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, otherProps) =>
    dispatch(signUpStart({ email, password, ...otherProps })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
