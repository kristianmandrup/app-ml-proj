# Source Maps

- [Compiling to JavaScript, and Debugging with Source Maps](https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/)

## Consuming source map

- [Consuming a source map](https://github.com/mozilla/source-map/#consuming-a-source-map)

### API

- [SourceMapConsumer](https://github.com/mozilla/source-map/#new-sourcemapconsumerrawsourcemap)

```js
const rawSourceMap = {
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  sourceRoot: "http://example.com/www/js/",
  mappings:
    "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
};

const whatever = await SourceMapConsumer.with(rawSourceMap, null, consumer => {
  console.log(consumer.sources);
  // [ 'http://example.com/www/js/one.js',
  //   'http://example.com/www/js/two.js' ]

  console.log(
    consumer.originalPositionFor({
      line: 2,
      column: 28
    })
  );
  // { source: 'http://example.com/www/js/two.js',
  //   line: 2,
  //   column: 10,
  //   name: 'n' }

  console.log(
    consumer.generatedPositionFor({
      source: "http://example.com/www/js/two.js",
      line: 2,
      column: 10
    })
  );
  // { line: 2, column: 28 }

  consumer.eachMapping(function(m) {
    // ...
  });

  return computeWhatever();
});
```

## Generating a source map

- [Generating a source map](https://github.com/mozilla/source-map/#generating-a-source-map)

### API

- [SourceMapGenerator](https://github.com/mozilla/source-map/#sourcemapgenerator)
- [SourceNode](https://github.com/mozilla/source-map/#sourcenode)

High level

```js
function compile(ast) {
  switch (ast.type) {
    case "BinaryExpression":
      return new SourceNode(
        ast.location.line,
        ast.location.column,
        ast.location.source,
        [compile(ast.left), " + ", compile(ast.right)]
      );
    case "Literal":
      return new SourceNode(
        ast.location.line,
        ast.location.column,
        ast.location.source,
        String(ast.value)
      );
    // ...
    default:
      throw new Error("Bad AST");
  }
}

var ast = parse("40 + 2", "add.js");
console.log(
  compile(ast).toStringWithSourceMap({
    file: "add.js"
  })
);
// { code: '40 + 2',
//   map: [object SourceMapGenerator]
```

Low level

```js
var map = new SourceMapGenerator({
  file: "source-mapped.js"
});

map.addMapping({
  generated: {
    line: 10,
    column: 35
  },
  source: "foo.js",
  original: {
    line: 33,
    column: 2
  },
  name: "christopher"
});

console.log(map.toString());
// '{"version":3,"file":"source-mapped.js","sources":["foo.js"],"names":["christopher"],"mappings":";;;;;;;;;mCAgCEA"}'
```
