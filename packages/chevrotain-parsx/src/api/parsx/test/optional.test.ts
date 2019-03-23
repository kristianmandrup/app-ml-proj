import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("optional", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const ruler = createParsxRuler(parsx);
    const ruleName = "opt";
    const opt = () => parsx.consume("and");
    expect(() => ruler.optional(ruleName, opt)).not.toThrow();
    ruler.analyse();
    const parse = ruler.parseLex(lexer);

    test("consume x - ok", () => {
      const parseAnd = () => parse("and", ruleName);
      expect(() => parseAnd()).not.toThrow();
    });

    test("consume unknown - throws", () => {
      const parseUnknown = () => parse("unknown", ruleName);
      expect(() => parseUnknown()).toThrow();
    });
  });
});
