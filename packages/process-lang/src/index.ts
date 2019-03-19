import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

// for the playground to work the returned object must contain these fields
export const {
  lexer: Lexer,
  parser: Parser,
  visitor: Interpreter,
  defaultRule: "expression"
};
