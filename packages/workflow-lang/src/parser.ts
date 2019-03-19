import { Parser } from "chevrotain";
import { allTokens, tokenMap } from "./lexer";
import { createParsx } from "chevrotain-parsx";
import { Parsx } from "chevrotain-parsx/src/api/parsx";

// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.
export class WorkflowParser extends Parser {
  tokenMap: any;
  $: Parsx;

  constructor(allTokens, tokenMap) {
    super(allTokens);
    this.tokenMap = tokenMap;

    // const $ = this;
    this.$ = createParsx(this);

    this.defaultRule();
    this.workflowRules();
    this.identifierRules();

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
  }

  defaultRule() {
    const { $ } = this;
    $.ruleFor("expression", () => {
      $.manySub("workflowExpression");
    });
  }

  workflowRules() {
    const { $ } = this;

    $.ruleFor("workflowExpression", () => {
      $.consumes(["Workflow", ":", "String"]);
      $.subrule("workflowBodyExpression", { LABEL: "body" });
    });

    $.ruleFor("workflowBodyExpression", () => {
      $.subrule("triggerExpression", { LABEL: "body" });
      $.subrule("inputsExpression", { LABEL: "inputs" });
      $.subrule("outputsExpression", { LABEL: "outputs" });
      $.subrule("effectsExpression", { LABEL: "effects" });
      //   // $.OPTION(() => {
      //   //   $.SUBRULE($.processExpression, { LABEL: "process" });
      //   // });
    });

    this.triggerRules()
      .inputRules()
      .outputRules()
      .effectRules()
      .dependencyRules();
  }

  triggerRules() {
    const { $ } = this;
    $.ruleFor("triggerExpression", () => {
      $.consumes(["Trigger", "Colon", "String"]);
    });
    return this;
  }

  inputRules() {
    const { $ } = this;
    $.ruleFor("inputsExpression", () => {
      $.consumes(["Inputs", "Colon"]);
      $.subrule("primaryExpression", { LABEL: "primary" });
      $.many(() => {
        $.subrule("otherExpression", { LABEL: "other" });
      });
    });

    $.ruleFor("primaryExpression", () => {
      $.consumes(["Primary", "Colon", "String"]);
    });

    $.ruleFor("otherExpression", () => {
      $.consumes(["Other", "Colon", "String"]);
    });

    return this;
  }

  outputRules() {
    const { $ } = this;
    $.ruleFor("outputsExpression", () => {
      $.consumes(["Outputs", "Colon"]);
      $.subrule("successExpression", { LABEL: "success" });
      $.subrule("errorExpression", { LABEL: "error" });
    });

    $.ruleFor("successExpression", () => {
      $.consumes(["Success", "Colon"]);
      $.subrule("dataBodyExpression", { LABEL: "dataBody" });
    });

    $.ruleFor("errorExpression", () => {
      $.consumes(["Error", "Colon"]);
      $.subrule("dataBodyExpression", { LABEL: "dataBody" });
    });

    return this;
  }

  effectRules() {
    const { $ } = this;
    $.ruleFor("effectsExpression", () => {
      $.consumes(["Effects", ":"]);
      $.many(() => {
        $.subrule("sendExpression", { LABEL: "send" });
      });
    });

    $.ruleFor("eventExpression", () => {
      $.consumes(["Event", ":", "String"]);
    });

    $.ruleFor("sendExpression", () => {
      $.consumes(["Send", ":", "String"]);
    });

    return this;
  }

  dependencyRules() {
    const { $ } = this;
    $.ruleFor("dependenciesExpression", () => {
      $.consumes(["Dependencies", ":"]);
      $.subrule("identifiersExpression", { LABEL: "ids" });
    });
    return this;
  }

  identifierRules() {
    const { $ } = this;
    $.ruleFor("multipleIdentifiersExpression", () => {
      $.manySeparatedBy("And", () => {
        $.subrule("nestedIdentifierExpression", { LABEL: "nestedId" });
      });
    });

    $.ruleFor("identifiersExpression", () => {
      $.atLeastOneSeparatedBy(":", () => {
        $.consume("Identifier");
      });
    });

    $.ruleFor("nestedIdentifierExpression", () => {
      $.many(() => {
        $.consume("Identifier");
      });
    });
  }
}
// wrapping it all together
// reuse the same parser instance.
const parser = new WorkflowParser(allTokens, tokenMap);
