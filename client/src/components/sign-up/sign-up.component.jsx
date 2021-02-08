import React, { useMemo } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import useSignUpForm from "../../hooks/useSignUpForm";

import "./sign-up.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { signUpWithEmail } from "../../graphql/user/user.mutations";
import { useQuery } from "@apollo/client";
import { GET_USER_ERROR_MESSAGE } from "../../graphql/user/user.queries";

const SignUp = () => {
  const {
    data: { userErrorMessage },
  } = useQuery(GET_USER_ERROR_MESSAGE);
  const history = useHistory();
  const match = useRouteMatch();

  const parentPath = match.path.split("/").slice(0, -1).join("/");

  const { inputs, handleInputChange } = useSignUpForm({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const renderedDescription = useMemo(
    () => userErrorMessage || "Fill the fields to sign up",
    [userErrorMessage]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm, email } = inputs;

    if (password !== passwordConfirm) {
      alert("Passwords don't match!");
      return;
    }

    const userRef = await signUpWithEmail(email, password, {
      displayName: inputs.displayName,
    });
    if (userRef) {
      console.log(match);
      history.push(`${parentPath}/verify`);
    }
  };

  return (
    <div className="sign-up">
      <h1 className="title">Sign Up</h1>
      <span className={`${userErrorMessage ? "alert" : ""}`}>
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
