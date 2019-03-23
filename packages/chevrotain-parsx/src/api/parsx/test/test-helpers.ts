import { Parsx } from "..";
import { Lexer, Parser, createToken } from "chevrotain";

export { Parsx };

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const AndToken = createToken({
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

export const allTokens = [WhiteSpace, AndToken];
export const lexer = new Lexer(allTokens);

// ONLY ONCE
// const parser = new SelectParser([])

const createParse = (lexer: any, parser: any) => {
  const parseInput = (text, opts: any = {}) => {
    const lexingResult = lexer.tokenize(text);
    // "input" is a setter which will reset the parser's state.
    parser.input = lexingResult.tokens;
    const rule = typeof opts === "string" ? opts : opts.rule;
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

export const createParsxRuler = (parsx: any) => {
  const optionalSub = (name: string, subName: string) => {
    parsx.ruleFor(name, () => {
      parsx.optionalSub(subName);
    });
  };

  const optional = (name: string, cb: Function) => {
    parsx.ruleFor(name, () => {
      parsx.optional(cb);
    });
  };
  const subrule = (name: string, subruleName: string) => {
    parsx.ruleFor(name, () => {
      parsx.subrule(subruleName);
    });
  };
  const consume = (name: string, token: string) => {
    parsx.ruleFor(name, () => {
      parsx.consume(token);
    });
  };
  const consumes = (name: string, tokens: string[]) => {
    parsx.ruleFor(name, () => {
      parsx.consumes(tokens);
    });
  };

  const consumeOptional = (name: string, token: string) => {
    parsx.ruleFor(name, () => {
      parsx.consumeOptional(token);
    });
  };

  const either = (name: string, cbs: Function[]) => {
    parsx.ruleFor(name, () => {
      parsx.either(cbs);
    });
  };

  const consumeEither = (name: string, tokens: string[]) => {
    parsx.ruleFor(name, () => {
      parsx.consumeEither(tokens);
    });
  };

  const subruleEither = (name: string, subruleNames: string[]) => {
    parsx.ruleFor(name, () => {
      parsx.subruleEither(subruleNames);
    });
  };

  const many = (name: string, cb: Function) => {
    parsx.ruleFor(name, () => {
      parsx.many(cb);
    });
  };

  const manySeparatedBy = (name: string, sep: string, cb: Function) => {
    parsx.ruleFor(name, () => {
      parsx.manySeparatedBy(sep, cb);
    });
  };

  const atLeastOneSeparatedBy = (name: string, sep: string, cb: Function) => {
    parsx.ruleFor(name, () => {
      parsx.atLeastOneSeparatedBy(sep, cb);
    });
  };

  const manySub = (name: string, rule: any) => {
    parsx.ruleFor(name, () => {
      parsx.manySub(rule);
    });
  };

  const manyOfEither = (name: string, rules: any) => {
    parsx.ruleFor(name, () => {
      parsx.manyOfEither(rules);
    });
  };

  const analyse = () => parsx.selfAnalyse();

  // parser
  const parseLex = (lexer: any) => createParse(lexer, parsx.$);

  return {
    optionalSub,
    optional,
    subrule,
    consume,
    consumes,
    consumeOptional,
    either,
    consumeEither,
    subruleEither,
    many,
    manySeparatedBy,
    atLeastOneSeparatedBy,
    manySub,
    manyOfEither,
    analyse,
    parseLex
  };
};

export const createParser = (_tokens = tokens) => {
  return new Parser(_tokens);
};

const defaults = {
  opts: {
    tokenMap
  },
  tokenMap
};

export const createParsx = (parser, opts: any = defaults.opts) => {
  return new Parsx(parser, opts);
};
