import * as chevrotain from "chevrotain";

const createToken = chevrotain.createToken;
const Lexer = chevrotain.Lexer;

const Comma = createToken({ name: "Comma", pattern: /,/ });
const Colon = createToken({ name: "Colon", pattern: /:/ });
const Equal = createToken({ name: "Equal", pattern: /=/ });
const And = createToken({ name: "And", pattern: /AND/ });
const AndLiteral = createToken({ name: "AndLiteral", pattern: /and/ });
const Or = createToken({ name: "Or", pattern: /OR/ });
const TodoLit = createToken({ name: "TodoLit", pattern: /TODO/ });
const InLit = createToken({ name: "InLit", pattern: /in/ });

const TypeLiteral = createToken({ name: "TypeLiteral", pattern: /type/ });

const StringTypeLiteral = createToken({
  name: "StringTypeLiteral",
  pattern: /string/
});
const IntegerTypeLiteral = createToken({
  name: "IntegerTypeLiteral",
  pattern: /integer/
});
const DecimalTypeLiteral = createToken({
  name: "DecimalTypeLiteral",
  pattern: /decimal/
});
const NumberTypeLiteral = createToken({
  name: "NumberTypeLiteral",
  pattern: /number/
});
const TextTypeLiteral = createToken({
  name: "TextTypeLiteral",
  pattern: /text/
});

const StartingLiteral = createToken({
  name: "StartingLiteral",
  pattern: /starting/
});

const EndingLiteral = createToken({
  name: "EndingLiteral",
  pattern: /ending/
});

const WithLiteral = createToken({
  name: "WithLiteral",
  pattern: /with/
});

const DataLiteral = createToken({ name: "DataLiteral", pattern: /data/ });
const ListOfLiteral = createToken({
  name: "ListOfLiteral",
  pattern: /list of/
});

const Then = createToken({ name: "Then", pattern: /then/ });
const Digits = createToken({ name: "Digits", pattern: /digits/ });
const BetweenLiteral = createToken({
  name: "BetweenLiteral",
  pattern: /between/
});

const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /-?[1-9]\d*/
});

const DecimalLiteral = createToken({
  name: "DecimalLiteral",
  pattern: /-?(0|([1-9]\d*))\.(\d+)?/
});

const BoundedContextLiteral = createToken({
  name: "BoundedContextLiteral",
  pattern: /context/
});

const Is = createToken({ name: "Is", pattern: /is/ });
const Not = createToken({ name: "Not", pattern: /not/ });

const Valid = createToken({ name: "Valid", pattern: /valid/ });
const Invalid = createToken({ name: "Invalid", pattern: /invalid/ });

const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-z_]\w+/
});

const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
});

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const allTokens = [
  WhiteSpace, // whitespace is normally very common so it should be placed first to speed up the lexer's performance
  Equal,
  And,
  AndLiteral,
  Or,
  TypeLiteral,
  Comma,
  Colon,
  TodoLit,
  Is,
  Not,
  IntegerTypeLiteral,
  InLit,
  StringTypeLiteral,
  DecimalTypeLiteral,
  NumberTypeLiteral,
  TextTypeLiteral,
  StartingLiteral,
  EndingLiteral,
  WithLiteral,
  BetweenLiteral,
  Then,
  Digits,
  DecimalLiteral,
  NumberLiteral,
  BoundedContextLiteral,
  DataLiteral,
  ListOfLiteral,
  StringLiteral,
  Identifier
];

const CalculatorLexer = new Lexer(allTokens);
