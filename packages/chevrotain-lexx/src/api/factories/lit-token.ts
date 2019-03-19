import { createToken } from "chevrotain";
import { camelize, isString, isRegExp, regExpFor } from "../util";
import { ITokenOpts } from "../interfaces";

// name, label, categories, pattern
export const createLitToken = opts => {
  let { name } = opts;
  name = camelize(name);
  opts.name = name;
  const token = createToken(opts);
  const { addToken } = opts;
  addToken && addToken(name, token);
  return token;
};

export const createLitTokens = (items: ITokenItem[], opts: ITokenOpts = {}) => {
  items.map(item => {
    let { name, pattern, match } = extractTokenOpts(item);
    pattern = pattern || match;
    pattern = regExpFor(pattern);
    if (!isRegExp(pattern)) {
      throw `createLitTokens: pattern must be a RegExp, was: ${pattern}`;
    }
    opts = {
      name,
      pattern,
      ...opts
    };
    createLitToken(opts);
  });
};

type ITokenItem = string | ITokenOpts;

const stringToTokenOpts = (item: ITokenItem, opts: any = {}) => {
  if (!isString(item)) {
    throw `stringToTokenOpts: expected a string, was: ${item}`;
  }
  let name = item;
  let pattern = item;
  const { tokenName } = opts;
  name = (tokenName && tokenName(name)) || name;
  return { name, pattern };
};

const extractTokenOpts = (item: ITokenItem, opts: any = {}): ITokenOpts => {
  return isString(item) ? stringToTokenOpts(item, opts) : (item as ITokenOpts);
};
