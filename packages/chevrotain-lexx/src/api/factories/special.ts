import { Lexer } from "chevrotain";
import { ITokenOpts } from "../interfaces";
import { createLitToken } from "./lit-token";

export const createNumberLit = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || "NumberLit";
  opts.pattern = opts.pattern || /-?[1-9]\d*/;
  return createLitToken(opts);
};

export const createDecimalLit = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || "DecimalLit";
  opts.pattern = opts.pattern || /-?(0|([1-9]\d*))\.(\d+)?/;
  return createLitToken(opts);
};

export const createIdLit = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || "IdLit";
  opts.pattern = opts.pattern || /[a-zA-z_]\w+/;
  return createLitToken(opts);
};

export const createStringLit = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || "StringLit";
  opts.pattern =
    opts.pattern || /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/;
  return createLitToken(opts);
};

export const createWhiteSpace = (opts: ITokenOpts = {}) => {
  opts.name = opts.name || "WhiteSpace";
  opts.pattern = opts.pattern || /\s+/;
  opts.group = Lexer.SKIPPED;
  return createLitToken(opts);
};
