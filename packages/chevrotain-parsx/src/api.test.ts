import { createParsx } from "./api";
import { Parser, createToken } from "chevrotain";

const AndToken = createToken({
  name: "And",
  pattern: /and/
});

const tokens = [AndToken];
const tokenMap = {
  And: AndToken
};

const createParser = (_tokens = tokens) => {
  return new Parser(_tokens);
};

describe("api", () => {
  describe("createParsx", () => {
    test("creates Parsx", () => {
      const tokenMap = {
        invalid: true,
        valid: true,
        validate: true
      };
      const parser = createParser();
      const opts = {
        tokenMap
      };
      expect(createParsx(parser, opts)).toBeDefined();
    });
  });
});
