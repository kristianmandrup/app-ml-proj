import * as factories from "./special";
import { isString, camelize } from "../util";

export const createSpecialLits = (items: any[]) => {
  return items.map(createSpecialLit);
};

export const createSpecialLit = (item: any, opts: any = {}) => {
  const name = isString(item) ? item : item.name;
  const factoryName = `create${camelize(name)}Lit`;
  const method = factories[factoryName];
  if (!method) {
    throw `Missing factory method ${factoryName}`;
  }
  return method(opts);
};
