import * as factories from "./special";
import { camelize } from "../util";

export const createSpecialLits = (names: string[]) => {
  return names.map(createSpecialLit);
};

export const createSpecialLit = (name: string) => {
  const factoryName = `create${camelize(name)}Lit`;
  const method = factories[factoryName];
  if (!method) {
    throw `Missing factory method ${factoryName}`;
  }
  return method();
};
