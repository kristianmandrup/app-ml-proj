import { Parsx } from "./parsx";
import { Lexer, Parser, createToken } from "chevrotain";

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

const AndToken = createToken({
  name: "And",
  pattern: /and/
});

const tokens = [AndToken];
const tokenMap = {
  And: AndToken
};

class MyParser extends Parser {
  constructor() {
    super(tokens);
  }
}

let allTokens = [WhiteSpace, AndToken];
const lexer = new Lexer(allTokens);

// ONLY ONCE
// const parser = new SelectParser([])

const createParse = (lexer: any, parser: any) => {
  const parseInput = (text, opts: any = {}) => {
    const lexingResult = lexer.tokenize(text);
    // "input" is a setter which will reset the parser's state.
    parser.input = lexingResult.tokens;
    const rule = opts.rule;
    if (!rule) {
      throw new Error(`missing rule to execute: ${opts}`);
    }
    parser[rule]();

    if (parser.errors.length > 0) {
      console.error("ERRORS:", parser.errors);
      throw new Error("sad sad panda, Parsing errors detected");
    }
  };

  return (inputText, opts: any = {}) => {
    parseInput(inputText, opts);
  };
};

const createParser = (_tokens = tokens) => {
  return new Parser(_tokens);
};

const defaults = {
  opts: {
    tokenMap
  },
  tokenMap
};

const createParsx = (parser, opts: any = defaults.opts) => {
  return new Parsx(parser, opts);
};

describe("Parsx", () => {
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

  describe("lookupAlias", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("no alias - undefined", () => {
      expect(parsx.lookupAlias("v")).toBeUndefined();
    });

    test("find alias - name", () => {
      expect(parsx.lookupAlias(":")).toBeDefined();
    });
  });

  describe("lookupToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("no token - undefined", () => {
      expect(() => parsx.lookupToken("v")).toBeUndefined();
    });

    test("find named token - token", () => {
      expect(parsx.lookupToken(":")).toBeDefined();
    });
  });

  describe("normalizeName", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("<string> - String (special)", () => {
      expect(parsx.normalizeName("<string>")).toEqual("String");
    });

    test(": - Colon (alias)", () => {
      expect(parsx.normalizeName(":")).toEqual("Colon");
    });

    test("colon - colon (unchanged)", () => {
      expect(parsx.normalizeName("colon")).toEqual("colon");
    });
  });

  describe("normalizeName", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("colon - Colon", () => {
      expect(parsx.capTokenName("colon")).toEqual("Colon");
    });

    test(": - Colon", () => {
      expect(parsx.capTokenName(":")).toEqual("Colon");
    });
  });

  describe("getToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("x - token x", () => {
      expect(parsx.getToken("and")).toBe(AndToken);
    });

    test("unknown - throws", () => {
      expect(() => parsx.getToken("oops")).toThrow();
    });
  });

  describe("noToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("name - throws", () => {
      expect(() => parsx.noToken("oops")).toThrow();
    });
  });

  describe.only("consume", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    // const myParser = new MyParser()

    test("manual", () => {
      expect(() =>
        parsx.ruleFor("hello", () => {
          parsx.consume("and");
        })
      ).not.toThrow();
      parsx.selfAnalyse();

      // parser
      const parse = createParse(lexer, parsx.$);
      const parseAnd = () => parse("and", { rule: "hello" });
      try {
        parseAnd();
      } catch (ex) {
        console.error(ex);
      }

      expect(() => parseAnd()).not.toThrow();
    });

    test.skip("consume and - ok", () => {
      expect(() => parsx.consume("and")).not.toThrow();
    });

    // test("consume unknown - throws", () => {
    //   expect(() => parsx.consume("and")).toThrow();
    // });
  });

  describe.skip("consumes", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("consume x - ok", () => {
      expect(() => parsx.consumes(["and"])).not.toThrow();
    });

    test("consume unknown - throws", () => {
      expect(() => parsx.consumes(["and"])).toThrow();
    });
  });
});
