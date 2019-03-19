import { Parsx } from "./parsx";
import { Parser, createToken } from "chevrotain";

describe("Parsx", () => {
  describe("create", () => {
    test("creates Parsx", () => {
      const token = createToken({
        name: "x",
        pattern: /x/
      });
      const tokens = [token];
      const parser = new Parser(tokens);

      expect(new Parsx(parser)).toBeDefined();
    });
  });
});
