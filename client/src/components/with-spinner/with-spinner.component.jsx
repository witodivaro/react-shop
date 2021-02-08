import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrappedComponent) => {
  const SpinnerOverlay = ({ isLoading, ...otherProps }) =>
    isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;

  return SpinnerOverlay;
};

export default WithSpinner;
