import {
  createStringLit,
  createWhiteSpace,
  createNumberLit,
  createDecimalLit,
  createIdLit
} from "./special";

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

  describe("createDecimalLit", () => {
    test("no args - default", () => {
      const token = createDecimalLit();
      expect(token).toBeDefined();
    });
  });

  describe("createIdLit", () => {
    test("no args - default", () => {
      const token = createIdLit();
      expect(token).toBeDefined();
    });

    test("upcase - enforces first letter upper case", () => {
      const token = createIdLit({ upcase: true });
      expect(token).toBeDefined();
    });

    test("lowcase - enforces first letter lower case", () => {
      const token = createIdLit({ lowcase: true });
      expect(token).toBeDefined();
    });
  });

  describe("createStringLit", () => {
    test("no args - default", () => {
      const token = createStringLit();
      expect(token).toBeDefined();
    });
  });

  describe("createWhiteSpace", () => {
    test("no args - default", () => {
      const token = createWhiteSpace();
      expect(token).toBeDefined();
    });
  });
});
