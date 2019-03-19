import { createParserRule } from "./rule";

describe("ParserRule", () => {
  describe("createParserRule", () => {
    test("creates ParserRule", () => {
      const rule = createParserRule();
      expect(rule).toBeDefined();
    });
  });
});
