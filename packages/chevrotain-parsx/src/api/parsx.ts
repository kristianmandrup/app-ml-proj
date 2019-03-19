import { Parser, TokenType, Rule } from "chevrotain";

type callback = () => void;
type IRule = any;

// export interface IParser {
//   CONSUME(token: any);
//   MANY(callback);
//   OR(alts: any[]);
//   SUBRULE(rule: any, opts?: any);
//   OPTION(callback);
//   RULE(name: string, cb: callback);
// }

export class Parsx {
  tokenMap: any;

  constructor(public parser: Parser, public opts: any = {}) {
    this.tokenMap = opts.tokenMap;
  }

  $ = this.parser;

  getToken(name: string): TokenType {
    const token = this.tokenMap[name];
    return token || this.noToken(name);
  }

  noToken(name) {
    throw `No such token registered ${name}`;
  }

  consume = (name: string) => {
    const token = this.getToken(name);
    this.$["CONSUME"](token);
  };

  consumes = (names: string[]) => {
    names.map(this.consume);
  };

  // create instance of Rule
  // then monitor use of various constructs inside to ensure
  // f.ex not mutliple uses of:
  // -  OPTION - resolved as OPTION, OPTION2 etc.
  // -  SUBRULE - resolved as SUBRULE, SUBRULE2 etc.
  ruleFor(name: string, cb: callback) {
    return this.$["RULE"](name, cb);
  }

  rule(name: string) {
    return this.$[name];
  }

  subrule(rule: any, opts: any = {}) {
    this.$["SUBRULE"](rule, opts);
    return this;
  }

  optional(rule: any) {
    this.$["OPTION"](rule);
    return this;
  }

  optionalSub(rule: any) {
    this.$["OPTION"](() => this.subrule(rule));
    return this;
  }

  either(ruleCbs: callback[]) {
    this.$["OR"](ruleCbs.map(rule => ({ ALT: rule })));
    return this;
  }

  many(ruleCb: callback) {
    this.$["MANY"](ruleCb);
    return this;
  }

  manySeparatedBy(sep: string, ruleCb: callback) {
    const { $ } = this;
    $["MANY_SEP"]({
      SEP: this.getToken(sep),
      DEF: ruleCb
    });
  }

  atLeastOneSeparatedBy(sep: string, ruleCb: callback) {
    const { $ } = this;
    $["AT_LEAST_ONE_SEP"]({
      SEP: this.getToken(sep),
      DEF: ruleCb
    });
  }

  manySub(rule: any) {
    this.$["MANY"](() => this.subrule(rule));
    return this;
  }

  manyOfEither(rules: IRule[]) {
    this.many(() => {
      this.either(rules);
    });
    return this;
  }
}
