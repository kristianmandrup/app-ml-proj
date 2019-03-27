# Create language extension

See [Writing Your Own Debugger and Language Extensions with Visual Studio Code](https://www.codemag.com/Article/1809051/Writing-Your-Own-Debugger-and-Language-Extensions-with-Visual-Studio-Code) for a thorough walk-through

## Create language extension

From [Create Custom Language in Visual Studio Code](https://stackoverflow.com/questions/30687783/create-custom-language-in-visual-studio-code)

You need a `.tmLanguage` file for the language you want to add. You can find existing files e.g. on GitHub or you can define your own language file. Look here to get an idea of how to create one: [tm language grammars](http://manual.macromates.com/en/language_grammars)

After finding a `.tmLanguage` file you have two ways to create an extension based on it.

Option 1: Using a _Yeoman_ generator

- Install node.js (if you haven't already done)
- Install `yo` (if you haven't already done) by executing `npm install -g yo`
  Install the Yo generator for code: `npm install -g generator-code`
- Run `yo code` and select `New language support`
- Follow the instructions (define the `.tmLangauge file`, define the plugin name, file extensions etc.)
- The generator creates a directory for your extension with the name of the plugin in your current working directory.

Option 2: Create the directory on your own

Create a _directory with the name of your plugin_ (only _lowercase letters_). Let's say we call it `mylang`.

Add a subfolder `syntaxes` and place the `.tmlanguage` file inside of it

Create a file `package.json` inside the root of the extension folder with content like this

```json
{
  "name": "mylang",
  "version": "0.0.1",
  "engines": {
    "vscode": ">=0.9.0-pre.1"
  },
  "publisher": "me",
  "contributes": {
    "languages": [
      {
        "id": "mylang",
        "aliases": ["MyLang", "mylang"],
        "extensions": [".mylang", ".myl"]
      }
    ],
    "grammars": [
      {
        "language": "mylang",
        "scopeName": "source.mylang",
        "path": "./syntaxes/mylang.tmLanguage"
      }
    ]
  }
}
```

Finally add your extension to Visual Studio Code:

- Copy the extension folder to the extension directory. This is:
  - on `Windows %USERPROFILE%\.vscode\extensions`
  - on `Mac/Linux $HOME/.vscode/extensions`
- Restart Code.

Now your extension will run automatically everytime you open a file with the specified file extension. You can see the name of the used plugin in the down right corner. You can change it by clicking on the name of the extension. If your extension is not the only one registered for a specific file extension then Code may chooses the wrong one.
