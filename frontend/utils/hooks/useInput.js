import React, { useCallback, useState } from 'react';

const useInput = (initialValie = null) => {
  const [value, setter] = useState(initialValie);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);

  return [value, handler];
};

export default useInput;
