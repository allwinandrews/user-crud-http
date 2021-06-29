import { useState, useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { ...state, value: action.value };
  }
  if (action.type === "BLUR") {
    return { ...state, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialInputState;
};

export default function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  //   enteredValue.trim() !== "";
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
