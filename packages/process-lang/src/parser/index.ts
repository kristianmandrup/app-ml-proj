import { Parser } from "chevrotain";
import { allTokens } from "../lexer";
import { createParsx } from "chevrotain-parsx";
import { Parsx } from "chevrotain-parsx/src/api/parsx";
import { BaseParser } from "base-lang";
// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.
export class ProcessParser extends Parser {
  $: Parsx;
  baseParser: BaseParser;
  analyse: boolean = true;

  constructor(opts: any = {}) {
    super(opts.tokens || allTokens);
    this.$ = opts.$ || createParsx(this);
    this.analyse = opts.analysis != false;

    this.compose();

    this.baseRules();

    this.defaultRule();

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
  }

  onRulesLoaded() {
    if (!this.analyse) return;
    this.performSelfAnalysis();
  }

  compose() {
    this.baseParser = new BaseParser({ $: this.$ });
  }

  baseRules() {
    this.baseParser.rules();
  }

  defaultRule() {
    const { $ } = this;
    $.ruleFor("expression", () => {
      $.manySub("substepExpression");
    });
  }

  sendRule() {
    const { $ } = this;
    $.ruleFor("sendExpression", () => {
      $.consumes(["Send", "Colon", "String"]);
    });
  }

  toActions() {
    const { $ } = this;
    const add = () => $.consume("Add");
    const send = () => $.consume("Send");

    $.ruleFor("toAction", () => {
      $.either([add, send]);
    });
    return this;
  }

  fromActions() {
    const { $ } = this;
    const Delete = () => $.consume("Delete");
    const Get = () => $.consume("Get");

    $.ruleFor("fromAction", () => {
      $.either([Delete, Get]);
    });
    return this;
  }

  inActions() {
    const { $ } = this;
    const Create = () => $.consume("Create");
    const Update = () => $.consume("Update");
    const Check = () => $.consume("Check");

    $.ruleFor("fromAction", () => {
      $.either([Create, Update, Check]);
    });
    return this;
  }

  actOnRules() {
    const { $ } = this;
    this.toActions()
      .fromActions()
      .inActions();
  }

  actionRules() {
    const { $ } = this;
    $.ruleFor("actionExpression", () => {
      $.subrule("action", { LABEL: "actionLit" });
      $.subrule("multipleIdentifiersExpression", { LABEL: "multiIds" });
    });
  }

  actionRule() {
    const { $ } = this;
    $.ruleFor("action", () => {
      $.consumeEither(["Verify", "Match", "Validate", "Set"]);
    });
  }

  actRules() {
    const { $ } = this;
    $.ruleFor("actToExpression", () => {
      $.subrule("toAction", { LABEL: "actionTo" });
      $.subrule("multipleIdentifiersExpression", { LABEL: "ids" });
      $.optional(() => {
        $.subrule("toExpression", { LABEL: "to" });
      });
    });

    $.ruleFor("toExpression", () => {
      $.consume("To");
      $.subrule("nestedIdentifierExpression", { LABEL: "nestedId" });
    });

    $.ruleFor("actInExpression", () => {
      $.subrule("inAction", { LABEL: "actionIn" });
      $.subrule("multipleIdentifiersExpression", { LABEL: "ids" });
      $.optional(() => {
        $.subrule("inExpression", { LABEL: "in" });
      });
    });

    $.ruleFor("inExpression", () => {
      $.consume("In");
      $.subrule("nestedIdentifierExpression", { LABEL: "nestedId" });
    });

    $.ruleFor("actFromExpression", () => {
      $.subrule("fromAction", { LABEL: "actionFrom" });
      $.subrule("multipleIdentifiersExpression", { LABEL: "ids" });
      $.optional(() => {
        $.subrule("fromExpression", { LABEL: "from" });
      });
    });

    $.ruleFor("fromExpression", () => {
      $.consume("From");
      $.subrule("nestedIdentifierExpression", { LABEL: "nestedId" });
    });
  }

  stopRule() {
    const { $ } = this;
    $.ruleFor("stopExpression", () => {
      $.consume("Stop");
    });
  }

  actionLineRule() {
    const { $ } = this;
    const Action = () => $.subrule("actionExpression");
    const Stop = () => $.subrule("stopExpression");

    $.ruleFor("actionLineExpression", () => {
      $.either([Action, Stop]);
    });
  }

