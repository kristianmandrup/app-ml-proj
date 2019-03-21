import { TokenMaps } from "./interfaces";
import { isObject, isArray } from "./util";

const keysOf = Object.keys;

export const createMatchesAny = (litTokens: string[]) => {
  return litToken => {
    let found;
    litTokens.find(matchTok => {
      if (matchTok === litToken) return false;
      const matches = new RegExp(matchTok).test(litToken);
      if (!matches) return false;
      found = matchTok;
      return true;
    });
    return found || false;
  };
};

const removeFromArr = (arr, value) => arr.filter(item => item !== value);

export const orderTokenList = (tokens: any) => {
  if (isObject(tokens)) return orderTokenMap(tokens);
  let litTokens = tokens;
  const matchesAny = createMatchesAny(litTokens);
  const lastTokens = new Set();
  [...litTokens].map(litToken => {
    const matchedTokenKey = matchesAny(litToken);
    if (matchedTokenKey) {
      litTokens = removeFromArr(litTokens, matchedTokenKey);
      lastTokens.add(matchedTokenKey);
    }
  });
  const lastValues = Array.from(lastTokens);
  return litTokens.concat(lastValues);
};

export const orderTokenMap = (tokens: any) => {
  if (isArray(tokens)) return orderTokenList(tokens);
  const tokenKeys = keysOf(tokens);
  return orderTokenList(tokenKeys);
};

export const orderTokens = (tokens: any) => {
  return isArray(tokens) ? orderTokenList(tokens) : orderTokenMap(tokens);
};

export const orderTokensBy = (
  tokenMapOrder: string[],
  tokenMaps: TokenMaps
) => {
  // literalsOrder
  return tokenMapOrder.reduce((acc, name) => {
    const tokenMap = tokenMaps[name];
    if (tokenMap) {
      if (tokenMap === true) {
        acc = acc.concat(name);
        return acc;
      }
      const orderedTokens = orderTokens(tokenMap);
      acc = acc.concat(orderedTokens);
    }
    return acc;
  }, []);
};
