import { Parsx, IParser } from "./parsx";

export const createParsx = (parser: IParser, opts: any = {}) => {
  return new Parsx(parser, opts);
};
