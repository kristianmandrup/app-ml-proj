import * as factories from "./special";
import { isString, isObject, camelize } from "../util";
import { extractName } from "./token-util";

export const createSpecialLits = (items: any[]) => {
  return items.map(item => createSpecialLit(item));
};

export const createSpecialLit = (item: any, opts: any = {}) => {
  let name = isString(item) ? item : extractName(item);
  name = name.match(/space/) ? "Whitespace" : name;
  const factoryName = `create${camelize(name)}`;
  const methods = Object.keys(factories);
  if (!methods) {
    throw "Missing factory methods";
  }
  const method = factories[factoryName];
  if (!method) {
    throw `Missing factory method ${factoryName}: ${methods}`;
  }
  if (!isObject(opts)) {
    throw `Invalid opts: ${opts} for item: ${item}`;
  }
  return method(opts);
};
