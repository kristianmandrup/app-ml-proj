import { Parsx } from "chevrotain-parsx/src/api/parsx";

export class StringDataParser {
  $: Parsx;

  stringRules() {
    const { $ } = this;
    $.ruleFor("stringTypeExpression", () => {
      $.consumeEither(["TextType", "StringType"]);
    });
  }

  thenStringConstraintRule() {
    const { $ } = this;
    $.ruleFor("stringThenConstraintExpression", () => {
      $.consume("Then");
      $.subruleEither([
        { name: "stringThenDigitsExpression", label: "digits" }
      ]);
    });
  }

  withStringRule() {
    const { $ } = this;
    $.ruleFor("withStringExpression", () => {
      $.consumes(["with", "<string>"]);
    });
  }

  positionRule() {
    const { $ } = this;
    $.ruleFor("positionExpression", () => {
      $.consumeEither(["starting", "ending"]);
    });
  }

  stringConstraintRule() {
    const { $ } = this;
    $.ruleFor("stringConstraintExpression", () => {
      $.subrule("stringTypeExpression", { LABEL: "stringType" });
      $.optional(() => {
        $.subrule("positionExpression", { LABEL: "pos" });
        $.subrule("withStringExpression", { LABEL: "with" });
        $.subrule("stringOptThenExpression", { LABEL: "optThen" });
      });
    });
  }

  stringOptionalThenRule() {
    const { $ } = this;
    $.ruleFor("stringOptThenExpression", () => {
      $.optional(() => {
        $.subrule("stringThenConstraintExpression", { LABEL: "then" });
      });
    });
  }
}