  doRules() {
    const { $ } = this;
    $.ruleFor("doBodyExpression", () => {
      $.manySub("actionLineExpression");
    });
  }

  loopRules() {
    const { $ } = this;
    $.ruleFor("loopExpression", () => {
      $.consumes(["For", "Each", "Identifier", ":"]);
      $.subrule("processBodyExpression", { LABEL: "processBody" });
    });
  }

  processRules() {
    const { $ } = this;
    $.ruleFor("processExpression", () => {
      $.consumes(["Process", ":"]);
      $.subrule("doStepsExpression", { LABEL: "doSteps" });
    });
  }

  subProcessRules() {
    const { $ } = this;
    $.ruleFor("subProcessExpression", () => {
      $.consumes(["Process", ":"]);
      $.subrule("processBodyExpression", { LABEL: "processBody" });
    });
  }

  processBodyRules() {
    const { $ } = this;
    $.ruleFor("processBodyExpression", () => {
      $.either([
        () => $.consume("Todo"),
        () => $.subrule("processBodyLinesExpression", { LABEL: "lines" })
      ]);
    });
  }

  processBodyLineRules() {
    const { $ } = this;
    $.ruleFor("processBodyLinesExpression", () => {
      $.manySub("processBodyLineExpression", { LABEL: "subProcessLines" });
    });

    $.ruleFor("processBodyLineExpression", () => {
      $.subruleEither([
        { name: "actInExpression", label: "actIn" },
        { name: "actFromExpression", label: "actFrom" },
        { name: "actToExpression", label: "actTo" },
        { name: "ifThenElseExpression", label: "if" },
        { name: "loopExpression", label: "loop" },
        { name: "actionExpression", label: "action" }
      ]);
    });
  }

  // use composability = split into sub-parser instances
  identifierRules() {
    this.baseParser.identifierRules();
  }

  returnRules() {
    const { $ } = this;
    $.ruleFor("returnExpression", () => {
      $.consumes(["Return", "Identifier"]);
    });
  }

  stepRules() {
    const { $ } = this;
    $.ruleFor("doStepExpression", () => {
      $.consumes(["Do", "Identifier"]);
      $.optional(() => {
        $.subrule("processBodyExpression", { LABEL: "processBody" });
      });
    });
  }

  validRules() {
    const { $ } = this;
    $.ruleFor("validExpression", () => {
      $.consumeEither(["Valid", "Invalid"]);
    });
  }

  conditionalRules() {
    const { $ } = this;
    $.ruleFor("conditionalExpression", () => {
      $.consume("Identifier");
      $.optional(() => {
        $.consume("Is");
        $.subrule("validExpression", { LABEL: "valid" });
      });
    });
  }

  ifThenElseRules() {
    const { $ } = this;
    $.ruleFor("ifThenElseExpression", () => {
      $.consume("If");
      $.subrule("conditionalExpression", { LABEL: "condition" });
      $.subrule("thenExpression", { LABEL: "then" });
      $.subrule("elseExpression", { LABEL: "else" });
    });

    $.ruleFor("thenExpression", () => {
      $.consume("Then");
      $.subrule("doBodyExpression", { LABEL: "thenBody" });
      $.optional(() => {
        $.subrule("returnExpression", { LABEL: "return" });
      });
    });

    $.ruleFor("elseExpression", () => {
      $.optional(() => {
        $.consume("Else");
        $.subrule("elseBodyExpression", { LABEL: "elseBody" });
      });
    });

    $.ruleFor("elseBodyExpression", () => {
      $.subrule("doBodyExpression", { LABEL: "thenBody" });
      $.optional(() => {
        $.subrule("returnExpression", { LABEL: "return" });
      });
    });
  }

  doStepsRules() {
    const { $ } = this;
    $.ruleFor("doStepsExpression", () => {
      $.manySub("doStepExpression", { LABEL: "doStep" });
    });
  }

  substepRules() {
    const { $ } = this;
    $.ruleFor("substepExpression", () => {
      $.consumes(["Substep", "Identifier", "="]);
      $.subrule("substepBodyExpression", { LABEL: "substepBody" });
    });
  }
}

// wrapping it all together
// reuse the same parser instance.
export const parser = new ProcessParser();
