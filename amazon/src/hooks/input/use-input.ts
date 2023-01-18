import { ChangeEvent, useReducer } from "react";
import { Action } from "../../shared/utils/models/action.interface";
import {
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
  InputActionType,
} from "./models/InputAction.";
import { InputState } from "./models/InputState.interface";
import { ValidatorFn } from "../../shared/utils/validation/models/validatorFn";

const initialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, value = "" } = action;
  switch (type) {
    case INPUT_ACTION_CHANGE:
      return { text: value, hasBeenTouched: state.hasBeenTouched };
    case INPUT_ACTION_BLUR:
      return { text: state.text, hasBeenTouched: true };
    case INPUT_ACTION_CLEAR:
      return { text: "", hasBeenTouched: false };
    default:
      return { ...state };
  }
};

// reducer function
export const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  // error handling
  let shouldDisplayError;
  if (validatorFn) {
    const isValid = validatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }
  // input change
  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
  };

  // input lost focus
  const inputBlurHandler = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  // where you deleted written content
  const clearHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    clearHandler,
    inputBlurHandler,
  };
};
