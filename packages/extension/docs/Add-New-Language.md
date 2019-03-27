# Adding a New Language

See [Adding a New Language](https://vscode-docs.readthedocs.io/en/stable/customization/colorizer/#adding-a-new-language)

Using the [code Yeoman generator](https://vscode-docs.readthedocs.io/en/stable/tools/yocode/), you can add TextMate language specification files (.tmLanguage) to your VS Code installation to get syntax highlighting and bracket matching.

A good place to look for existing TextMate `.tmLanguage` files is on GitHub. Search for a _TextMate bundle_ for the language you are interested in and then navigate to the `syntaxes` folder. The 'code' Yeoman generator can handle either `.tmLanguage` or `.plist` files.

When prompted for the URL or file location, pass the raw path to the `.tmLanguage` file e.g. [syntaxes/Ant.tmLanguage](http://raw.githubusercontent.com/textmate/ant.tmbundle/master/Syntaxes/Ant.tmLanguage)

The generator will prompt you for other information such a unique name (this should be unique to avoid clashing with other customizations) and the language name, aliases and file extensions.

```bash
npm install -g yo generator-code
yo code
```

### New Language Support

Creates an extension that contributes a language with colorizer.

Prompts for the location (URL or file path) of an existing TextMate language file (`.tmLanguage`, `.plist` or `.json`). This file will be imported to the new extension

Prompts for the _extension identifier_ and will create a _folder_ of that _name_ in the current directory

Once created, open VS Code on the created folder and run the extension to test the colorization. Check out `vsc-extension-quickstart.md` for the next steps. Have a look at the language configuration file that has been created and defines configuration options such what style of comments and brackets the language uses

When the generator is finished, copy the complete output folder to a new folder under your .vscode/extensions folder and restart VS Code. When you restart VS Code, your new language will be visible in the language specifier dropdown and you'll get full colorization and bracket/tag matching for files matching the language's file extension.

### Loading an Extension

To load an extension, you need to copy the files to your VS Code extensions folder. We cover this in detail here: [Installing Extensions](https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/).

#### Your Extensions Folder

VS Code looks for extensions under your extensions folder `.vscode/extensions`. Depending on your platform it is located:

- Windows `%USERPROFILE%\.vscode\extensions`
- Mac `$HOME/.vscode/extensions`
- Linux `$HOME/.vscode/extensions`

If you want to load your extension or customization each time VS Code runs, copy your project to a new folder under `.vscode/extensions` ie. `$HOME/.vscode/extensions/myextension`

### Publishing extension to the Gallery

If you want to share your extension with others in the [Gallery](https://vscode-docs.readthedocs.io/en/stable/editor/extension-gallery/), you can use the [vsce](https://vscode-docs.readthedocs.io/en/stable/tools/vscecli/) publishing tool to package it up and submit it.

`npm install -g vsce`

Usage

You'll use the `vsce` command directly from the command line. For example, here's how you can quickly publish an extension:

```bash
$ vsce publish
Publishing uuid@0.0.1...
Successfully published uuid@0.0.1!
```

For a reference on all the available commands, run `vsce --help`.
