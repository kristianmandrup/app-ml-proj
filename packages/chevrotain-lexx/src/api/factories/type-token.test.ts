import { createTypeToken, createTypeTokens } from "./type-token";

const keysOf = Object.keys;

describe("type", () => {
  describe("createTypeToken", () => {
    test("number - ok", () => {
      const token = createTypeToken("number");
      expect(token).toBeDefined();
    });

    test("unknown type - ok", () => {
      expect(() => createTypeToken("unknown")).not.toThrow();
    });
  });

  describe("createTypeTokens", () => {
    test("number - ok", () => {
      const token = createTypeTokens(["number"]);
      expect(token).toBeDefined();
    });

    test("unknown - ok", () => {
      expect(() => createTypeTokens(["number", "unknown"])).not.toThrow();
    });
  });
});
