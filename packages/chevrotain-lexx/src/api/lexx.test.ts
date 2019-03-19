import { Lexx } from "./lexx";
import { TextDecoder } from "util";

const keysOf = Object.keys;
describe("Lexx", () => {
  describe("create", () => {
    test("no opts", () => {
      expect(new Lexx()).toBeDefined();
    });

    test("with opts", () => {
      expect(new Lexx({ x: 2 })).toBeDefined();
    });
  });

  describe("instance", () => {
    const lexx = new Lexx();

    describe("defaultOpts", () => {
      const opts = lexx.defaultOpts;
      test("keys", () => {
        expect(keysOf(opts)).toContain(["addToken", "tokenName"]);
      });
    });

    describe("optsFor", () => {
      test("no opts - default", () => {
        const opts = {};
        expect(keysOf(lexx.optsFor(opts))).toContain(["addToken", "tokenName"]);
      });

      test("some opts - default + some", () => {
        const opts = {
          x: 2
        };
        expect(keysOf(lexx.optsFor(opts))).toContain([
          "addToken",
          "tokenName",
          "x"
        ]);
      });
    });

    describe("createLitToken", () => {
      test("no opts", () => {
        const name = ["and"];
        const token = lexx.createLitToken({ name });
        expect(token).toBeDefined();
      });
    });

    describe("createLitTokens", () => {
      test("no opts", () => {
        const names = ["and", "or"];
        const tokens = lexx.createLitTokens(names);
        expect(tokens).toBeDefined();
      });
    });

    describe("createTypeToken", () => {
      test("no opts", () => {
        const name = ["and"];
        const token = lexx.createLitToken({ name });
        expect(token).toBeDefined();
      });
    });

    describe("createTypeTokens", () => {
      test("no opts", () => {
        const names = ["decimal", "number"];
        const tokens = lexx.createTypeTokens(names);
        expect(tokens).toBeDefined();
      });

      test("invalid type opts", () => {
        const names = ["decimal", "unknown"];
        expect(() => lexx.createTypeTokens(names)).toThrow();
      });
    });
  });
});
