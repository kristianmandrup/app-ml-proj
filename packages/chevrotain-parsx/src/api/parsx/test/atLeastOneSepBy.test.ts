import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";

describe("Parsx", () => {
  describe("atLeastOneSeparatedBy", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const andCb = () => parsx.consume("and");

    const ruler = createParsxRuler(parsx);
    const ruleName = "cEither";
    expect(() =>
      ruler.atLeastOneSeparatedBy(ruleName, "and", andCb)
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
