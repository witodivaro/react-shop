import React from 'react';
import { Link } from 'react-router-dom';

import './verify-email.styles.scss';

const VerifyEmaill = ({ match }) => {
  const parentPath = match.url.split('/').slice(0, -1).join('/');

  return (
    <div className="verify-email">
      <h2 className="title">📩 Verify your email</h2>
      <p className="text">
        Please, verify your email. Then proceed to sign in page and enter your
        credentials.
      </p>
      <Link className="link" to={`${parentPath}/signIn`}>
        Sign in
      </Link>
    </div>
  );
};

export default VerifyEmaill;
