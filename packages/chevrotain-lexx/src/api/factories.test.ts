import {
  createLitToken,
  createLitTokens,
  createTypeToken,
  createTypeTokens,
  createSpecialLit,
  createSpecialLits
} from "./factories";

const keysOf = Object.keys;
describe("factories", () => {
  describe("createLitToken", () => {
    test("empty item - throws", () => {
      expect(() => createLitToken({})).toThrow();
    });

    test("valid string - no throw", () => {
      expect(() => createLitToken("id")).not.toThrow();
    });
  });

  describe("createLitTokens", () => {
    test("empty item - throws", () => {
      expect(() => createLitTokens([{}])).toThrow();
    });

    test("valid string - no throw", () => {
      expect(() => createLitTokens(["id"])).not.toThrow();
    });
  });

  describe("createTypeToken", () => {
    test("invalid type - throws", () => {
      expect(() => createTypeToken("unknown")).toThrow();
    });

    test("valid string - no throw", () => {
      expect(() => createTypeToken("decimal")).not.toThrow();
    });
  });

  describe("createTypeTokens", () => {
    test("invalid type - throws", () => {
      expect(() => createTypeTokens(["unknown"])).toThrow();
    });

    test("valid type string - no throw", () => {
      expect(() => createTypeTokens(["id"])).not.toThrow();
    });
  });

  describe("createSpecialLit", () => {
    test("invalid special - throws", () => {
      expect(() => createSpecialLit("unknown")).toThrow();
    });

    test("valid special - no throw", () => {
      expect(() => createSpecialLit("id")).not.toThrow();
    });
  });

  describe("createSpecialLits", () => {
    test("invalid special - throws", () => {
      expect(() => createSpecialLits(["whitespace", "unknown"])).not.toThrow();
    });

    test("valid special - no throw", () => {
      expect(() => createSpecialLits(["whitespace", "id"])).not.toThrow();
    });
  });
});
