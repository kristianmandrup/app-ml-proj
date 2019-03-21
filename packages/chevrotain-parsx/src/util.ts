import * as camelcase from "lodash.camelcase";
import * as capitalize from "lodash.capitalize";

export { capitalize };

export const camelize = str => capitalize(camelcase(str));
export const isString = val => typeof val === "string";
export const isObject = obj => obj === Object(obj);

export const isRegExp = pattern => pattern instanceof RegExp;
export const regExpFor = pattern =>
  isString(pattern) ? new RegExp(pattern) : pattern;
