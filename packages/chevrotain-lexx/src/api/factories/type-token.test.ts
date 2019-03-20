import { createNumberLit, createDecimalLit, createIdLit } from "./special";

const keysOf = Object.keys;
describe("special", () => {
  describe("createNumberLit", () => {
    test("no args - default", () => {
      const token = createNumberLit();
      expect(token).toBeDefined();
    });

    test("empty item - default", () => {
      const token = createNumberLit({});
      expect(token).toBeDefined();
    });
  });
});
