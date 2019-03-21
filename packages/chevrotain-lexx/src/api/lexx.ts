import * as factories from "./factories";
import { orderTokens } from "./order";
import { isObject } from "./util";

export class Lexx {
  tokenMaps = {
    whiteSpace: false,
    tokens: {},
    numbers: {},
    decimals: {},
    identifiers: false
  };

  tokenOrder = ["whiteSpace", "decimals", "numbers", "tokens", "identifiers"];

  tokenAliasMap = {
    ",": "Comma",
    ":": "Colon",
    ";": "SemiColon",
    "=": "Assign",
    "==": "Equal",
    "!==": "NotEqual",
    "!": "Exclamation",
    "?": "Question",
    "#": "Hash",
    $: "Dollar",
    "&": "And",
    "-": "Minus",
    "+": "Plus",
    "*": "Times",
    "%": "Percent",
    ".": "Dot",
    "@": "Ampersand",
    '"': "DoubleQuote",
    "'": "SingleQuote",
    "`": "BackTick",
    "|": "Pipe",
    _: "Underscore",
    ">": "GreaterThan",
    "<": "LessThan",
    "/": "Forwardslash",
    "\\": "Backslash",
    "(": "LeftParens",
    ")": "RightParens",
    "[": "LeftSquareBracket",
    "]": "RightSquareBracket",
    "{": "LeftCurlyBracket",
    "}": "RightCurlyBracket"
  };

  opts = {};

  constructor(opts: any = {}) {
    if (!isObject(opts)) {
      throw `Invalid opts: ${opts}`;
    }
    const tokenAliasMap = this.tokenAliasMap || {};
    this.opts = {
      ...this.opts,
      ...this.defaultOpts,
      opts
    };
    this.tokenAliasMap = {
      ...this.tokenAliasMap,
      ...tokenAliasMap
    };
  }

  get defaultOpts() {
    return {
      addToken: this.addToken,
      tokenName: this.tokenName
    };
  }

  optsFor = (opts: any = {}) => ({
    ...this.opts,
    opts
  });

  createLitToken(opts = {}) {
    factories.createLitToken(this.optsFor(opts));
  }

  createLitTokens(names, opts: any = {}) {
    factories.createLitTokens(names, this.optsFor(opts));
  }

  createTypeToken(name: string, opts = {}) {
    factories.createTypeToken(name, this.optsFor(opts));
  }

  createTypeTokens(names, opts: any = {}) {
    factories.createTypeTokens(names, this.optsFor(opts));
  }

  createSpecialLits(names: string[]) {
    factories.createSpecialLits(names);
  }

  // use order on literals collected
  get allTokens() {
    return orderTokens(this.tokenOrder, this.tokenMaps);
  }

  getTokenAlias(alias: string) {
    const found = this.tokenAliasMap[alias];
    return found ? found : this.noAliasFound(alias);
  }

  noAliasFound(alias: string) {
    throw `No token found for alias: ${alias}`;
  }

  addToken = (name: string, token: string) => {
    this.tokenMaps[name] = token;
  };

  tokenName = token => {
    return this.tokenAliasMap[token];
  };
}
