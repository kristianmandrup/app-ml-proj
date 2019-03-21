import { createMatchesAny, orderTokens, orderTokenMap } from "./order";

describe("order", () => {
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

  describe("orderTokens", () => {
    test("orders", () => {
      const maps = {
        types: {
          invalid: true,
          valid: true,
          validate: true
        },
        id: true
      };
      const order = ["types", "id"];
      expect(orderTokens(order, maps)).toEqual([
        "invalid",
        "validate",
        "valid",
        "id"
      ]);
    });
  });
});
