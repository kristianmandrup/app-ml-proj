import { Parsx } from "chevrotain-parsx/src/api/parsx";

export class NumberDataParser {
  $: Parsx;

  numberRules() {
    const { $ } = this;
    $.ruleFor("numberTypeExpression", () => {
      $.consumeEither(["IntegerType", "NumberType"]);
    });
  }

  numberOfDigitsRule() {
    const { $ } = this;
    $.ruleFor("stringThenDigitsExpression", () => {
      $.consumes(["Number", "Digits"]);
    });
  }

  integerConstraintRule() {
    const { $ } = this;
    $.ruleFor("integerConstraintExpression", () => {
      $.subrule("numberTypeExpression", { LABEL: "numberType" });
      $.optional(() => {
        $.consume("between");
        $.subrule("integerBetweenExpression", { LABEL: "between" });
      });
    });
  }

  integerBetweenRule() {
    const { $ } = this;
    $.ruleFor("integerBetweenExpression", () => {
      $.atLeastOneSeparatedBy("and", () => $.consume("Number"));
    });
  }

  decimalBetweenRule() {
    const { $ } = this;
    $.ruleFor("decimalBetweenExpression", () => {
      $.atLeastOneSeparatedBy("and", () => $.consume("Decimal"));
    });
  }

  decimalConstraintRule() {
    const { $ } = this;
    $.ruleFor("decimalConstraintExpression", () => {
      $.consume("decimal");
      $.optional(() => {
        $.consume("between");
        $.subrule("decimalBetweenExpression", { LABEL: "between" });
      });
    });
  }
}
