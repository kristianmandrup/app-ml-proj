import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("subruleEither", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const subRuleName = "expr";
    const subruler = createParsxRuler(parsx);

    const ruler = createParsxRuler(parsx);
    const ruleName = "cEither";
    expect(() =>
      ruler.subruleEither(ruleName, [subRuleName, subRuleName])
    ).not.toThrow();
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
