import { createParsx } from "./api";

describe("api", () => {
  describe("createParsx", () => {
    test("creates Parsx", () => {
      const tokenMap = {
        invalid: true,
        valid: true,
        validate: true
      };
      expect(createParsx()).toBeDefined();
    });
  });
});
