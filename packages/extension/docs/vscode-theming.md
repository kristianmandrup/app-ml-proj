# VSCode textmate theming

See [textmate themes](https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations#_textmate-themes)

Given a token with the following scopes:

```
//            C                     B                             A
scopes = ['source.js', 'meta.definition.function.js', 'entity.name.function.js']
```

Here are some simple selectors that would match, sorted by their rank (descending):

...

Observation: `entity` wins over `meta.definition.function` because it matches a scope that is more specific (A over B, respectively).

[TextMate Themes in VS Code 1.8](https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations#_textmate-themes-in-vs-code-18)

Here are two Monokai theme rules (as JSON here for brevity; the original is in XML):

```
...
// Function name
{ "scope": "entity.name.function", "fontStyle": "", "foreground":"#A6E22E" }
...
// Class name
{ "scope": "entity.name.class", "fontStyle": "underline", "foreground":"#A6E22E" }
...
```

In VS Code 1.8, to match our "approximated" scopes, we would generate the following dynamic CSS rules:

```
...
/* Function name */
.entity.name.function { color: #A6E22E; }
...
/* Class name */
.entity.name.class { color: #A6E22E; text-decoration: underline; }
...
```

We would then leave it up to CSS to match the "approximated" scopes with the "approximated" rules. But the CSS matching rules are different from the TextMate selector matching rules, especially when it comes to ranking. CSS ranking is based on the number of class names matched, while TextMate selector ranking has clear rules regarding scope specificity.

in VS Code today, all the files get tokenized with TextMate grammars. For the Monaco Editor, we've migrated to using Monarch (a descriptive tokenization engine similar at heart with TextMate grammars, but a bit more expressive and that can run in a browser) for most of the supported languages, and we've added a wrapper for manual tokenizers. All in all, that means supporting a new tokenization format would require changing 3 tokens providers (TextMate, Monarch and the manual wrapper) and not more than 10.

A few months ago we reviewed all the code we have in the VS Code core that reads token types and we noticed that those consumers only cared about strings, regular expressions or comments. For example, the bracket matching logic ignores tokens that contain the scope "string", "comment" or "regex".

### Representing a TextMate theme in VS Code 1.9

Here's how a very simple theme might look like:

```
theme = [
  {                                  "foreground": "#F8F8F2"                           },
  { "scope": "var",                  "foreground": "#F8F8F2"                           },
  { "scope": "var.identifier",       "foreground": "#00FF00", "fontStyle": "bold"      },
  { "scope": "meta var.identifier",  "foreground": "#0000FF"                           },
  { "scope": "constant",             "foreground": "#100000", "fontStyle": "italic"    },
  { "scope": "constant.numeric",     "foreground": "#200000"                           },
  { "scope": "constant.numeric.hex",                          "fontStyle": "bold"      },
  { "scope": "constant.numeric.oct",                          "fontStyle": "underline" },
  { "scope": "constant.numeric.dec", "foreground": "#300000"                           },
];
```

When loading it, we will generate an id for each unique color that shows up in the theme and store it into a color map (similar as we did for token types above):

```
//                          1          2          3          4          5           6
colorMap = ["reserved", "#F8F8F2", "#00FF00", "#0000FF", "#100000", "#200000", "#300000"]
theme = [
  {                                  "foreground": 1                           },
  { "scope": "var",                  "foreground": 1,                          },
  { "scope": "var.identifier",       "foreground": 2, "fontStyle": "bold"      },
  { "scope": "meta var.identifier",  "foreground": 3                           },
  { "scope": "constant",             "foreground": 4, "fontStyle": "italic"    },
  { "scope": "constant.numeric",     "foreground": 5                           },
  { "scope": "constant.numeric.hex",                  "fontStyle": "bold"      },
  { "scope": "constant.numeric.oct",                  "fontStyle": "underline" },
  { "scope": "constant.numeric.dec", "foreground": 6                           },
];
```

### Changes to tokenization

All the TextMate tokenization code used in VS Code lives in a separate project, [vscode-textmate](https://github.com/Microsoft/vscode-textmate), which can be used independently of VS Code. We've changed the way we represent the scope stack in vscode-textmate to be an immutable linked list that also stores the fully resolved metadata.

When pushing a new scope onto the scope stack, we will look up the new scope in the theme trie. We can then compute immediately the fully resolved desired foreground or font style for a scope list, based on what we inherit from the scope stack and on what the theme trie returns

### Texmate scope Inspector widget

See [Texmate scope Inspector widget](https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations#_new-textmate-scope-inspector-widget)

We've added a new widget to help with authoring and debugging themes or grammars: You can run it with Developer: Inspect TM Scopes in the Command Palette (⇧⌘P).
