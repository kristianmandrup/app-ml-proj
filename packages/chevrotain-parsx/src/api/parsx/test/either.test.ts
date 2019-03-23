import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("either", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const ruler = createParsxRuler(parsx);
    const ruleName = "either";
    const andCb = () => parsx.consume("and");
    expect(() => ruler.either(ruleName, [andCb])).not.toThrow();
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
