import { createSpecialLit, createSpecialLits } from "./special-token";

const keysOf = Object.keys;
describe("special token", () => {
  describe("createSpecialLit", () => {
    test("invalid special - throws", () => {
      expect(() => createSpecialLit("unknown")).toThrow();
    });

    test("invalid special: item no name - throws", () => {
      expect(() => createSpecialLit({ x: "id" })).toThrow();
    });

    test("valid special: string - no throw", () => {
      expect(() => createSpecialLit("id")).not.toThrow();
    });

    test("valid special: item - no throw", () => {
      expect(() => createSpecialLit({ name: "id" })).not.toThrow();
    });
  });

  describe("createSpecialLits", () => {
    test("invalid special - throws", () => {
      expect(() => createSpecialLits(["whitespace", "unknown"])).not.toThrow();
    });

    test("invalid special: item no name - throws", () => {
      expect(() => createSpecialLit([{ x: "id" }])).toThrow();
    });

    test("valid special: string - no throw", () => {
      expect(() => createSpecialLits(["whitespace", "id"])).not.toThrow();
    });

    test("valid special: item - no throw", () => {
      expect(() => createSpecialLit([{ name: "id" }])).not.toThrow();
    });
  });
});
