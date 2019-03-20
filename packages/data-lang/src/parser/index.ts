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
import { createParsx } from "chevrotain-parsx";
import { Parsx } from "chevrotain-parsx/src/api/parsx";
import { allTokens } from "../lexer";
import { BaseParser } from "base-lang";

export class DataParser extends Parser {
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
    this.onRulesLoader();
  }

  onRulesLoader() {
    if (!this.analyse) return;
    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
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
      $.manyOfEither([() => $.subrule("domainExpression")]);
    });
  }

  dataRules() {
    const { $ } = this;
    $.ruleFor("dataExpression", () => {
      $.consumes(["Data", "<ID>", "="]);
      $.subrule("dataBodyExpression", { LABEL: "dataBody" });
    });
  }

  combineIdRules() {
    this.andIdRule().orIdRule();
  }

  andIdRule() {
    const { $ } = this;
    $.ruleFor("andDataBodyExpression", () => {
      $.consume("and");
      $.consumeOptional("listOf");
      $.consume("<ID>");
    });
    return this;
  }

  orIdRule() {
    const { $ } = this;
    $.ruleFor("orDataBodyExpression", () => {
      $.consume("or");
      $.consume("<ID>");
    });
    return this;
  }

  moreDataRule() {
    const { $ } = this;
    $.ruleFor("moreDataBodyExpression", () => {
      $.manyOfEither([
        () => $.subrule("andDataBodyExpression", { LABEL: "and" }),
        () => $.subrule("orDataBodyExpression", { LABEL: "or" })
      ]);
    });
  }

  dataIdentityRule() {
    const { $ } = this;
    $.ruleFor("dataIdentityExpression", () => {
      $.consume("<ID>");
      $.subrule("moreDataBodyExpression", { LABEL: "and" });
    });
  }

  dataConstraintRule() {
    const { $ } = this;
    $.ruleFor("dataConstraintExpression", () => {
      $.subruleEither([
        { name: "integerConstraintExpression", label: "integer" },
        { name: "decimalConstraintExpression", label: "decimal" },
        { name: "stringConstraintExpression", label: "string" }
      ]);
    });
  }

  dataBodyRule() {
    const { $ } = this;
    $.ruleFor("dataBodyExpression", () => {
      $.subruleEither([
        { name: "dataIdentityExpression", label: "idExpr" },
        { name: "dataConstraintExpression", label: "constraint" }
      ]);
    });
  }

  domainRule() {
    const { $ } = this;
    $.ruleFor("domainExpression", () => {
      $.subrule("boundedContextExpression", { LABEL: "context" });
      $.manySub("dataExpression", { LABEL: "dataType" });
    });
  }

  thenRule() {
    const { $ } = this;
    $.ruleFor("thenExpression", () => {
      $.consume("then");
      $.subrule("doBodyExpression", { LABEL: "thenBody" });
      $.optionalSub({ name: "returnExpression", label: "return" });
    });
  }
}

export const dataParser = new DataParser();
