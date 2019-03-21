import { Lexer } from "chevrotain";
import { ITokenOpts } from "../interfaces";
import { createLitToken } from "./lit-token";

const defaultNameMap = {
  integer: "Number",
  number: "Number",
  decimal: "Decimal",
  float: "Decimal",
  string: "String",
  text: "String",
  id: "Id",
  identifier: "Id",
  space: "Whitespace",
  whitespace: "Whitespace"
};

const nameFor = (name: string) => {
  return defaultNameMap[name];
};

export const createNumber = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("number");
  opts.pattern = opts.pattern || /-?[1-9]\d*/;
  return createLitToken(opts);
};

export const createDecimal = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("decimal");
  opts.pattern = opts.pattern || /-?(0|([1-9]\d*))\.(\d+)?/;
  return createLitToken(opts);
};

export const createId = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("id");
  if (opts.upcase) {
    return createIdFirstUpperCase(opts);
  }
  if (opts.lowcase) {
    return createIdFirstLowerCase(opts);
  }

  opts.pattern = opts.pattern || /[a-zA-z_]\w+/;
  return createLitToken(opts);
};

export const createIdFirstUpperCase = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("id");
  opts.pattern = opts.pattern || /[A-Z_]\w+/;
  return createLitToken(opts);
};

export const createIdFirstLowerCase = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("id");
  opts.pattern = opts.pattern || /[a-z_]\w+/;
  return createLitToken(opts);
};

export const createString = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("string");
  opts.pattern =
    opts.pattern || /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/;
  return createLitToken(opts);
};

export const createWhitespace = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || nameFor("space");
  opts.pattern = opts.pattern || /\s+/;
  opts.group = Lexer.SKIPPED;
  return createLitToken(opts);
};
