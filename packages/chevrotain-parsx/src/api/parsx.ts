type callback = () => void;

export interface IParser {
  CONSUME(token: any);
  MANY(callback);
  OR(alts: any[]);
  SUBRULE(rule: any, opts?: any);
  OPTION(callback);
  RULE(name: string, cb: callback);
}

type Rule = any;

export class Parsx {
  tokenMap: any;

  constructor(public parser: IParser, public opts: any = {}) {
    this.tokenMap = opts.tokenMap;
  }

  $ = this.parser;

  getToken(name: string) {
    const token = this.tokenMap[name];
    return token || this.noToken(name);
  }

  noToken(name) {
    throw `No such token registered ${name}`;
  }

  consume = (name: string) => {
    const token = this.getToken(name);
    this.$.CONSUME(token);
  };

  consumes = (names: string[]) => {
    names.map(this.consume);
  };

  ruleFor(name: string, cb: callback) {
    return this.$.RULE(name, cb);
  }

  rule(name: string) {
    return this.$[name];
  }

  subrule(rule: any, opts: any = {}) {
    this.$.SUBRULE(rule, opts);
    return this;
  }

  optional(rule: any) {
    this.$.OPTION(rule);
    return this;
  }

  optionalSub(rule: any) {
    this.$.OPTION(() => this.subrule(rule));
    return this;
  }

  either(rules: Rule[]) {
    this.$.OR(rules.map(rule => ({ ALT: () => rule })));
    return this;
  }

  many(ruleCb: callback) {
    this.$.MANY(ruleCb);
    return this;
  }

  manySub(rule: any) {
    this.$.MANY(() => this.subrule(rule));
    return this;
  }

  manyOfEither(rules: Rule[]) {
    this.many(() => {
      this.either(rules);
    });
    return this;
  }
}
