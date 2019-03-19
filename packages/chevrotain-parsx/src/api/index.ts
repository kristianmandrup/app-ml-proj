import { Parser } from "chevrotain";
import { Parsx } from "./parsx";

export const createParsx = (parser: Parser, opts: any = {}) => {
  return new Parsx(parser, opts);
};
