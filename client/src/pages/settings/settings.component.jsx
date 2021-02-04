import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import useSignUpForm from "../../hooks/useSignUpForm";
import { createStructuredSelector } from "reselect";

import { auth, createCredentials } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { changeProfileStart } from "../../redux/user/user.actions";

import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  SettingsPageContainer,
  SettingContainer,
  SettingsContainer,
} from "./settings.styles";

const MAX_NAME_LENGTH = 20;

const SettingsPage = ({ changeProfileStart, currentUser }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm({
    displayName: "",
    password: "",
    newPassword: "",
  });

  const onChangeNameClick = useCallback(
    (name) => {
      changeProfileStart(currentUser.id, {
        [name]: inputs[name],
      });
      inputs[name] = "";
    },
    [currentUser, inputs, changeProfileStart]
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
      <SettingContainer>
        <span>New password:</span>
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
      </SettingContainer>
    ),
    [inputs, handleInputChange, renderButton, onChangePasswordClick]
  );

  const renderedPassword = useMemo(
    () => (
      <SettingContainer>
        <span>Password:</span>
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
      </SettingContainer>
    ),
    [onConfirmPasswordClick, handleInputChange, inputs, renderButton]
  );

  return (
    <SettingsPageContainer>
      <h1>Settings</h1>
      <SettingsContainer>
        <SettingContainer>
          <span>Name:</span>
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
        </SettingContainer>
        {showNewPassword ? renderedNewPasword : renderedPassword}
      </SettingsContainer>
    </SettingsPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  changeProfileStart: (id, userData) =>
    dispatch(changeProfileStart({ id, ...userData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
