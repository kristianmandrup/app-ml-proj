import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";
describe("Parsx", () => {
  describe("optionalSub", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const subRuleName = "expr";
    const subruler = createParsxRuler(parsx);
    expect(() => subruler.consume(subRuleName, "and")).not.toThrow();

    const ruler = createParsxRuler(parsx);
    const ruleName = "optSub";
    expect(() => ruler.optionalSub(ruleName, subRuleName)).not.toThrow();
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
