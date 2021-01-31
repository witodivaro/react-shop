import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import useSignUpForm from '../../hooks/useSignUpForm';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { changeUserProfile } from '../../firebase/firebase.utils';

import CustomInput from '../../components/custom-input/custom-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './settings.styles.scss';

const MAX_NAME_LENGTH = 20;

const SettingsPage = ({ currentUser }) => {
  const { inputs, handleInputChange } = useSignUpForm({
    displayName: '',
  });

  const renderButton = useMemo(
    () => (name) =>
      inputs[name] ? (
        <CustomButton
          inverted
          disabled={inputs[name].length > MAX_NAME_LENGTH}
          onClick={() => {
            changeUserProfile(currentUser.id, {
              [name]: inputs[name],
            });
            inputs[name] = '';
          }}
        >
          Change
        </CustomButton>
      ) : null,
    [currentUser, inputs]
  );

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings">
        <div className="setting">
          <span className="setting-title">Name:</span>
          <CustomInput
            name="displayName"
            label={currentUser.displayName}
            value={inputs.displayName}
            onChange={handleInputChange}
            type="text"
            customMaxLength={MAX_NAME_LENGTH}
          />
          {renderButton('displayName')}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SettingsPage);
