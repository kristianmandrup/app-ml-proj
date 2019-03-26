import { createParsx, createParser, AndToken } from "./test-helpers";
import { Parsx } from "..";

describe("Parsx", () => {
  describe("lookupAlias", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("no alias - undefined", () => {
      expect(parsx.lookupAlias("v")).toBeUndefined();
    });

    test("find alias - name", () => {
      expect(parsx.lookupAlias(":")).toBeDefined();
    });
  });

  describe("lookupToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("no token - undefined", () => {
      expect(() => parsx.lookupToken("v")).toBeUndefined();
    });

    test("find named token - token", () => {
      expect(parsx.lookupToken(":")).toBeDefined();
    });
  });

  describe("normalizeName", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("<string> - String (special)", () => {
      expect(parsx.normalizeName("<string>")).toEqual("String");
    });

    test(": - Colon (alias)", () => {
      expect(parsx.normalizeName(":")).toEqual("Colon");
    });

    test("colon - colon (unchanged)", () => {
      expect(parsx.normalizeName("colon")).toEqual("colon");
    });
  });

  describe("normalizeName", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("colon - Colon", () => {
      expect(parsx.capTokenName("colon")).toEqual("Colon");
    });

    test(": - Colon", () => {
      expect(parsx.capTokenName(":")).toEqual("Colon");
    });
  });

  describe("getToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("x - token x", () => {
      expect(parsx.getToken("and")).toBe(AndToken);
    });

    test("unknown - throws", () => {
      expect(() => parsx.getToken("oops")).toThrow();
    });
  });

  describe("noToken", () => {
    const parser = createParser();
    const parsx = createParsx(parser);

    test("name - throws", () => {
      expect(() => parsx.noToken("oops")).toThrow();
    });
  });
});
