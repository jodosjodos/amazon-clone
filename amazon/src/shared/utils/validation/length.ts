import { LengthOptions } from "./models/options/length";
import { ValidatorFn } from "./models/validatorFn";

export const _validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions
): boolean => {
  const textLength = text.trim().length;
  if (options?.min && textLength < options?.min) return false;
  if (options?.max && textLength > options?.max) return false;
  return true;
};

// validate password
export const validatePasswordLength = (text: string): boolean => {
  return _validateLength(text, { min: 6, max: 20 });
};

// validate name
export const validateNameLength = (text: string): boolean => {
  return _validateLength(text, { min: 2 });
};
