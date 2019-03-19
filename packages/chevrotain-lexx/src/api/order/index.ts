import { ITokenMap, TokenMaps } from "../interfaces";

const keysOf = Object.keys;

const createMatchesAny = (litTokens: string[]) => {
  return litToken => {
    return litTokens.find(matchTok => new RegExp(matchTok).test(litToken));
  };
};

export const orderTokenMap = (litTokenMap: ITokenMap) => {
  const litTokens = keysOf(litTokenMap);
  const matchesAny = createMatchesAny(litTokens);
  const last = [];
  litTokens.map(litToken => {
    if (matchesAny(litToken)) {
      delete litTokenMap[litToken];
      last.push(litToken);
    }
  });
  return keysOf(litTokenMap).concat(last);
};

export const orderTokens = (tokenMapOrder: string[], tokenMaps: TokenMaps) => {
  // literalsOrder
  return tokenMapOrder.reduce((acc, name) => {
    const tokenMap = tokenMaps[name];
    if (tokenMap) {
      const orderedTokens = orderTokenMap(tokenMap);
      acc = acc.concat(orderedTokens);
    }
    return acc;
  }, []);
};
