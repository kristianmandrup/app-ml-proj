# chevrotain-parsx

Wrapper API to facilitate working with the [chevrotain](https://github.com/SAP/chevrotain) [Parser](https://sap.github.io/chevrotain/docs/tutorial/step2_parsing.html)

## API

### createParsx

Factory method to create an instance of `Parsx`

```ts
// createParsx(parser: Parser, opts: any)
const parsx = createParsx(parser);

const Colon = createToken({ name: "Colon", pattern: /:/ });

const tokenMap = {
  ":": Colon
};

const parsx = createParsx(parser, {
  tokenMap
});
```

## Parsx class

The class `Parsx` wraps a chevrotain `Parser` instance and a token map `tokenMap`

### Instance methods

- `getToken(name: string): TokenType`

- `ruleFor(name: string, cb: callback)`
- `subrule(rule: any, opts: any = {})`

`OPTION`:

- `optional(rule: any)`
- `optionalSub(rule: any)`

`OR`:

- `either(ruleCbs: callback[])`
- `subruleEither(subrules: any[])`

`MANY`:

- `many(ruleCb: callback)`
- `manySeparatedBy(sep: string, ruleCb: callback)`
- `manySub(rule: any, opts: any = {})`
- `manyOfEither(ruleCbs: callback[])`

`AT_LEAST_ONE_SEP`:

- `atLeastOneSeparatedBy(sep: string, ruleCb: callback)`

`CONSUME`:

- `consumeEither(tokens: string[])`
- `consumeOptional(token: any)`
- `consume(name: string)` single token or multiple separated with whitespace

Examples:

```js
consume("and");
consume("workflow", ":");
consume(["workflow", ":"]);
consume("workflow :"); // splits on space separator
```

### getToken

```ts
const colon = getToken("or");
const colon = getToken(":");
```

Special tokens can be retrieved using tag syntax, such as `<ID>` for the Identifier token.

```ts
const String = getToken("<string>");
const Id = getToken("<ID>");
```

### ruleFor

```ts
ruleFor("bodyExpression", () => $.consumes("body"));
```

### subrule

```ts
subrule("bodyExpression");
subrule("bodyExpression", { label: "body" });
```

### optional

```ts
optional(() => $.consumes("body"));
```

### optionalSub

```ts
optionalSub("bodyExpression", {label: 'body})
```

### either

```ts
either([() => $.consumes("header"), () => $.consumes("body")]);
```

### subruleEither

```ts
subruleEither([
  { name: "topExpression", label: "top" },
  { name: "bodyExpression", label: "body" }
]);
```

### many

```ts
many([() => $.consumes("bodyStatement")]);
```

### manySeparatedBy

```ts
manySeparatedBy("and", [() => $.consumes("bodyStatement")]);
```

### atLeastOneSeparatedBy

```ts
atLeastOneSeparatedBy("and", [() => $.consumes("bodyStatement")]);
```

### manySub

```ts
manySub("bodyExpression", { label: "body" });
```

### manyOfEither

```ts
manyOfEither([() => $.consumes("header"), () => $.consumes("body")]);
```

### consumeEither

```ts
consumeEither(["top", "body", "bottom"]);
```

### consumeOptional

```ts
consumeOptional("stop");
```

### consume

```ts
consume("and");
consume("<string>");
```

### consumes

```ts
consumes(["input", ":", "<string>"]);
```
