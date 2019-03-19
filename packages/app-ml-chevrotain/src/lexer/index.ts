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
import { Lexer } from "chevrotain";
import { createLexx } from "chevrotain-lexx";

const createLexer = (lex): any[] => {
  // StringTypeLit
  lex.createTypeTokens(["string", "text", "number", "integer", "decimal"]);

  lex.createLitTokens([
    ",",
    ":",
    "=",
    { name: "CapAnd", match: "AND" },
    { name: "todo", match: "TODO" },
    "and",
    "or",
    "starting",
    "ending",
    "with",
    "then",
    "type",
    "digits",
    "between",
    "in",
    "is",
    "not",
    "invalid",
    "valid",
    "list of",
    "data",
    "context",
    "primary"
  ]);

  lex.createSpecialLits(["decimal", "number", "id", "string"]);

  lex.createWhiteSpace();

  return lex.allTokens;
};

const lexx = createLexx();
export const tokens = createLexer(lexx);

export const lexer = new Lexer(tokens);
