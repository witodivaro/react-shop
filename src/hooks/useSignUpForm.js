import { useState } from "react";

const useSignUpForm = (defaultInputs) => {
  const [inputs, setInputs] = useState(defaultInputs);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  return [inputs, handleInputChange];
};

export default useSignUpForm;
