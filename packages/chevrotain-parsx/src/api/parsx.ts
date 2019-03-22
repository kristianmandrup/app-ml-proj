import { Parser, TokenType, Rule } from "chevrotain";
import { capitalize, stringify } from "../util";
import { aliasMap } from "./alias-map";

type callback = () => void;
type IRule = any;

interface IMap {
  [key: string]: any;
}

export class Parsx {
  tokenMap: IMap = {};
  defaultAliasMap: IMap = aliasMap;
  _tokenAliasMap: IMap = this.defaultAliasMap;

  get tokenAliasMap() {
    return this._tokenAliasMap;
  }

  constructor(public parser: Parser, public opts: any = {}) {
    const tokenAliasMap = opts.tokenAliasMap || {};
    const tokenMap = opts.tokenMap || {};
    this.tokenMap = tokenMap;
    this._tokenAliasMap = {
      ...this.tokenAliasMap,
      ...tokenAliasMap
    };
  }

  $ = this.parser;

  lookupAlias(name: string) {
    return this.tokenAliasMap[name];
  }

  lookupToken(name: string) {
    return this.tokenMap[name];
  }

  normalizeName(name: string) {
    if (name === "<string>") {
      return "String";
    }
    if (name === "<ID>") {
      return "Identifier";
    }
    return this.lookupAlias(name) || name;
  }

  capTokenName(name: string) {
    return capitalize(this.normalizeName(name));
  }

  getToken(name: string): TokenType {
    const capName = this.capTokenName(name);
    const token = this.lookupToken(capName);
    return token || this.noToken(name, capName);
  }

  noToken(name: string, capName?: string) {
    throw `No such token registered ${name ||
      "undefined"} capName:${capName} map: ${stringify(this.tokenMap)}`;
  }

  consume = (name: string) => {
    const token = this.getToken(name);
    this.$["CONSUME"](token);
  };

  selfAnalyse() {
    this.$["performSelfAnalysis"]();
  }

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

  subrule(rule: any, opts: any = {}) {
    this.$["SUBRULE"](rule, opts);
    return this;
  }

  optional(rule: callback) {
    this.$["OPTION"](rule);
    return this;
  }

  optionalSub(rule: any) {
    this.$["OPTION"](() => this.subrule(rule));
    return this;
  }

  consumeOptional(token: any) {
    this.$["OPTION"](() => this.consume(token));
    return this;
  }

  either(ruleCbs: callback[]) {
    this.$["OR"](ruleCbs.map(rule => ({ ALT: rule })));
    return this;
  }

  consumeEither(tokens: string[]) {
    this.$["OR"](tokens.map(token => ({ ALT: () => this.consume(token) })));
    return this;
  }

  subruleEither(subrules: any[]) {
    this.$["OR"](
      subrules.map(rule => {
        const opts = {
          LABEL: rule.label,
          ...rule.opts
        };
        return { ALT: () => this.subrule(rule.name, opts) };
      })
    );
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

  manySub(rule: any, opts: any = {}) {
    this.$["MANY"](() => this.subrule(rule, opts));
    return this;
  }

  manyOfEither(rules: IRule[]) {
    this.many(() => {
      this.either(rules);
    });
    return this;
  }
}
