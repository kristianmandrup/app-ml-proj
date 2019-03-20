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
      $.consumes(["workflow", ":", "<string>"]);
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
      $.consumes(["trigger", ":", "<string>"]);
    });
    return this;
  }

  inputRules() {
    const { $ } = this;
    $.ruleFor("inputsExpression", () => {
      $.consumes(["inputs", ":"]);
      $.subrule("primaryExpression", { LABEL: "primary" });
      $.many(() => {
        $.subrule("otherExpression", { LABEL: "other" });
      });
    });

    $.ruleFor("primaryExpression", () => {
      $.consumes(["primary", ":", "<string>"]);
    });

    $.ruleFor("otherExpression", () => {
      $.consumes(["other", ":", "<string>"]);
    });

    return this;
  }

  outputRules() {
    const { $ } = this;
    $.ruleFor("outputsExpression", () => {
      $.consumes(["outputs", ":"]);
      $.subrule("successExpression", { LABEL: "success" });
      $.subrule("errorExpression", { LABEL: "error" });
    });

    $.ruleFor("successExpression", () => {
      $.consumes(["success", ":"]);
      $.subrule("dataBodyExpression", { LABEL: "dataBody" });
    });

    $.ruleFor("errorExpression", () => {
      $.consumes(["error", ":"]);
      $.subrule("dataBodyExpression", { LABEL: "dataBody" });
    });

    return this;
  }

  effectRules() {
    const { $ } = this;
    $.ruleFor("effectsExpression", () => {
      $.consumes(["effects", ":"]);
      $.many(() => {
        $.subrule("sendExpression", { LABEL: "send" });
      });
    });

    $.ruleFor("eventExpression", () => {
      $.consumes(["event", ":", "<string>"]);
    });

    $.ruleFor("sendExpression", () => {
      $.consumes(["send", ":", "<string>"]);
    });

    return this;
  }

  dependencyRules() {
    const { $ } = this;
    $.ruleFor("dependenciesExpression", () => {
      $.consumes(["dependencies", ":"]);
      $.subrule("identifiersExpression", { LABEL: "ids" });
    });
    return this;
  }

  identifierRules() {
    const { $ } = this;
    $.ruleFor("multipleIdentifiersExpression", () => {
      $.manySeparatedBy("and", () => {
        $.subrule("nestedIdentifierExpression", { LABEL: "nestedId" });
      });
    });

    $.ruleFor("identifiersExpression", () => {
      $.atLeastOneSeparatedBy(":", () => {
        $.consume("<ID>");
      });
    });

    $.ruleFor("nestedIdentifierExpression", () => {
      $.many(() => {
        $.consume("<ID>");
      });
    });
  }
}
// wrapping it all together
// reuse the same parser instance.
const parser = new WorkflowParser(allTokens, tokenMap);
