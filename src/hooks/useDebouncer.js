import { useState, useEffect } from 'react';

const DEBOUNCE_TIME = 300;

const useDebouncer = (defaultTerm) => {
  const [term, setTerm] = useState(defaultTerm);
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timerId);
  }, [term]);

  return { debouncedTerm, term, setTerm, setDebouncedTerm };
};

export default useDebouncer;
