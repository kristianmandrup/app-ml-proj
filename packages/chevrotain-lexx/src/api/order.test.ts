import {
  createMatchesAny,
  // orderTokens,
  orderTokenList,
  orderTokenMap,
  orderTokensBy
} from "./order";

describe("order", () => {
  describe("createMatchesAny", () => {
    const matchAny = createMatchesAny(["valid", "invalid"]);

    describe("valid,invalid", () => {
      test("valid matches invalid", () => {
        expect(matchAny("valid")).toBeFalsy();
      });

      test("invalid matches none (only self)", () => {
        expect(matchAny("invalid")).toEqual("valid");
      });
    });
  });
  describe("orderTokenMap", () => {
    test("conflicts", () => {
      const tokenMap = {
        invalid: true,
        valid: true,
        validate: true
      };
      expect(orderTokenMap(tokenMap)).toEqual(["invalid", "validate", "valid"]);
    });
  });

  describe("orderTokenList", () => {
    test("conflicts", () => {
      const tokens = ["invalid", "valid", "validate"];
      expect(orderTokenList(tokens)).toEqual(["invalid", "validate", "valid"]);
    });
  });

  describe("orderTokensBy", () => {
    test("orders: map", () => {
      const maps = {
        types: {
          invalid: true,
          valid: true,
          validate: true
        },
        id: true
      };
      const order = ["types", "id"];
      expect(orderTokensBy(order, maps)).toEqual([
        "invalid",
        "validate",
        "valid",
        "id"
      ]);
    });

    test("orders: list", () => {
      const maps = {
        types: ["invalid", "valid", "validate"],
        id: true
      };
      const order = ["types", "id"];
      expect(orderTokensBy(order, maps)).toEqual([
        "invalid",
        "validate",
        "valid",
        "id"
      ]);
    });
  });
});
