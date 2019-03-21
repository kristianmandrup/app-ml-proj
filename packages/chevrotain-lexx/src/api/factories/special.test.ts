import {
  createString,
  createWhitespace,
  createNumber,
  createDecimal,
  createId
} from "./special";

describe("special", () => {
  describe("createNumber", () => {
    test("no args - default", () => {
      const token = createNumber();
      expect(token).toBeDefined();
    });

    test("empty item - default", () => {
      const token = createNumber({});
      expect(token).toBeDefined();
    });
  });

  describe("createDecimal", () => {
    test("no args - default", () => {
      const token = createDecimal();
      expect(token).toBeDefined();
    });
  });

  describe("createId", () => {
    test("no args - default", () => {
      const token = createId();
      expect(token).toBeDefined();
    });

    test("upcase - enforces first letter upper case", () => {
      const token = createId({ upcase: true });
      expect(token).toBeDefined();
    });

    test("lowcase - enforces first letter lower case", () => {
      const token = createId({ lowcase: true });
      expect(token).toBeDefined();
    });
  });

  describe("createString", () => {
    test("no args - default", () => {
      const token = createString();
      expect(token).toBeDefined();
    });
  });

  describe("createWhiteSpace", () => {
    test("no args - default", () => {
      const token = createWhitespace();
      expect(token).toBeDefined();
    });
  });
});
