import {
  createParsx,
  createParser,
  createParsxRuler,
  lexer
} from "./test-helpers";
import { Parsx } from "..";

describe("Parsx", () => {
  describe("consumes", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    const ruler = createParsxRuler(parsx);
    const ruleName = "cMulti";
    expect(() => ruler.consumes(ruleName, ["and"])).not.toThrow();
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
