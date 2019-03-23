import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer,
  Parsx
} from "./test-helpers";

describe("Parsx", () => {
  describe("manyOfEither", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const andCb = () => parsx.consume("and");

    const ruler = createParsxRuler(parsx);
    const ruleName = "mEither";
    expect(() => ruler.manyOfEither(ruleName, [andCb])).not.toThrow();
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

  describe("create", () => {
    test("creates Parsx", () => {
      const parser = createParser();

      expect(new Parsx(parser)).toBeDefined();
    });

    test("creates Parsx with custom tokenMap", () => {
      const parser = createParser();
      const tokenMap = {};
      const opts = { tokenMap };
      expect(createParsx(parser, opts)).toBeDefined();
    });

    test("creates Parsx with custom tokenAliasMap", () => {
      const parser = createParser();
      const tokenAliasMap = {
        "±": "PlusMinus"
      };
      const opts = { tokenAliasMap };
      expect(createParsx(parser, opts)).toBeDefined();
    });
  });
});
