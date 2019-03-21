import { ITokenOpts } from "../interfaces";
import { createLitTokens, createLitToken } from ".";

const typeLitName = (name: string) => {
  return `${name}Type`;
};

export const typeTokenName = (name: string) => ({
  name: typeLitName(name),
  match: name
});

// const typeTokenNames = (names: string[]) => names.map(typeTokenName);

export const createTypeTokens = (names: string[], opts: ITokenOpts = {}) => {
  return names.map(name => createTypeToken(name, opts));
};

export const createTypeToken = (name: string, opts: ITokenOpts = {}) => {
  return createLitToken({ ...typeTokenName(name), ...opts });
};
