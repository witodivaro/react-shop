import { useState } from "react";

const useSignUpForm = (defaultInputs) => {
  const [inputs, setInputs] = useState(defaultInputs);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const resetInputs = () => {
    setInputs(defaultInputs);
  };

  return {
    inputs,
    resetInputs,
    handleInputChange,
  };
};

export default useSignUpForm;
