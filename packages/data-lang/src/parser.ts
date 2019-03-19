"use strict";
/**
 * An Example of implementing a Calculator with separated grammar and semantics (actions).
 * This separation makes it easier to maintain the grammar and reuse it in different use cases.
 *
 * This is accomplished by using the automatic CST (Concrete Syntax Tree) output capabilities
 * of chevrotain.
 *
 * See farther details here:
 * https://github.com/SAP/chevrotain/blob/master/docs/concrete_syntax_tree.md
 */
// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.

import { Parser } from "chevrotain";
import { allTokens } from "./lexer";

export class CalculatorPure extends Parser {
  constructor() {
    super(allTokens);

    const $ = this;

    $.RULE("expression", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.workflowExpression) },
          { ALT: () => $.SUBRULE($.domainExpression) },
          { ALT: () => $.SUBRULE($.substepExpression) }
        ]);
      });
    });

    $.RULE("triggerExpression", () => {
      $.CONSUME(TriggerLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("inputsExpression", () => {
      $.CONSUME(InputsLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.primaryExpression, { LABEL: "primary" });
      $.MANY(() => {
        $.SUBRULE($.otherExpression, { LABEL: "other" });
      });
    });

    $.RULE("sendExpression", () => {
      $.CONSUME(Send);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("toAction", () => {
      $.OR([{ ALT: () => $.CONSUME(Add) }, { ALT: () => $.CONSUME(Send) }]);
    });

    $.RULE("fromAction", () => {
      $.OR([
        { ALT: () => $.CONSUME(Delete) },
        { ALT: () => $.CONSUME(GetLit) }
      ]);
    });

    $.RULE("inAction", () => {
      $.OR([
        { ALT: () => $.CONSUME(Create) },
        { ALT: () => $.CONSUME(Update) },
        {
          ALT: () => $.CONSUME(Check)
        }
      ]);
    });

    $.RULE("actToExpression", () => {
      $.SUBRULE($.toAction, { LABEL: "actionTo" });
      $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
      $.OPTION(() => {
        $.SUBRULE($.toExpression, { LABEL: "to" });
      });
    });

    $.RULE("actInExpression", () => {
      $.SUBRULE($.inAction, { LABEL: "actionIn" });
      $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
      $.OPTION(() => {
        $.SUBRULE($.inExpression, { LABEL: "in" });
      });
    });

    $.RULE("actFromExpression", () => {
      $.SUBRULE($.fromAction, { LABEL: "actionFrom" });
      $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
      $.OPTION(() => {
        $.SUBRULE($.fromExpression, { LABEL: "from" });
      });
    });

    $.RULE("inExpression", () => {
      $.CONSUME(InLit);
      $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    });

    $.RULE("toExpression", () => {
      $.CONSUME(ToLit);
      $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    });

    $.RULE("fromExpression", () => {
      $.CONSUME(FromLit);
      $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
    });

    $.RULE("effectsExpression", () => {
      $.CONSUME(EffectsLiteral);
      $.CONSUME(Colon);
      $.MANY(() => {
        $.SUBRULE($.sendExpression, { LABEL: "send" });
      });
    });

    $.RULE("eventsExpression", () => {
      $.MANY(() => {
        $.SUBRULE($.eventExpression, { LABEL: "event" });
      });
    });

    $.RULE("outputsExpression", () => {
      $.CONSUME(OutputsLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.successExpression, { LABEL: "success" });
      $.SUBRULE($.errorExpression, { LABEL: "error" });
    });

    $.RULE("successExpression", () => {
      $.CONSUME(SuccessLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
    });

    $.RULE("errorExpression", () => {
      $.CONSUME(ErrorLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
    });

    $.RULE("stopExpression", () => {
      $.CONSUME(Stop);
    });

    $.RULE("actionLineExpression", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.actionExpression) },
        { ALT: () => $.SUBRULE($.stopExpression) }
      ]);
    });

    $.RULE("doBodyExpression", () => {
      $.MANY(() => {
        $.SUBRULE($.actionLineExpression, { LABEL: "actionLine" });
      });
    });

    $.RULE("eventExpression", () => {
      $.CONSUME(EventLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("primaryExpression", () => {
      $.CONSUME(PrimaryLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("otherExpression", () => {
      $.CONSUME(OtherLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("boundedContextExpression", () => {
      $.CONSUME(BoundedContextLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
    });

    $.RULE("dataExpression", () => {
      $.CONSUME(DataLiteral);
      $.CONSUME(Identifier);
      $.CONSUME(Equal);
      $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
    });

    $.RULE("numberTypeExpression", () => {
      $.OR([
        {
          ALT: () => $.CONSUME(IntegerTypeLiteral)
        },
        {
          ALT: () => $.CONSUME(NumberTypeLiteral)
        }
      ]);
    });

    $.RULE("stringTypeExpression", () => {
      $.OR([
        {
          ALT: () => $.CONSUME(TextTypeLiteral)
        },
        {
          ALT: () => $.CONSUME(StringTypeLiteral)
        }
      ]);
    });

    $.RULE("andDataBodyExpression", () => {
      $.CONSUME(And);
      $.OPTION(() => $.CONSUME(ListOfLiteral));
      $.CONSUME(Identifier);
    });

    $.RULE("orDataBodyExpression", () => {
      $.CONSUME(Or);
      $.CONSUME(Identifier);
    });

    $.RULE("stringThenDigitsExpression", () => {
      $.CONSUME(NumberLiteral);
      $.CONSUME(Digits);
    });

    $.RULE("stringThenConstraintExpression", () => {
      $.CONSUME(Then);
      $.OR([
        {
          ALT: () =>
            $.SUBRULE($.stringThenDigitsExpression, { LABEL: "digits" })
        }
      ]);
    });

    $.RULE("withStringExpression", () => {
      $.CONSUME(WithLiteral);
      $.CONSUME(StringLiteral);
    });

    $.RULE("positionExpression", () => {
      $.OR([
        { ALT: () => $.CONSUME(StartingLiteral) },
        { ALT: () => $.CONSUME(EndingLiteral) }
      ]);
    });

    $.RULE("stringConstraintExpression", () => {
      $.SUBRULE($.stringTypeExpression, { LABEL: "stringType" });
      $.OPTION(() => {
        $.SUBRULE($.positionExpression, { LABEL: "pos" });
        $.SUBRULE($.withStringExpression, { LABEL: "with" });
        $.SUBRULE($.stringOptThenExpression, { LABEL: "optThen" });
      });
    });

    $.RULE("stringOptThenExpression", () => {
      $.OPTION(() => {
        $.SUBRULE($.stringThenConstraintExpression, { LABEL: "then" });
      });
    });

    $.RULE("integerConstraintExpression", () => {
      $.SUBRULE($.numberTypeExpression, { LABEL: "numberType" });
      $.OPTION(() => {
        $.CONSUME(BetweenLiteral);
        $.SUBRULE($.integerBetweenExpression, { LABEL: "between" });
      });
    });

    $.RULE("integerBetweenExpression", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: AndLiteral,
        DEF: () => {
          $.CONSUME(NumberLiteral);
        }
      });
    });

    $.RULE("decimalBetweenExpression", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: AndLiteral,
        DEF: () => {
          $.CONSUME(DecimalLiteral);
        }
      });
    });

    $.RULE("decimalConstraintExpression", () => {
      $.CONSUME(DecimalTypeLiteral);
      $.OPTION(() => {
        $.CONSUME(BetweenLiteral);
        $.SUBRULE($.decimalBetweenExpression, { LABEL: "between" });
      });
    });

    $.RULE("moreDataBodyExpression", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.andDataBodyExpression, { LABEL: "and" }) },
          { ALT: () => $.SUBRULE($.orDataBodyExpression, { LABEL: "or" }) }
        ]);
      });
    });

    $.RULE("dataIdentityExpression", () => {
      $.CONSUME(Identifier);
      $.SUBRULE($.moreDataBodyExpression, { LABEL: "and" });
    });

    $.RULE("dataConstraintExpression", () => {
      $.OR([
        {
          ALT: () =>
            $.SUBRULE($.integerConstraintExpression, { LABEL: "integer" })
        },
        {
          ALT: () =>
            $.SUBRULE($.decimalConstraintExpression, { LABEL: "decimal" })
        },
        {
          ALT: () =>
            $.SUBRULE($.stringConstraintExpression, { LABEL: "string" })
        }
      ]);
    });

    $.RULE("dataBodyExpression", () => {
      $.OR([
        {
          ALT: () => $.SUBRULE($.dataIdentityExpression, { LABEL: "idExpr" })
        },
        {
          ALT: () =>
            $.SUBRULE($.dataConstraintExpression, { LABEL: "constraint" })
        }
      ]);
    });

    $.RULE("domainExpression", () => {
      $.SUBRULE($.boundedContextExpression, { LABEL: "context" });
      $.MANY(() => {
        $.SUBRULE($.dataExpression, { LABEL: "dataType" });
      });
    });

    $.RULE("workflowBodyExpression", () => {
      $.SUBRULE($.triggerExpression, { LABEL: "body" });
      $.SUBRULE($.inputsExpression, { LABEL: "inputs" });
      $.SUBRULE($.outputsExpression, { LABEL: "outputs" });
      $.SUBRULE($.effectsExpression, { LABEL: "effects" });
      $.OPTION(() => {
        $.SUBRULE($.processExpression, { LABEL: "process" });
      });
    });

    $.RULE("substepBodyExpression", () => {
      $.SUBRULE($.inputExpression, { LABEL: "input" });
      $.SUBRULE($.outputExpression, { LABEL: "output" });
      $.SUBRULE($.dependenciesExpression, { LABEL: "dependencies" });
      $.SUBRULE($.subProcessExpression, { LABEL: "subProcess" });
    });

    $.RULE("inputExpression", () => {
      $.CONSUME(Input);
      $.CONSUME(Colon);
      $.CONSUME(Identifier);
    });

    $.RULE("outputExpression", () => {
      $.CONSUME(Output);
      $.CONSUME(Colon);
      $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
    });

    $.RULE("dependenciesExpression", () => {
      $.CONSUME(Dependencies);
      $.CONSUME(Colon);
      $.SUBRULE($.identifiersExpression, { LABEL: "ids" });
    });

    $.RULE("loopExpression", () => {
      $.CONSUME(For);
      $.CONSUME(Each);
      $.CONSUME(Identifier);
      $.CONSUME(Colon);
      $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
    });

    $.RULE("processExpression", () => {
      $.CONSUME(ProcessLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.doStepsExpression, { LABEL: "doSteps" });
    });

    $.RULE("subProcessExpression", () => {
      $.CONSUME(ProcessLiteral);
      $.CONSUME(Colon);
      $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
    });

    $.RULE("processBodyExpression", () => {
      $.OR([
        {
          ALT: () => $.CONSUME(TodoLit)
        },
        {
          ALT: () => $.SUBRULE($.processBodyLinesExpression, { LABEL: "lines" })
        }
      ]);
    });

    $.RULE("processBodyLinesExpression", () => {
      $.MANY(() => {
        $.SUBRULE($.processBodyLineExpression, { LABEL: "subProcessLines" });
      });
    });

    $.RULE("processBodyLineExpression", () => {
      $.OR([
        {
          ALT: () => $.SUBRULE($.actInExpression, { LABEL: "actIn" })
        },
        {
          ALT: () => $.SUBRULE($.actFromExpression, { LABEL: "actFrom" })
        },
        {
          ALT: () => $.SUBRULE($.actToExpression, { LABEL: "actTo" })
        },
        {
          ALT: () => $.SUBRULE($.ifThenElseExpression, { LABEL: "if" })
        },
        {
          ALT: () => $.SUBRULE($.loopExpression, { LABEL: "loop" })
        },
        {
          ALT: () => $.SUBRULE($.actionExpression, { LABEL: "action" })
        }
      ]);
    });

    $.RULE("identifiersExpression", () => {
      $.AT_LEAST_ONE_SEP({
        SEP: Comma,
        DEF: () => {
          $.CONSUME(Identifier);
        }
      });
    });

    $.RULE("nestedIdentifierExpression", () => {
      $.MANY(() => {
        $.CONSUME(Identifier);
      });
    });

    $.RULE("returnExpression", () => {
      $.CONSUME(Return);
      $.CONSUME(Identifier);
    });

    $.RULE("multipleIdentifiersExpression", () => {
      $.MANY_SEP({
        SEP: AndLiteral,
        DEF: () => {
          $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
        }
      });
    });

    $.RULE("action", () => {
      $.OR([
        {
          ALT: () => $.CONSUME(Verify)
        },
        {
          ALT: () => $.CONSUME(Match)
        },
        {
          ALT: () => $.CONSUME(Validate)
        },
        {
          ALT: () => $.CONSUME(SetLit)
        }
      ]);
    });

    $.RULE("actionExpression", () => {
      $.SUBRULE($.action, { LABEL: "actionLit" });
      $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "multiIds" });
    });

    $.RULE("doStepExpression", () => {
      $.CONSUME(Do);
      $.CONSUME(Identifier);
      $.OPTION(() => {
        $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
      });
    });

    $.RULE("validExpression", () => {
      $.OR([
        {
          ALT: () => $.CONSUME(Valid)
        },
        {
          ALT: () => $.CONSUME(Invalid)
        }
      ]);
    });

    $.RULE("conditionalExpression", () => {
      $.CONSUME(Identifier);
      $.OPTION(() => {
        $.CONSUME(Is);
        $.SUBRULE($.validExpression, { LABEL: "valid" });
      });
    });

    $.RULE("ifThenElseExpression", () => {
      $.CONSUME(If);
      $.SUBRULE($.conditionalExpression, { LABEL: "condition" });
      $.SUBRULE($.thenExpression, { LABEL: "then" });
      $.SUBRULE($.elseExpression, { LABEL: "else" });
    });

    $.RULE("thenExpression", () => {
      $.CONSUME(Then);
      $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
      $.OPTION(() => {
        $.SUBRULE($.returnExpression, { LABEL: "return" });
      });
    });

    $.RULE("elseExpression", () => {
      $.OPTION(() => {
        $.CONSUME(Else);
        $.SUBRULE($.elseBodyExpression, { LABEL: "elseBody" });
      });
    });

    $.RULE("elseBodyExpression", () => {
      $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
      $.OPTION(() => {
        $.SUBRULE($.returnExpression, { LABEL: "return" });
      });
    });

    $.RULE("doStepsExpression", () => {
      $.MANY(() => {
        $.SUBRULE($.doStepExpression, { LABEL: "doStep" });
      });
    });

    $.RULE("substepExpression", () => {
      $.CONSUME(Substep);
      $.CONSUME(Identifier);
      $.CONSUME(Equal);
      $.SUBRULE($.substepBodyExpression, { LABEL: "substepBody" });
    });

    $.RULE("workflowExpression", () => {
      $.CONSUME(WorkflowLiteral);
      $.CONSUME(Colon);
      $.CONSUME(StringLiteral);
      $.SUBRULE($.workflowBodyExpression, { LABEL: "body" });
    });

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
  }
}
