import { Parser } from "chevrotain";
import { allTokens, tokenMap } from "./lexer";
import { createParsx } from "chevrotain-parsx";
import { Parsx } from "chevrotain-parsx/src/api/parsx";

// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.
export class BaseParser extends Parser {
  tokenMap: any;
  $: Parsx;
  analyse: boolean = true;

  constructor(opts: any = {}) {
    super(opts.tokens || allTokens);
    this.tokenMap = opts.tokenMap;

    // const $ = this;
    this.$ = opts.$ || createParsx(this);
    this.analyse = opts.analysis != false;

    this.rules();

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.onRulesLoaded();
  }

  onRulesLoaded() {
    if (!this.analyse) return;
    this.performSelfAnalysis();
  }

  rules() {
    this.contextRule();
    this.identifierRules();
  }

  contextRule() {
    const { $ } = this;
    $.ruleFor("boundedContextExpression", () => {
      $.consumes(["context", ":", "<string>"]);
    });
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
export const parser = new BaseParser({ tokens: allTokens, tokenMap });
