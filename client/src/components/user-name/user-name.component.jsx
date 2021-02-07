import { useQuery } from '@apollo/client';
import React from 'react';

import {
  GET_CURRENT_USER,
  GET_USER_DROPDOWN_HIDDEN,
} from '../../graphql/user/user.queries';
import { toggleUserDropdownHidden } from '../../graphql/user/user.mutations';

import './user-name.styles.scss';

const UserName = ({ className }) => {
  const {
    data: { userDropdownHidden },
  } = useQuery(GET_USER_DROPDOWN_HIDDEN);

  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);

  return (
    <div
      className={`user-name ${className}`}
      onClick={() => toggleUserDropdownHidden()}
    >
      {currentUser.displayName.toUpperCase()}
      <span className={`dropdown-arrow ${userDropdownHidden ? '' : 'active'}`}>
        ❮
      </span>
    </div>
  );
};

export default UserName;
