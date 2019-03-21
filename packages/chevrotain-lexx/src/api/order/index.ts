import { ITokenMap, TokenMaps } from "../interfaces";

const keysOf = Object.keys;

export const createMatchesAny = (litTokens: string[]) => {
  return litToken => {
    let found;
    const tokenFound = litTokens.find(matchTok => {
      if (matchTok === litToken) return false;
      // const matches = new RegExp(litToken).test(matchTok);
      const matches = new RegExp(matchTok).test(litToken);
      if (!matches) return false;
      // found = litToken; // matchTok;
      found = matchTok;
      return true;
    });
    // console.log({ litToken, found, tokenFound });
    return found || false;
  };
};

export const orderTokenMap = (litTokenMap: ITokenMap) => {
  const litTokens = keysOf(litTokenMap);
  const matchesAny = createMatchesAny(litTokens);
  const lastTokens = new Set();
  litTokens.map(litToken => {
    const matchedTokenKey = matchesAny(litToken);
    if (matchedTokenKey) {
      delete litTokenMap[matchedTokenKey];
      lastTokens.add(matchedTokenKey);
    }
  });
  const keys = keysOf(litTokenMap);
  const lastValues = Array.from(lastTokens);
  return keys.concat(lastValues);
};

export const orderTokens = (tokenMapOrder: string[], tokenMaps: TokenMaps) => {
  // literalsOrder
  return tokenMapOrder.reduce((acc, name) => {
    const tokenMap = tokenMaps[name];
    if (tokenMap) {
      if (tokenMap === true) {
        acc = acc.concat(name);
        return acc;
      }
      const orderedTokens = orderTokenMap(tokenMap);
      acc = acc.concat(orderedTokens);
    }
    return acc;
  }, []);
};
