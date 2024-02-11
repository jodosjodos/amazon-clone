import { validateNameLength, validatePasswordLength } from "./length";

describe("Field length validation", () => {
  describe("Name Field", () => {
    let name = "";
    test("a name should fail length validation if it is not set ", () => {
      expect(validateNameLength(name)).toEqual(false);
    });
    test("a name should fail length validation if it is less than 2 characters ", () => {
      name = "J";
      expect(validateNameLength(name)).toEqual(false);
    });
    test("a name should pass length validation if it is  2 characters ", () => {
      name = "Jo";
      expect(validateNameLength(name)).toEqual(true);
    });
    test("a name should pass length validation if it is more  2 characters ", () => {
      name = "Jodo";
      expect(validateNameLength(name)).toEqual(true);
    });
  });

  //   password field
  describe("Password Field validation", () => {
    let password = "";
    test("a password should fail length validation if it is not set ", () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test("a password should fail length validation if it is less than 2 characters ", () => {
      password = "J";
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test("a password should fail length validation if it is  more than 20 characters ", () => {
      password = "my name is jodos with gang that help with people for mee";
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test("a password should pass length validation if it is more  6-20 characters ", () => {
      password = "password";
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });
});
