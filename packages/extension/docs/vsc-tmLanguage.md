# Create .tmLanguage files

## Conversion between tmLanguage file variants

Included commands are:

- `Convert to JSON-tmLanguage file` - Converts to JSON from YAML/PLIST
- `Convert to tmLanguage file` - Converts to PLIST from YAML/JSON
- `Convert to YAML-tmLanguage file` - Converts to YAML from JSON/PLIST

[TextMate/Sublime Language Definition for VSCode](https://marketplace.visualstudio.com/items?itemName=Togusa09.tmlanguage)

- Syntax Highlighting and Snippets for JSON-tmLanguage files
- Syntax Highlighting and Snippets for YAML-tmLanguage files

## The syntax file explained

Here is an explanation of this file.

- The `patterns` dictionary is where you will include each repository of regexes you created. It makes things cleaner and allows reuse of repositories for more complex languages.
- The `repository` dictionary is where you will put your collections of regexes. You can create multiple group of patterns. For our example, we will create a keywords and a date list of patterns.

Our first list of patterns, `keywords`, will highlight the different `keywords` found in our logs. We will give a different color for LOG:, –SUC– and –ERR–. This is a really simple regex match.

The second list of patterns, `date`, is a little more complex. Here, we use captures in order to only highlight the numbers of the date. It will only highlight the first and third match.

This file provides syntax highlighting rules by matching literals and tokens using RegExp

- [list of tokens](https://gist.github.com/vivainio/b89bd60a3f2c7bbb31f7e149d6cb8806)

See [Are there any standards for tmlanguage keyword types?](https://stackoverflow.com/questions/23463803/are-there-any-standards-for-tmlanguage-keyword-types)

For a basic introduction, check out the Language Grammars section of the TextMate Manual. The Naming Conventions section describes some of the base scopes, like comment, keyword, meta, storage, etc. These classes can then be subclassed to give as much detail as possible - for example, constant.numeric.integer.long.hexadecimal.python. However, it is very important to note that these are not hard-and-fast rules - just suggestions. This will become obvious as you scan through different language definitions and see, for example, all the different ways that functions are scoped - meta.function-call, support.function.name, meta.function-call punctuation.definition.parameters, etc.

The best way to learn about scopes is to examine existing .tmLanguage files, and to look through the source of different languages and see what scopes are assigned where. The XML format is very difficult to casually browse through, so I use the excellent PackageDev plugin to translate the XML to YAML. It is then much easier to scan and see what scopes are described by what regexes:

Another way to learn is to see how different language constructs are scoped, and for that I highly recommend using ScopeAlways. Once installed and activated, just place your cursor and the scope(s) that apply to that particular position are shown in the status bar. This is particularly useful when designing color schemes, as you can easily see which selectors will highlight a language feature of interest.

If you're interested, the color scheme used here is [Neon](https://packagecontrol.io/packages/Neon%20Color%20Scheme) [repo](https://github.com/MattDMo/Neon-color-scheme), which I designed to make as many languages as possible look as good as possible, covering as many scopes as possible. Feel free to look through it to see how the different language elements are highlighted; this could also help you in designing your .tmLanguage to be consistent with other languages.

Most common tokens:

- `name.function` - the name of a function.
- `name.type` - the name of a type declaration or class (could also be used for variables? `var abz = 32`)

- `header`
- `comment` such as `# stuff here`
- `constant.numeric` such as `32`
- `constant.rgb-value` such as `black` or `#AA0000`
- `keyword` when these do not fall into the other groups
- `keyword.operator` operators can either be textual (e.g. or) or be characters `!`, '|`,`&&`.
- `keyword.control` flow control like continue, while, return
- `string.quoted.single` such as `'hello'`
- `string.quoted.double` such as `"hello"`
- `string.quoted.triple` such as `"""hello"""`
- `string.regexp` such as `/and/

- `entity` an entity refers to a larger part of the document, for example a chapter, class, function, or tag
- `entity.name.tag`
- `entity.name.type`
- `entity.name.function`
- `entity.name.class` type declaration or class
- `entity.name.section`
- `entity.other.attribute-name`
- `support` — things provided by a framework or library
- `storage.type` the type of something, class, function, int, var, etc.

- `variable — variables. Not all languages allow easy identification`
  - `parameter` — when the variable is declared as the parameter.
  - `other` — other variables, like `$some_variables`

A simple extension example can be found [here](https://github.com/gctse/syntax-highlighting-VS-Code-example)

Here is a sample `.tmLanguage` to match a `.log` file for:

info-token:

- `hint`
- `info`
- `information`

error-token:

- `Error`
- `Failure`
- `Fail`

And so on...

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>scopeName</key>
        <string>text.log</string>

        <key>fileTypes</key>
        <array>
            <string>log</string>
        </array>

        <key>name</key>
        <string>Log file</string>

        <key>patterns</key>
        <array>
            <dict>
                <key>match</key>
                <string>\b(?i:(hint|info|information))\b</string>
                <key>name</key>

                <string>info-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b(?i:(warning|warn))\b</string>
                <key>name</key>
                <string>warn-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b(?i:(Error|Failure|Fail))\b</string>
                <key>name</key>
                <string>error-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\b</string>
                <key>name</key>
                <string>constant.numeric</string>
            </dict>
        </array>
        <key>uuid</key>
        <string>FF0550E0-3A29-11E3-AA6E-0800200C9A77</string>
    </dict>
</plist>
```
