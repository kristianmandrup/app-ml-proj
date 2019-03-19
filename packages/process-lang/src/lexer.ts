import * as chevrotain from "chevrotain";

const createToken = chevrotain.createToken;
const WorkflowLiteral = createToken({
  name: "WorkflowLiteral",
  pattern: /Workflow/
});

const Comma = createToken({ name: "Comma", pattern: /,/ });
const Colon = createToken({ name: "Colon", pattern: /:/ });
const Equal = createToken({ name: "Equal", pattern: /=/ });
const And = createToken({ name: "And", pattern: /AND/ });
const AndLiteral = createToken({ name: "AndLiteral", pattern: /and/ });
const Or = createToken({ name: "Or", pattern: /OR/ });
const GetLit = createToken({ name: "GetLit", pattern: /get/ });
const SetLit = createToken({ name: "SetLit", pattern: /set/ });
const TodoLit = createToken({ name: "TodoLit", pattern: /TODO/ });
const ToLit = createToken({ name: "ToLit", pattern: /to/ });
const FromLit = createToken({ name: "FromLit", pattern: /from/ });
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

const TriggerLiteral = createToken({
  name: "TriggerLiteral",
  pattern: /trigger/
});
const InputsLiteral = createToken({
  name: "InputsLiteral",
  pattern: /inputs/
});
const OutputsLiteral = createToken({
  name: "OutputsLiteral",
  pattern: /outputs/
});
const PrimaryLiteral = createToken({
  name: "PrimaryLiteral",
  pattern: /primary/
});
const OtherLiteral = createToken({ name: "OtherLiteral", pattern: /other/ });
const EventLiteral = createToken({ name: "EventLiteral", pattern: /event/ });
const EffectsLiteral = createToken({
  name: "EffectsLiteral",
  pattern: /effects/
});

const Substep = createToken({ name: "Substep", pattern: /substep/ });

const BoundedContextLiteral = createToken({
  name: "BoundedContextLiteral",
  pattern: /context/
});

const ProcessLiteral = createToken({
  name: "ProcessLiteral",
  pattern: /process/
});

const If = createToken({ name: "If", pattern: /if/ });
const Else = createToken({ name: "Else", pattern: /else/ });
const While = createToken({ name: "While", pattern: /while/ });
const Do = createToken({ name: "Do", pattern: /do/ });
const Is = createToken({ name: "Is", pattern: /is/ });
const Not = createToken({ name: "Not", pattern: /not/ });
const For = createToken({ name: "For", pattern: /for/ });
const Each = createToken({ name: "Each", pattern: /each/ });

const Return = createToken({ name: "Return", pattern: /return/ });
const Valid = createToken({ name: "Valid", pattern: /valid/ });
const Invalid = createToken({ name: "Invalid", pattern: /invalid/ });
const Add = createToken({ name: "Add", pattern: /add/ });
const Update = createToken({ name: "Update", pattern: /update/ });
const Create = createToken({ name: "Create", pattern: /create/ });
const Delete = createToken({ name: "Delete", pattern: /delete/ });
const Send = createToken({ name: "Send", pattern: /send/ });
const Verify = createToken({ name: "Verify", pattern: /verify/ });
const Match = createToken({ name: "Match", pattern: /match/ });

const Stop = createToken({ name: "Stop", pattern: /stop/ });
const Input = createToken({ name: "Input", pattern: /input/ });
const Output = createToken({ name: "Output", pattern: /output/ });
const Dependencies = createToken({
  name: "Dependencies",
  pattern: /dependencies/
});
const Validate = createToken({ name: "Validate", pattern: /validate/ });
const Check = createToken({ name: "Check", pattern: /check/ });
const SuccessLiteral = createToken({
  name: "SuccessLiteral",
  pattern: /success/
});
const ErrorLiteral = createToken({ name: "ErrorLiteral", pattern: /error/ });

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
  group: chevrotain.Lexer.SKIPPED
});

export const allTokens = [
  WhiteSpace, // whitespace is normally very common so it should be placed first to speed up the lexer's performance
  Equal,
  And,
  AndLiteral,
  Or,
  ToLit,
  TypeLiteral,
  GetLit,
  SetLit,
  Comma,
  Colon,
  TodoLit,
  FromLit,
  For,
  Each,
  If,
  Else,
  While,
  Do,
  Is,
  Not,
  Validate,
  Valid,
  Check,
  Add,
  Update,
  Create,
  Delete,
  Send,
  Verify,
  Match,
  Stop,
  Return,
  Substep,
  InputsLiteral,
  Input,
  Invalid,
  IntegerTypeLiteral,
  InLit,
  OutputsLiteral,
  Output,
  Dependencies,
  SuccessLiteral,
  ErrorLiteral,
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
  ProcessLiteral,
  DecimalLiteral,
  NumberLiteral,
  WorkflowLiteral,
  TriggerLiteral,
  PrimaryLiteral,
  OtherLiteral,
  EventLiteral,
  EffectsLiteral,
  BoundedContextLiteral,
  // DataLiteral,
  // ListOfLiteral,
  StringLiteral,
  Identifier
];

export const Lexer = new chevrotain.Lexer(allTokens);
