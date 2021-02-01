import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import useSignUpForm from "../../hooks/useSignUpForm";
import { createStructuredSelector } from "reselect";

import { auth, createCredentials } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { changeUserProfile } from "../../firebase/firebase.utils";

import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./settings.styles.scss";

const MAX_NAME_LENGTH = 20;

const SettingsPage = ({ currentUser }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm({
    displayName: "",
    password: "",
    newPassword: "",
  });

  const onChangeNameClick = useCallback(
    (name) => {
      console.log(1);
      changeUserProfile(currentUser.id, {
        [name]: inputs[name],
      });
      inputs[name] = "";
    },
    [currentUser, inputs]
  );

  const onConfirmPasswordClick = useCallback(
    (passwordInput) => {
      const credentials = createCredentials(
        auth.currentUser.email,
        inputs[passwordInput]
      );
      auth.currentUser
        .reauthenticateWithCredential(credentials)
        .then(() => {
          setShowNewPassword(true);
          inputs[passwordInput] = "";
        })
        .catch(() => alert("Wrong password!"));
    },
    [inputs]
  );

  const onChangePasswordClick = useCallback(
    (newPasswordInput) => {
      auth.currentUser.updatePassword(inputs[newPasswordInput]).then(() => {
        alert("Password changed!");
        setShowNewPassword(false);
        inputs[newPasswordInput] = "";
      });
    },
    [inputs]
  );

  const renderButton = useCallback(
    (name, onClick, text = "Change") =>
      inputs[name] ? (
        <CustomButton
          inverted
          disabled={inputs[name].length > MAX_NAME_LENGTH}
          onClick={() => onClick(name)}
        >
          {text}
        </CustomButton>
      ) : null,
    [inputs]
  );

  const renderedNewPasword = useMemo(
    () => (
      <div className="setting">
        <span className="setting-title">New password:</span>
        <CustomInput
          id="newPassword"
          label="Input new password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleInputChange}
          type="text"
          customMaxLength={MAX_NAME_LENGTH}
        />
        {renderButton("newPassword", onChangePasswordClick)}
      </div>
    ),
    [inputs, handleInputChange, renderButton, onChangePasswordClick]
  );

  const renderedPassword = useMemo(
    () => (
      <div className="setting">
        <span className="setting-title">Password:</span>
        <CustomInput
          id="password"
          label="Input current password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
          type="password"
          customMaxLength={MAX_NAME_LENGTH}
        />
        {renderButton("password", onConfirmPasswordClick, "confirm")}
      </div>
    ),
    [onConfirmPasswordClick, handleInputChange, inputs, renderButton]
  );

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings">
        <div className="setting">
          <span className="setting-title">Name:</span>
          <CustomInput
            id="displayName"
            name="displayName"
            label={currentUser.displayName}
            value={inputs.displayName}
            onChange={handleInputChange}
            type="text"
            customMaxLength={MAX_NAME_LENGTH}
          />
          {renderButton("displayName", onChangeNameClick)}
        </div>
        {showNewPassword ? renderedNewPasword : renderedPassword}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SettingsPage);
