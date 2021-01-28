import React from "react";
import useSignUpForm from "../../hooks/useSignUpForm";
import { Link } from "react-router-dom";

import "./sign-up.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp = () => {
  const { inputs, resetInputs, handleInputChange } = useSignUpForm({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordConfirm) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      createUserProfileDocument(user, { displayName: inputs.displayName });
      resetInputs();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="sign-up">
      <h1 className="title">Sign Up</h1>
      <span className="subtitle">Fill the fields to sign up</span>
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
        <Link className="link" to="/signIn">
          Already have an account
        </Link>
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
