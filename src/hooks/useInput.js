import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredInput, setEnteredInput] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredInput);

  function inputChangeHandler(e) {
    setEnteredInput(e.target.value);
    setDidEdit(false);
  }

  function inputBlurHandler() {
    setDidEdit(true);
  }

  return {
    value: enteredInput,
    inputChangeHandler,
    inputBlurHandler,
    hasError: didEdit && !valueIsValid,
  };
}
