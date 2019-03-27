## VSC extension notes

See [Create Custom Language in Visual Studio Code](https://stackoverflow.com/questions/30687783/create-custom-language-in-visual-studio-code)

[TypeScript.tmLanguage](https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.tmLanguage
[TypeScript.tmTheme](https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.tmTheme)

See [Example languages config](https://github.com/Togusa09/vscode-tmlanguage/blob/master/package.json)

[How To: Create Custom Syntax Highlighting in a Visual Studio Code Extension](https://gcthesoftwareengineer.com/2017/01/how-to-create-custom-syntax-highlighting-in-a-visual-studio-code-extension/)

[Customizing a Color Theme](https://code.visualstudio.com/docs/getstarted/themes#_customizing-a-color-theme)

## Extension contributions

[VS Code contributions](https://www.zcfy.cc/original/visual-studio-code-extension-contribution-points-package-json)

### contributes.languages

Contribute the definition of a language. This will introduce a new language or enrich the knowledge VS Code has about a language.

In this context, a language is basically a string identifier that is associated to a file (See `TextDocument.getLanguageId()`).

VS Code uses three hints to determine the language a file will be associated with. Each "hint" can be enriched independently:

- the extension of the filename (`extensions` below)
- the filename (`filenames` below)
- the first line inside the file (`firstLine` below)

When a file is opened by the user, these three rules are applied and a language is determined. VS Code will then emit an activationEvent `onLanguage:\${language}` (e.g. `onLanguage:python` for the example below)

The `aliases` property contains human readable names under which the language is known. The first item in this list will be picked as the language label (as rendered in the status bar on the right).

The `configuration` property specifies a path to the language configuration file. The path is relative to the extension folder, and is typically `./language-configuration.json`. The file uses the JSON format and can contain the following properties:

- `comments` - Defines the comment symbols
- `blockComment` - The begin and end token used to mark a block comment. Used by the 'Toggle Block Comment' command.
- `lineComment` - The begin token used to mark a line comment. Used by the 'Add Line Comment' command.
- `brackets` - Defines the bracket symbols that influence the indentation of code between the brackets. Used by the editor to determine or correct the new indentation level when entering a new line.
- `autoClosingPairs` - Defines the open and close symbols for the auto-close functionality. When an open symbol is entered, the editor will insert the close symbol automatically. Auto closing pairs optionally take a notIn parameter to deactivate a pair inside strings or comments.
- `surroundingPairs` - Defines the open and close pairs used to surround a selected string.
- `folding` - Defines when and how code should be folded in the editor
- `offSide` - Empty lines trailing a code section belong to the next folding section (used for indentation based languages such as Python or F#)
- `markers` - Regex for identifying markers for custom folding regions in the code

If your language configuration file name is or ends with `language-configuration.json`, you will get validation and editing support in VS Code.

Example:

```json
"contributes": {
    "languages": [{
        "id": "python",
        "extensions": [ ".py" ],
        "aliases": [ "Python", "py" ],
        "filenames": [ ... ],
        "firstLine": "^#!/.*\\bpython[0-9.-]*\\b",
        "configuration": "./language-configuration.json"
    }]
}

```

#### language-configuration.json

```json
language-configuration.json

{
    "comments": {
        "lineComment": "//",
        "blockComment": [ "/*", "*/" ]
    },
    "brackets": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ],
    "autoClosingPairs": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        { "open": "'", "close": "'", "notIn": ["string", "comment"] },
        { "open": "/**", "close": " */", "notIn": ["string"] }
    ],
    "surroundingPairs": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["`<", ">`"],
        ["'", "'"]
    ],
    "folding": {
        "offSide": true,
        "markers": {
            "start": "^\\s*//#region",
            "end": "^\\s*//#endregion"
        }
    }
}
```
