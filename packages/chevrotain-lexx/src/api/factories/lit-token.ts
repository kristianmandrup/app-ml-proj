import { createToken } from "chevrotain";
import {
  stringify,
  isObject,
  camelize,
  isString,
  isRegExp,
  regExpFor
} from "../util";
import { ITokenOpts } from "../interfaces";
import { extractName } from "./token-util";
import { isFunction } from "@babel/types";

// name, label, categories, pattern
export const createLitToken = (opts: any = {}) => {
  if (!isObject(opts)) {
    throw `Invalid token opts: ${typeof opts} ${opts}`;
  }
  let name = opts.name;
  if (!name) {
    throw `Missing name in opts: ${name} in ${stringify(opts)}`;
  }
  name = camelize(name);
  opts.name = name;
  const token = createToken(opts);
  const { addToken } = opts;
  addToken && addToken(name, token);
  return token;
};

export const createLitTokens = (items: ITokenItem[], opts: ITokenOpts = {}) => {
  return items.map(item => {
    let { name, pattern, match } = extractTokenOpts(item);
    const $pattern = pattern || match;
    pattern = regExpFor($pattern);
    if (!isRegExp(pattern)) {
      throw `createLitTokens: pattern must be a RegExp, was: ${$pattern} type ${typeof pattern} obj: ${pattern} constructor: ${
        pattern.constructor.name
      }`;
    }
    const tokenOpts = {
      name,
      pattern,
      ...opts
    };
    return createLitToken(tokenOpts);
  });
};

type ITokenItem = string | ITokenOpts;

export const stringToTokenOpts = (item: string, opts: any = {}) => {
  if (!isString(item)) {
    throw `stringToTokenOpts: expected a string, was: ${item}`;
  }
  if (item === "") {
    throw `stringToTokenOpts: empty string`;
  }

  let name = item;
  let pattern = new RegExp(item);
  if (isFunction(opts.tokenName)) {
    name = opts["tokenName"](name);
  }
  return { name, pattern };
};

export const extractTokenOpts = (
  item: ITokenItem,
  opts: any = {}
): ITokenOpts => {
  return isString(item)
    ? stringToTokenOpts(item as string, opts)
    : extractName(item);
};
