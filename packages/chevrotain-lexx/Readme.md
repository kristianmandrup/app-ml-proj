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
