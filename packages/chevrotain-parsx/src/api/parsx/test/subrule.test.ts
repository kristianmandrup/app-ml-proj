import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("subrule", () => {
    const parser = createParser();
    const parsx = createParsx(parser);
    const ruler = createParsxRuler(parsx);

    const subRuleName = "subExpr";
    const subruler = createParsxRuler(parsx);
    expect(() => subruler.consume(subRuleName, "and")).not.toThrow();

    const ruleName = "sub";
    expect(() => ruler.subrule(ruleName, subRuleName)).not.toThrow();
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
