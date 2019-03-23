import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("consume", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const ruler = createParsxRuler(parsx);
    const ruleName = "cSingle";
    expect(() => ruler.consume(ruleName, "and")).not.toThrow();
    ruler.analyse();
    const parse = ruler.parseLex(lexer);

    test("consume - ok", () => {
      const parseAnd = () => parse("and", ruleName);
      expect(() => parseAnd()).not.toThrow();
    });

    test("consume unknown - throws", () => {
      const parseUnknown = () => parse("unknown", ruleName);
      expect(() => parseUnknown()).toThrow();
    });
  });
});
