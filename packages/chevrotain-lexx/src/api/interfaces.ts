export interface IStrMap {
  [key: string]: any;
}

export type ITokenOpts = IStrMap;

export interface ITokenMap {
  [key: string]: boolean | ITokenOpts;
}

export type TokenMaps = IStrMap;
