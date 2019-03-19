import * as chevrotain from "chevrotain";
import { allTokens } from "./lexer";
import { createParsx } from "chevrotain-parsx";
import { Parsx } from "chevrotain-parsx/src/api/parsx";

// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.
export class Parser extends chevrotain.Parser {
  $: Parsx;

  constructor() {
    super(allTokens);
    this.$ = createParsx(this);
    this.defaultRule();

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
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
    // $.RULE("actionExpression", () => {
    //   $.SUBRULE($.action, { LABEL: "actionLit" });
    //   $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "multiIds" });
    // });
  }

  actionRule() {
    // $.RULE("action", () => {
    //   $.OR([
    //     {
    //       ALT: () => $.CONSUME(Verify)
    //     },
    //     {
    //       ALT: () => $.CONSUME(Match)
    //     },
    //     {
    //       ALT: () => $.CONSUME(Validate)
    //     },
    //     {
    //       ALT: () => $.CONSUME(SetLit)
    //     }
    //   ]);
    // });
  }

  actRules() {
    // $.RULE("actToExpression", () => {
    //   $.SUBRULE($.toAction, { LABEL: "actionTo" });
    //   $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
    //   $.OPTION(() => {
    //     $.SUBRULE($.toExpression, { LABEL: "to" });
    //   });
    // });
    // $.RULE("toExpression", () => {
    //   $.CONSUME(ToLit);
    //   $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    // });
    // $.RULE("actInExpression", () => {
    //   $.SUBRULE($.inAction, { LABEL: "actionIn" });
    //   $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
    //   $.OPTION(() => {
    //     $.SUBRULE($.inExpression, { LABEL: "in" });
    //   });
    // });
    // $.RULE("inExpression", () => {
    //   $.CONSUME(InLit);
    //   $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    // });
    // $.RULE("actFromExpression", () => {
    //   $.SUBRULE($.fromAction, { LABEL: "actionFrom" });
    //   $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
    //   $.OPTION(() => {
    //     $.SUBRULE($.fromExpression, { LABEL: "from" });
    //   });
    // });
    // $.RULE("fromExpression", () => {
    //   $.CONSUME(FromLit);
    //   $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    // });
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
    // $.RULE("subProcessExpression", () => {
    //   $.CONSUME(ProcessLiteral);
    //   $.CONSUME(Colon);
    //   $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
    // });
  }

  processBodyRules() {
    // $.RULE("processBodyExpression", () => {
    //   $.OR([
    //     {
    //       ALT: () => $.CONSUME(TodoLit)
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.processBodyLinesExpression, { LABEL: "lines" })
    //     }
    //   ]);
    // });
  }

  processBodyLineRules() {
    // $.RULE("processBodyLinesExpression", () => {
    //   $.MANY(() => {
    //     $.SUBRULE($.processBodyLineExpression, { LABEL: "subProcessLines" });
    //   });
    // });
    // $.RULE("processBodyLineExpression", () => {
    //   $.OR([
    //     {
    //       ALT: () => $.SUBRULE($.actInExpression, { LABEL: "actIn" })
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.actFromExpression, { LABEL: "actFrom" })
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.actToExpression, { LABEL: "actTo" })
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.ifThenElseExpression, { LABEL: "if" })
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.loopExpression, { LABEL: "loop" })
    //     },
    //     {
    //       ALT: () => $.SUBRULE($.actionExpression, { LABEL: "action" })
    //     }
    //   ]);
    // });
  }

  identifierRules() {
    // TODO: call base.identifierRules()
  }

  returnRules() {
    // $.RULE("returnExpression", () => {
    //   $.CONSUME(Return);
    //   $.CONSUME(Identifier);
    // });
  }

  stepRules() {
    // $.RULE("doStepExpression", () => {
    //   $.CONSUME(Do);
    //   $.CONSUME(Identifier);
    //   $.OPTION(() => {
    //     $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
    //   });
    // });
  }

  validRules() {
    // $.RULE("validExpression", () => {
    //   $.OR([
    //     {
    //       ALT: () => $.CONSUME(Valid)
    //     },
    //     {
    //       ALT: () => $.CONSUME(Invalid)
    //     }
    //   ]);
    // });
  }

  conditionalRules() {
    // $.RULE("conditionalExpression", () => {
    //   $.CONSUME(Identifier);
    //   $.OPTION(() => {
    //     $.CONSUME(Is);
    //     $.SUBRULE($.validExpression, { LABEL: "valid" });
    //   });
    // });
  }

  ifThenElseRules() {
    // $.RULE("ifThenElseExpression", () => {
    //   $.CONSUME(If);
    //   $.SUBRULE($.conditionalExpression, { LABEL: "condition" });
    //   $.SUBRULE($.thenExpression, { LABEL: "then" });
    //   $.SUBRULE($.elseExpression, { LABEL: "else" });
    // });
    // $.RULE("thenExpression", () => {
    //   $.CONSUME(Then);
    //   $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
    //   $.OPTION(() => {
    //     $.SUBRULE($.returnExpression, { LABEL: "return" });
    //   });
    // });
    // $.RULE("elseExpression", () => {
    //   $.OPTION(() => {
    //     $.CONSUME(Else);
    //     $.SUBRULE($.elseBodyExpression, { LABEL: "elseBody" });
    //   });
    // });
    // $.RULE("elseBodyExpression", () => {
    //   $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
    //   $.OPTION(() => {
    //     $.SUBRULE($.returnExpression, { LABEL: "return" });
    //   });
    // });
  }

  doStepsRules() {
    // $.RULE("doStepsExpression", () => {
    //   $.MANY(() => {
    //     $.SUBRULE($.doStepExpression, { LABEL: "doStep" });
    //   });
    // });
  }

  substepRules() {
    // $.RULE("substepExpression", () => {
    //   $.CONSUME(Substep);
    //   $.CONSUME(Identifier);
    //   $.CONSUME(Equal);
    //   $.SUBRULE($.substepBodyExpression, { LABEL: "substepBody" });
    // });
  }
}

// wrapping it all together
// reuse the same parser instance.
export const parser = new Parser();
