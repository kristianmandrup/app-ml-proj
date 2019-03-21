import * as camelcase from "lodash.camelcase";
import * as capitalize from "lodash.capitalize";

export const camelize = str => capitalize(camelcase(str));
export const isString = val => typeof val === "string";

export const isFunction = fun => typeof fun === "function";
export const isArray = Array.isArray;
export const isObject = obj => !isArray(obj) && obj === Object(obj);

export const isRegExp = pattern => pattern instanceof RegExp;
export const regExpFor = pattern => new RegExp(pattern);
export const stringify = JSON.stringify;
