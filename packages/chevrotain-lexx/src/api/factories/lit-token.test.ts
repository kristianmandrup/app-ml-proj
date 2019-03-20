import { stringToTokenOpts, extractTokenOpts } from "./lit-token";

describe("factories", () => {
  describe("stringToTokenOpts", () => {
    test("empty item - throws", () => {
      const item = null;
      expect(() => stringToTokenOpts(item)).toThrow();
    });

    test("valid string - no throw", () => {
      const item = "id";
      expect(() => stringToTokenOpts(item)).not.toThrow();
    });
  });

  describe("extractTokenOpts", () => {
    test("empty item - throws", () => {
      const item = null;
      expect(() => extractTokenOpts(item)).toThrow();
    });

    test("valid string - no throw", () => {
      const item = "id";
      expect(() => extractTokenOpts(item)).not.toThrow();
    });
  });
});
