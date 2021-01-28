import React from "react";
import useSignUpForm from "../../hooks/useSignUpForm";
import { Link, withRouter } from "react-router-dom";

import "./sign-in.styles.scss";

import { signInWithGoogle, auth } from "../../firebase/firebase.utils";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const SignIn = ({ history }) => {
  const { inputs, handleInputChange } = useSignUpForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inputs;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();

    signInWithGoogle()
      .then((result) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sign-in">
      <h1 className="title">Sign In</h1>
      <span>Sign in with your email and password</span>

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
        <Link className="link" to="/signUp">
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

export default withRouter(SignIn);
