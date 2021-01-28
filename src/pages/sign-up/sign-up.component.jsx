import React from "react";
import useSignUpForm from "../../hooks/useSignUpForm";
import { Link } from "react-router-dom";

import "./sign-up.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

const SignUp = () => {
  const [inputs, handleInputChange] = useSignUpForm({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <div className="sign-up">
      <h1 className="title">Sign Up</h1>
      <span className="subtitle">Fill the fields to sign up</span>
      <form>
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
          label="Password confirm"
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
