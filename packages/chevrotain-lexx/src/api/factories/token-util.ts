import { isString } from "../util";
import { isObject } from "util";

export const extractName = (item: any) => {
  if (!isObject(item) || isString(item)) {
    invalidItem(item);
  }
  return item.name || missingName(item);
};

const invalidItem = (item: any) => {
  throw `${item} invalid - must be a string or object, was: ${typeof item}`;
};

const missingName = (item: any) => {
  throw `${item} missing name`;
};
