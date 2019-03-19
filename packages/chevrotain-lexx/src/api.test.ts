import { createLexx } from "./api";

describe("api", () => {
  describe("createLexx", () => {
    test("creates Lexx", () => {
      const tokenMap = {
        invalid: true,
        valid: true,
        validate: true
      };
      expect(createLexx()).toBeDefined();
    });
  });
});
