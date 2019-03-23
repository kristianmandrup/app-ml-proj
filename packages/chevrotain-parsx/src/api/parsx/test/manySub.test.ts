import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("manySub", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const subRuleName = "expr";
    const subruler = createParsxRuler(parsx);
    const subrule = () => subruler.consume(subRuleName, "and");

    const ruler = createParsxRuler(parsx);
    const ruleName = "cEither";
    expect(() => ruler.manySub(ruleName, subrule)).not.toThrow();
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
