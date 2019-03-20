# Language Server

[Langserver.org](https://langserver.org/)

Langserver.org is a community-driven site, maintained by Sourcegraph, to track development progress of LSP-compatible language servers and clients.

This site contains a huge list of language server implementations for various languages, indicating how much support is included:

- Code completion
- Hover
- Jump to definition
- Workspace symbols
- Find references
- Diagnostics

## VS Code guides

- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Snippet Guide](https://code.visualstudio.com/api/language-extensions/snippet-guide)
- [Language Configuration Guide](https://code.visualstudio.com/api/language-extensions/language-configuration-guide)
- [Programmatic Language Features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features)
- [Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)

- [Protocol specifications](https://microsoft.github.io/language-server-protocol/specification)

### Visual Studio

- [Add a Language Server Protocol extension](https://docs.microsoft.com/en-us/visualstudio/extensibility/adding-an-lsp-extension?view=vs-2017)

## Examples

### VS Code tutorial

- [Implement your own Language Server](https://vscode.readthedocs.io/en/latest/extensions/example-language-server/)

Clone the [lsp-sample repository](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample) from [Microsoft/vscode-extension-samples] and then do:

```bash
> cd lsp-sample
> npm install
> code .
```

The above installs all dependencies and opens one VS Code instances containing both the client and server code.

Follow the example...

### Additional Language Server features

See [Programmatic language features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features) for additional IDE features that can be added.

The following language features are currently supported in a language server along with code completions:

- `Document Highlights`: highlights all 'equal' symbols in a text document.
- `Hover`: provides hover information for a symbol selected in a text document.
- `Signature Help`: provides signature help for a symbol selected in a text document.
- `Goto Definition`: provides go to definition support for a symbol selected in a text document.
- `Goto Type Definition`: provides go to type/interface definition support for a symbol selected in a text document.
- `Goto Implementation`: provides go to implementation definition support for a symbol selected in a text document.
- `Find References`: finds all project-wide references for a symbol selected in a text document.
- `List Document Symbols`: lists all symbols defined in a text document.
- `List Workspace Symbols`: lists all project-wide symbols.
- `Code Actions`: compute commands to run (typically beautify/refactor) for a given text document and range.
- `CodeLens`: compute CodeLens statistics for a given text document.
- `Document Formatting`: this includes formatting of whole documents, document ranges and formatting on type.
- `Rename`: project-wide rename of a symbol.
- `Document Links`: compute and resolve links inside a document.
- `Document Colors`: compute and resolve colors inside a document to provide color picker in editor.

The [Programmatic language features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features) topic describes each of the language features above and provides guidance on how to implement them either through the language server protocol or by using the extensibility API directly from your extension.

### DOT language

- [Why You Should Know the Language Server Protocol](https://tomassetti.me/what-is-the-language-server-protocol/)
- [Building a Language Server for DOT with Visual Studio Code](https://tomassetti.me/language-server-dot-visual-studio/)
- [repo: server DOT language](https://github.com/unosviluppatore/language-server-dot)

## Language Servers based on Chevrotain languages

### Argdown

- [Argdown](https://github.com/christianvoigt/argdown)
- [Argdown language server](https://github.com/christianvoigt/argdown/tree/master/packages/argdown-language-server)

An editor-agnostic language server for the Argdown language with code linter, code assistance and code completion providers. Implements the language server protocol and depends on @argdown/core and @argdown/node

### Toml

- [Toml tools](https://github.com/bd82/toml-tools)

Infrastructure packages:

- @toml-tools/lexer
- @toml-tools/parser

See [packages](https://github.com/bd82/toml-tools/tree/master/packages)

Tooling Packages:

prettier-plugin-toml
