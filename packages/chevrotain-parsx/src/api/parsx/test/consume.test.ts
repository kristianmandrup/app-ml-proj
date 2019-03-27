import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("consume: single token and", () => {
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

  describe("consume: multi token string", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const ruler = createParsxRuler(parsx);
    const ruleName = "cSingle";
    expect(() => ruler.consume(ruleName, "and or")).not.toThrow();
    ruler.analyse();
    const parse = ruler.parseLex(lexer);

    test("consume - ok", () => {
      const parseAndOr = () => parse("and or", ruleName);
      expect(() => parseAndOr()).not.toThrow();
    });
  });
});
