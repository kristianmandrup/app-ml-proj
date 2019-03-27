```json
"editor.tokenColorCustomizations": {
    "textMateRules": [
        {
            "scope": "keyword",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "scope": "storage",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "scope": "constant.language",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "scope": "support.class.builtin",
            "settings": {
                "fontStyle": "bold"
            }
        }
    ]
}
```

More examples

```json
{
    "editor.tokenColorCustomizations": {
        "variables": "#000000",
        "functions": "#000000",
        "strings": "#033ddf",
        "textMateRules": [
            {
                "scope": "comment",
                "settings": {
                    "foreground": "#A0A0A0"
                }
            },
            {
              "scope":"keyword.control" ,
              "settings": {
                  "foreground": "#681308",
                  "fontStyle": "bold"
              }
            },
            {
                "scope":"keyword.operator.new" ,
                "settings": {
                    "foreground": "#000000"
                }
            },
            {
                "scope": "comment.block",
                "settings": {
                  "foreground": "#8080FF"
                }
            },
            {
                "scope": ["storage.type", "storage.modifier"],
                "settings": {
                    "foreground": "#439059",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": ["constant.numeric", "constant.character", "constant"],
                "settings": {
                    "foreground": "#F000F0",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": "keyword.other",
                "settings": {
                    "foreground": "#f3f704"
                }
            },
            {
                "scope": "keyword.operator",
                "settings": {
                    "foreground": "#000000"
                }
            }
        ]
    },
```

More

```json
{
  "editor.tokenColorCustomizations": {
    "[Dark++ Italic]": {
      "textMateRules": [
        {
          "name": "LigsArrow",
          "scope": [
            "keyword.operator.comparison",
            "meta.block",
            "meta.arrow",
            "meta.var.expr",
            "source"
          ],
          "settings": {
            "foreground": "#FF0000",
            "fontFamily": "Fira Code"
          }
        }
      ]
    }
  }
}
```

PHP example

```json
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": [
                    "variable.language.php"
                ],
                "settings": {
                    "foreground": "#bf616a",
                }
            },
            {
                "scope": [
                    "variable.language.this.php"
                ],
                "settings": {
                    "foreground": "#bf616a",
                }
            },
            {
                "scope": [
                    "variable.language.this.php"
                ],
                "settings": {
                    "foreground": "#bf616a",
                }
            }
        ]
    },
```

They are mapped to TmLanguage scopes as follows:

```js
{
  comments: 'comment',
  strings: 'string',
  keywords: 'keyword',
  numbers: 'constant.numeric',
  types: 'entity.name.type',
  functions: 'entity.name.function',
  variables: 'variable'
}
```

Full example

```json
    "configurationDefaults": {
      "[log]": {
        "editor.insertSpaces": false,
        "editor.tokenColorCustomizations": {
          "textMateRules": [
            {
              "scope": "comments",
              "settings": {
                "foreground": "#00ff00"
              }
            },
            {
              "scope": "entity.name.function",
              "settings": {
                "foreground": "#0000cc",
                "fontStyle": "italic"
              }
            }
          ]
        }
      }
    }
```
