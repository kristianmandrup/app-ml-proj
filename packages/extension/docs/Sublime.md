# Sublime grammar syntax

- [Yaml syntax - Sublime 3](https://www.sublimetext.com/docs/3/syntax.html)
- [Sublime Text Syntax definitions](http://docs.sublimetext.info/en/latest/extensibility/syntaxdefs.html)
- [How To Make a Custom Syntax Highlighting for Sublime Text](https://ilkinulas.github.io/programming/2016/02/05/sublime-text-syntax-highlighting.html)

### Create new syntax definition

[Creating A New Syntax Definition](http://docs.sublimetext.info/en/latest/extensibility/syntaxdefs.html#creating-a-new-syntax-definition)

To create a new syntax definition, follow these steps:

Go to Tools | Packages | Package Development | New Syntax Definition
Save the new file in your Packages/User folder as a .YAML-tmLanguage file.
You now should see a file like this:

```yaml
# [PackageDev] target_format: plist, ext: tmLanguage
---
name: Syntax Name
scopeName: source.syntax_name
fileTypes: []
uuid: 0da65be4-5aac-4b6f-8071-1aadb970b8d9
## patterns:
```

Example:

```yaml
%YAML 1.2
---
name: C
file_extensions: [c, h]
scope: source.c

contexts:
  main:
    - match: \b(if|else|for|while)\b
      scope: keyword.control.c
    - match: '"'
      push: string

  string:
    - meta_scope: string.quoted.double.c
    - match: \\.
      scope: constant.character.escape.c
    - match: '"'
      pop: true
```
