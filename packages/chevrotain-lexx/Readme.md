# chevrotain-lexx

Wrapper API to facilitate working with the [chevrotain](https://github.com/SAP/chevrotain) [Lexer](https://sap.github.io/chevrotain/docs/tutorial/step1_lexing.html)

## API

### createParsx

Factory method to create an instance of `Parsx`

```ts
// createLexx(opts: any)
const lexx = createLexx();

const tokenMap = {
  "±": "PlusMinus",
  "^": "Power"
};

const lexx = createLexx({
  tokenMap
});
```

## Lexx class

The class `Lexx` wraps a chevrotain `Lexer` instance and a token map `tokenMap`

### Instance methods

- `get defaultOpts()`
- `optsFor(opts: any = {})`
- `createLitToken(opts = {})`
- `createLitTokens(names, opts: any = {})`
- `createTypeToken(name: string, opts = {})`
- `createTypeTokens(names, opts: any = {})`
- `createSpecialLits(names: string[])`
- `get allTokens()`
- `addToken(name: string, token: string)`
- `tokenName(token:string)` - get the token name for a token symbol, such as ':'

### createLitToken

```ts
lexx.createLitTokens("And");
```

### createLitTokens

```ts
lexx.createLitTokens(["And", "Or"]);
```

### createTypeToken

```ts
lexx.createTypeToken("Number");
```

### createTypeTokens

```ts
lexx.createTypeTokens(["Number", "String"]);
```

### createSpecialLits

```ts
lexx.createSpecialLits(["Identifier", "String"]);
```

### allTokens

```ts
const tokens = lexx.allTokens;
```

### addToken

```ts
lexx.addToken(":", "Colon");
```

### tokenName

```ts
lexx.tokenName(":");
```

## Internals

### token order

Lexx internally groups tokens in the following grouping "containers" and ensures they are returned
in that order. This is important so that the right match (precdence) is returned.

F.ex if a number token is before a decimal, the decimal will never match since the part before the `.` will match the number token and be returned. Similarly with identifiers. We want to ensure that no keywords (token container) have been matched before trying to match as an identifier.

```ts
tokenOrder = ["whiteSpace", "decimals", "numbers", "tokens", "identifiers"];
```

The chevrotain `Lexer` class leaves it up to you the developer to return tokens in a sensible order. `Lexx` encodes this order.

To customize this ordering, such as adding more groupings, simply subclass `Lexx`

### token map

`Lexx` uses a token map `tokenMap` to register mappings from symbols to token names.
This makes it possible to use the symbol in place of the token name, f.ex in the parser.
So instead of:

```ts
$.consumes(["workflow", "colon"]);
```

You can use `:` in place of `colon` so it reads more naturally.

```ts
$.consumes(["workflow", ":"]);
```

The default `tokenMap` is as follows. You can pass in a custom `tokenMap` as an option to the constructor which will be merged on top of the default `tokenMap`

```ts
tokenMap = {
  ",": "Comma",
  ":": "Colon",
  ";": "SemiColon",
  "=": "Assign",
  "==": "Equal",
  "!==": "NotEqual",
  "!": "Exclamation",
  "?": "Question",
  "#": "Hash",
  $: "Dollar",
  "&": "And",
  "-": "Minus",
  "+": "Plus",
  "*": "Times",
  "%": "Percent",
  ".": "Dot",
  "@": "Ampersand",
  '"': "DoubleQuote",
  "'": "SingleQuote",
  "`": "BackTick",
  "|": "Pipe",
  _: "Underscore",
  ">": "GreaterThan",
  "<": "LessThan",
  "/": "Forwardslash",
  "\\": "Backslash",
  "(": "LeftParens",
  ")": "RightParens",
  "[": "LeftSquareBracket",
  "]": "RightSquareBracket",
  "{": "LeftCurlyBracket",
  "}": "RightCurlyBracket"
};
```
